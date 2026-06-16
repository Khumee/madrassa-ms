# Madrassa Management System (MMS)

An Arabic-localized, mobile-first Attendance and Progress Management System designed specifically for Islamic schools (Madrassas) and seminaries. Built with a scalable multi-tenant SaaS architecture.

MMS provides a streamlined Right-to-Left (RTL) interface for marking student and teacher attendance, managing timetable periods, tracking book completion progress, and exporting automated performance reports.

---

## 🏗️ Multi-Tenant Architecture & Subdomains

MMS runs as a multi-tenant platform. In order to access different tenants on your local machine, you must map the local host subdomains to your loopback address.

Add the following entries to your system's `hosts` file (located at `C:\Windows\System32\drivers\etc\hosts` on Windows or `/etc/hosts` on Linux/macOS):

```text
127.0.0.1 mmsdemo.localhost
127.0.0.1 mmsdemo2.localhost
127.0.0.1 admin.localhost
```

---

## 🚀 Quick Start (with Docker)

We provide a Docker Compose file pre-configured for a **"build, use, and destroy"** testing run. It isolates the environment, maps ports to avoid local database conflicts, and automatically runs migrations and seeds the Urdu/Arabic demo datasets.

### 1. Fetch latest main branch code & Build
To run the latest version, run the following:
```bash
git pull origin main
docker compose up --build -d
```

### 2. Access the Applications
Once the containers boot up and complete migrations/seeding automatically:
- **First Demo School (mmsdemo)**: [http://mmsdemo.localhost:3001](http://mmsdemo.localhost:3001)
  - Log in with any default role (username: `مدیر`, `ناظم`, `استاذ`, `عریف`, or `طالب` and password: `1234`).
- **Second Demo School (mmsdemo2)**: [http://mmsdemo2.localhost:3001](http://mmsdemo2.localhost:3001)
  - Log in with username: `مدیر` and password: `1234` to explore isolated tenant data and emerald green custom branding.
- **Super-Admin Portal** (Urdu Default): [http://admin.localhost:3001](http://admin.localhost:3001)
  - Manage plans, toggle tenant status, and seed tenants.
  - Log in with username: `superadmin` and password: `admin123`.

*Note: The MySQL database is accessible on port `3308` (username: `root`, password: `secretpassword`, database: `mms`). Data is transient and resets on container restart.*

---

## 🛠️ Manual Installation (Without Docker)

### 1. Prerequisites
- **Node.js** (v18+)
- **MySQL Server** (v8.0+) - running on port `3306`

### 2. Configuration
1. Create a MySQL database named `mms`.
2. Copy the template environment variables:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and fill in your database credentials:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=mms
   SESSION_SECRET=your_random_session_secret_key
   ```

### 3. Setup and Boot
1. Install project dependencies:
   ```bash
   npm install
   ```
2. Run database migrations:
   ```bash
   npm run migrate
   ```
3. Seed the default tenants and administrator accounts:
   ```bash
   npm run seed
   ```
4. (Optional) Populate the demo tenant with Urdu mock history data:
   ```bash
   npm run seed:demo
   ```
5. Start the server:
   ```bash
   npm start
   ```
6. Access the local web interface at `http://mmsdemo.localhost:3000` or `http://admin.localhost:3000`.

---

## 📱 Mobile App (Android)

MMS includes a companion Android app project located in the `mobile/` directory. It uses a WebView client configured to connect to your server installation.
- To configure the server endpoint, edit `MainActivity.java` inside the Android project.
- The server will automatically detect the mobile client through its custom User-Agent (`MmsMobile`).

---

## 🛡️ Git Workflow & Contributing
Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) to get started, and refer to [BRANCH_PROTECTION.md](BRANCH_PROTECTION.md) to understand our release cycles and branches (`main` vs `live`).

## 📄 License
Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.
