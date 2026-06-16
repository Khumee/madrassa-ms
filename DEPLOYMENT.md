# Deployment Guide

This guide details the steps to deploy the **Madrassa Management System (MMS)** to a production server (Ubuntu/Linux recommended) and how to configure a public demo subdomain.

---

## 1. Production Server Prerequisites
Ensure your server has the following installed:
- **Node.js** (v18+)
- **MySQL Server** (v8.0+)
- **PM2** (Process Manager for Node.js):
  ```bash
  sudo npm install -g pm2
  ```
- **Nginx** (Reverse proxy)

---

## 2. Manual Server Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/madrassa-ms.git /var/www/mms
   cd /var/www/mms
   ```
2. **Install production dependencies**:
   ```bash
   npm install --production
   ```
3. **Configure environment variables**:
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=mms_user
   DB_PASSWORD=secure_password
   DB_NAME=madrassa_db
   SESSION_SECRET=secure_session_secret_key
   ```
4. **Run migrations and seed the database**:
   ```bash
   npm run migrate
   npm run seed
   ```
5. **Start the application with PM2**:
   ```bash
   pm2 start server.js --name "mms"
   pm2 save
   pm2 startup
   ```

---

## 3. Configuring the Demo Subdomain (e.g., `demo.nukrim.com`)
To host a public demo of the product on the same server, run a separate app instance with mock Urdu demo data:

1. **Create a separate directory** for the demo:
   ```bash
   cp -r /var/www/mms /var/www/mms-demo
   cd /var/www/mms-demo
   ```
2. **Configure environment variables** for the demo:
   Edit `/var/www/mms-demo/.env` to point to a separate demo database:
   ```env
   PORT=3001
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=mms_user
   DB_PASSWORD=secure_password
   DB_NAME=madrassa_db_demo
   SESSION_SECRET=demo_session_secret_key
   ```
3. **Migrate and Seed Demo Data**:
   ```bash
   npm run migrate
   npm run seed:demo
   ```
4. **Start the Demo Application with PM2**:
   ```bash
   pm2 start server.js --name "mms-demo" -- 3001
   pm2 save
   ```

---

## 4. Nginx Reverse Proxy & SSL Setup
Configure Nginx to route traffic to the PM2 processes.

Create Nginx configuration files under `/etc/nginx/sites-available/`:

### Main Production Config (`/etc/nginx/sites-available/mms`):
```nginx
server {
    listen 80;
    server_name mms.yourdomain.com; # Replace with your production domain

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### Public Demo Config (`/etc/nginx/sites-available/mms-demo`):
```nginx
server {
    listen 80;
    server_name demo.nukrim.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### Enable Sites and Obtain SSL:
```bash
sudo ln -s /etc/nginx/sites-available/mms /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/mms-demo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Install Let's Encrypt SSL
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d mms.yourdomain.com -d demo.nukrim.com
```

---

## 5. Branch Protection & Security Settings
When publishing the repository to GitHub:
1. Go to the repository **Settings** > **Branches**.
2. Click **Add branch protection rule**.
3. Target branch name: `main`.
4. Enable **Require a pull request before merging** and require at least **1 approval**. This prevents unauthorized changes to code that deploys to production.
5. In GitHub Settings, hide your server IP by setting up `SERVER_HOST` as a GitHub secret, referencing it in your workflow as `${{ secrets.SERVER_HOST }}`.
