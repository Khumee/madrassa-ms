# Madrassa Management System (MMS)

An Arabic-localized, mobile-first Attendance and Progress Management System designed specifically for Islamic schools (Madrassas), schools, and seminaries.

MMS provides a streamlined Right-to-Left (RTL) interface for marking student and teacher attendance, managing timetable periods, tracking book completion progress, and exporting automated performance reports.

---

## Key Features

- **Arabic & RTL Localized UI**: Full native Right-to-Left styling optimized for Arabic and Urdu scripts.
- **Mobile First**: Built with responsive layouts tailored for mobile devices, making it easy for teachers to mark attendance in class.
- **Role-Based Access Control (RBAC)**: Manage granular permissions for Administrators (مدير), Superintendents (ناظم), Monitoring Officers (عريف), Teachers (أستاذ), and Students (طالب).
- **Progress Tracking (Book Completion)**: Monitor and log lesson progress (page numbers, book assignments) for every teacher.
- **Automated Timetables**: Dynamic period schedule generator and views for both teachers and classes.
- **Customizable Reports**: Weekly, monthly, and yearly attendance/progress overview reports with export functionality.

---

## Quick Start (with Docker)

To run the application instantly without manual database configurations:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/madrassa-management-system.git
   cd madrassa-management-system
   ```
2. Start the services:
   ```bash
   docker compose up -d
   ```
3. Run migrations and seed a default admin user:
   ```bash
   docker compose exec app npm run migrate
   # Default admin (admin / admin123)
   docker compose exec app npm run seed
   ```
4. Access the web interface at `http://localhost:3000`.

---

## Manual Installation (Without Docker)

### 1. Prerequisites
- **Node.js** (v18+)
- **MySQL Server** (v8.0+)

### 2. Configuration
1. Create a MySQL database (e.g., `madrassa_db`).
2. Copy the template environment variables:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and fill in your database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=madrassa_db
   SESSION_SECRET=your_secret_key
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
3. Seed the default admin user:
   ```bash
   npm run seed
   ```
4. (Optional) Populate the database with Urdu/Arabic mock demo data to test features:
   ```bash
   npm run seed:demo
   ```
5. Start the server:
   ```bash
   npm start
   ```

---

## Mobile App (Android)

MMS includes a companion Android app project located in the `mobile/` directory. It uses a lightweight WebView client configured to detect your server installation.
- To configure the server endpoint, edit `MainActivity.java` inside the Android project.
- The server will automatically detect the mobile client through its custom User-Agent (`MmsMobile`).

---

## Contributing & Development
Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) to learn how to set up your environment, open issues, and make pull requests.

## License
Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.
