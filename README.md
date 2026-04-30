# kui-ms (Koliyaatul Uloomul Islamia Management System)

A lightweight, mobile-first Attendance Management System specifically designed for **Koliyaatul Uloomul Islamia**. This system provides a streamlined, Arabic-localized interface for marking student and teacher attendance, managing records, and generating automated performance reports.

## Features
- **Arabic UI**: Full Right-to-Left (RTL) support.
- **Student Attendance**: Mark daily attendance for all classes (Ool to Daura Hadith).
- **Teacher Attendance**: Track classes taken by teachers.
- **Reporting**: Weekly/Monthly/Yearly attendance percentages.
- **Management**: Easy interface to add students and teachers.
- **Mobile First**: Optimized for use on smartphones.

## Setup Instructions

### 1. Prerequisites
- Node.js (v14+)
- MySQL Server

### 2. Database Setup
1. Create a MySQL database named `madrassa_attendance`.
2. Run the SQL commands in `schema.sql` to set up the tables.
   ```bash
   mysql -u root -p madrassa_attendance < schema.sql
   ```

### 3. Installation
1. Clone the repository to your server.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env` and fill in your database credentials:
   ```bash
   cp .env.example .env
   ```

### 4. Seed Admin User
Run the following command to create an initial admin account:
```bash
node seed.js
```
*Credentials: `admin` / `admin` (Please change the password after first login).*

### 5. Running the App
For development:
```bash
npm start
```
For production (recommended using PM2):
```bash
pm2 start server.js --name "madrassa-mas"
```

## GitHub Actions Deployment

The repository includes a GitHub Action for automated deployment via SSH. To set this up:

1.  **Server Path**: In `.github/workflows/deploy.yml`, update the `cd` command to match your server's folder path.
2.  **GitHub Secrets**: Add the following secrets in your GitHub repository settings (`Settings > Secrets and variables > Actions`):
    -   `SERVER_HOST`: Your server's IP address or domain.
    -   `SERVER_USER`: Your SSH username (e.g., `root`).
    -   `SSH_PRIVATE_KEY`: Your private SSH key (use `cat ~/.ssh/id_rsa` on your machine to get it).
    -   `SERVER_PORT`: (Optional) Your SSH port, defaults to 22.

3.  **PM2**: Ensure `pm2` is installed on your server (`npm install -g pm2`).

## License
Proprietary - Koliyaatul Uloomul Islamia
