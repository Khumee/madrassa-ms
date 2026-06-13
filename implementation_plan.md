# Open Source Transition Plan

This plan outlines the steps to clean, rename, and prepare the repository to be open-sourced under the MIT License.

## Task Summary (Status Checklist)
- [x] **Branding Rebrand**: Rename package to `madrassa-management-system` and update parameters.
- [x] **Database Setup**: Set default fallback connection parameter to `madrassa_db`.
- [x] **Clean Startup logic**: Move local-only modifications to git-ignored `private/kui_normalize.js`.
- [x] **Arabic Translation Defaults**: Set fallback language locale to Arabic (`ar`) by default.
- [x] **Database Scrubbing**: Clean historical migration files (`V2__Data.sql`) and remove private institution records.
- [x] **Urdu Demo Seeder**: Build a full Urdu/Arabic seed script mapping realistic data and varied textbook slopes.
- [x] **Urdu Role Logins**: Add logins for Mudeer (`مدیر`), Nazim (`ناظم`), Teacher (`استاذ`), Areef (`عریف`), and Student (`طالب`) with password `1234`.
- [x] **Docker Support**: Setup `Dockerfile` and `docker-compose.yml` configs.
- [x] **Documentation & MIT License**: Add generic files (`README.md`, `DEPLOYMENT.md`, `CONTRIBUTING.md`, `LICENSE`).
- [x] **Marketing Points**: Document competitive value propositions for marketing.
- [x] **Video Sequence Details**: Plan step-by-step features video guidelines.
- [x] **Launch & Community Strategy**: Outline GitHub tags, live demo steps, and forum launching.
- [x] **Branch Publish**: Commit and push changes to the remote branch `open-source-transition`.


## User Review Required

> [!IMPORTANT]
> - **Generic Name**: The project will be renamed to **Madrassa Management System (MMS)**.
> - **Data Scrubbing**: We will scrub `sql/V2__Data.sql`, `sql/kui.sql`, `schema.sql`, `schema_new.sql`, and `seed_data.js` of specific student/teacher names, logs, and custom configuration entries. We will keep default roles, permissions, and classes.
> - **History Reset**: We will initialize a clean Git history starting with an initial clean generic commit, keeping a local copy of your historical commits safely backed up.

## Proposed Changes

### Configuration and Branding

#### [MODIFY] [package.json](file:///d:/kui-ms/package.json)
- Rename package from `mas` to `madrassa-management-system`.
- Update description and scripts. Replace the long, custom `seed` script with a generic `node scripts/seed.js` and add a script for seeding demo data (`npm run seed:demo`).

#### [NEW] [.env.example](file:///d:/kui-ms/.env.example)
- Create a template for environment variables containing `PORT`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, and `SESSION_SECRET` with generic placeholder values.

#### [MODIFY] [db.js](file:///d:/kui-ms/db.js) and [migrate.js](file:///d:/kui-ms/migrate.js)
- Change default database name fallback from `kui` to `madrassa_db`.

#### [MODIFY] [server.js](file:///d:/kui-ms/server.js)
- Remove security-sensitive and institution-specific boot-time queries:
  - Remove the query that resets passwords to `'1234'` on startup.
  - Remove role normalizations and username modifications on startup.
- Keep the table check/generation logic for `role_permissions` and default permission inserts, as these are critical for system operation.

---

### Database and Data Scripts

#### [DELETE] [seed_data.js](file:///d:/kui-ms/seed_data.js)
- Delete this custom script since it contains specific teacher names.

#### [MODIFY] [schema.sql](file:///d:/kui-ms/schema.sql) and [schema_new.sql](file:///d:/kui-ms/schema_new.sql)
- Remove hardcoded teacher/subject insert statements.
- Change database name from `kui` to `madrassa_db`.

#### [DELETE] [kui.sql](file:///d:/kui-ms/sql/kui.sql)
- Remove the full database backup/dump containing institutional data.

#### [MODIFY] [V2__Data.sql](file:///d:/kui-ms/sql/V2__Data.sql)
- Clean this migration file to only insert default classes, sessions, and roles/permissions. Remove all individual students, teachers, book progress, periods, and attendance records.

#### [NEW] [seed_demo_urdu.js](file:///d:/kui-ms/scripts/seed_demo_urdu.js)
- Create a script that populates the database with generic Urdu names for students and teachers, mock timetable periods, mock classes, and mock book assignments to allow users to quickly test the interface with beautiful dummy Arabic/Urdu data.
- **Urdu/Arabic Role Logins**: Configure Urdu/Arabic login accounts for all 5 roles (Mudeer: `مدیر`, Nazim: `ناظم`, Teacher: `استاذ`, Areef: `عریف`, Student: `طالب`) with digit password `1234` to facilitate demo video creation.
- **Realistic Book Progress**: Ensure seeded books and progress slopes vary realistically in starting page and speed across different assignments.

#### [NEW] [private/kui_normalize.js](file:///d:/kui-ms/private/kui_normalize.js)
- Move the specific password reset, username correction, and role normalizations into this script inside the git-ignored `private/` folder. This preserves your ability to run these operations on your local database when needed without running them on boot or pushing them to GitHub.

#### [MODIFY] [scripts/maintenance/seed.js](file:///d:/kui-ms/scripts/maintenance/seed.js)
- Move to `scripts/seed.js` and make it the main generic seed script to set up the default admin user.
- Remove other institutional maintenance scripts (`scripts/maintenance/migrate_users.js`, `fix_roles.js`, etc.) and import scripts under `scripts/imports/`.

---

### Localization and Default Settings

#### [MODIFY] [server.js](file:///d:/kui-ms/server.js)
- Default the i18n system to Arabic (`ar`) as the standard language so the demo renders in Arabic by default unless otherwise switched.

---

### Developer Experience (DX) and Docker Support

#### [NEW] [Dockerfile](file:///d:/kui-ms/Dockerfile)
- Create a standard lightweight Dockerfile using `node:18-alpine` to package the Node.js application.

#### [NEW] [docker-compose.yml](file:///d:/kui-ms/docker-compose.yml)
- Configure a multi-container local setup containing the Node.js app and a MySQL database service, including automatic environment variable injection and volume mounting for persistent DB data.

#### [NEW] [.dockerignore](file:///d:/kui-ms/.dockerignore)
- Ignore `node_modules`, `.git`, `.env`, and private files during Docker image building.

---

### Legal and Documentation

#### [NEW] [LICENSE](file:///d:/kui-ms/LICENSE)
- Create an MIT License file.

#### [NEW] [CONTRIBUTING.md](file:///d:/kui-ms/CONTRIBUTING.md)
- Provide guidelines on how external developers can set up the environment, run tests, adhere to conventions, and submit Pull Requests.

#### [MODIFY] [README.md](file:///d:/kui-ms/README.md)
- Rewrite `README.md` to introduce the project under its generic name.
- Include one-liner instructions for Docker deployment and manual installation instructions using new generic scripts.

#### [NEW] [DEPLOYMENT.md](file:///d:/kui-ms/DEPLOYMENT.md)
- Provide a detailed deployment guide covering server setup (Node.js, MySQL, PM2), environment configuration, Nginx reverse proxy configuration, SSL setup, and database migrations.
- **Demo Subdomain**: Add instructions for configuring `demo.nukrim.com` on your existing server, directing to a separate PM2 process loaded with the generic Urdu demo seed data.

---

### Mobile App (Android)

#### [MODIFY] [MainActivity.java](file:///d:/kui-ms/mobile/app/src/main/java/com/nukrim/madrasati/MainActivity.java)
- Replace hardcoded private domain URL (`https://kui.nukrim.com`) with a generic placeholder URL or instruct on how to customize it.

## Verification Plan

### Automated Tests
- Run database migrations (`npm run migrate`) on a clean local database to verify schema setup.
- Run the seed script (`npm run seed`) and demo script (`npm run seed:demo`) to check data creation.
- Start the server using both `npm start` and `docker compose up` to ensure it boots without errors.

### Manual Verification
- Review file contents to ensure no institutional names, private keys, or passwords remain.
- Log in to all 5 roles (`مدیر`, `ناظم`, `استاذ`, `عریف`, `طالب`) with password `1234` to verify language sensitivity and dashboards.

---

## Marketing & Video Demonstration Points

### 1. Key Marketing Points (Value Proposition)
When presenting the Madrassa Management System (MMS) in your video or marketing materials, highlight these competitive advantages:
* **Arabic & Urdu Native Interface**: Fully localized and language-sensitive, built from the ground up for Islamic educational institutions.
* **Dual-Role Class Rep (Areef) Dashboard**: A unique operational feature where a trusted student (Areef) handles daily operations (attendance, book tracking), removing the administrative burden from teachers.
* **Timetable-Integrated Attendance**: Student and teacher attendance are linked directly to daily scheduled classes, making period-by-period reporting extremely accurate.
* **Curriculum Progress Tracking**: Interactive page-by-page progress indicators and visualization charts showing current syllabus coverage versus total syllabus goals.
* **Mobile Companion Compatibility**: Standard WebView design that transforms the web dashboard into an Android/iOS mobile application with native app-version checks.

### 2. Video Demonstration Sequence & Highlights
Follow this sequence to create a compelling features video:
1. **Opening / Branding (0:00 - 0:15)**: Show the clean login screen in Arabic. Highlight the translation switcher (Arabic/Urdu/English).
2. **Director (Mudeer) View (0:15 - 0:45)**: Log in as `مدیر`. Point out the overall metrics: total active classes, registered students, and school-wide status.
3. **Supervisor (Nazim) View (0:45 - 1:15)**: Log in as `ناظم`. Show how they can view and export unified timetables and review overall progress reports.
4. **Teacher (Ustadh) View (1:15 - 1:45)**: Log in as `استاذ`. Show the simplified dashboard focusing on today's teaching hours.
5. **Class Rep (Areef) Day-to-Day (1:45 - 2:30)**: Log in as `عریف`. Show them completing three daily tasks:
   * Marking classmate attendance.
   * Marking teacher presence/absence for their periods.
   * Modifying textbook progress page using the interactive `+`/`-` stepper and expanding the history line charts.
6. **Student (Talib) View (2:30 - 3:00)**: Log in as `طالب`. Show their personalized dashboard featuring attendance percentages, streak indicators, and their progress on assigned books.

### 3. Open Source Launch & Community Strategy
To attract initial users and developers to the Madrassa Management System:
* **GitHub Repository Topics (Tags)**: Once public, add these tags to the repository: `madrassa`, `islamic-school`, `school-management`, `attendance-system`, `arabic-rtl`, `self-hosted`, `opensource`.
* **Live Demo Environment**: Deploy a generic read-only demo instance using the seeded Urdu/Arabic data (instructions in [DEPLOYMENT.md](file:///d:/kui-ms/DEPLOYMENT.md)) so people can test the interface before downloading.
* **Community Outreach**:
  * **Reddit**: Share your launch on r/selfhosted, r/opensource, and r/islam (targeting school administrators).
  * **Hacker News**: Post a "Show HN" text post describing the origin story.
  * **Launch Pitch**: Explain the "why" clearly—existing school management systems are complex, lack proper Arabic/RTL localization, and are not mobile-friendly for teachers.



