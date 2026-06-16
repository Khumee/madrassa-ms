# Unified Open Source Transition & Multi-Tenant SaaS Architecture Plan

This plan merges the steps to clean, rename, and prepare the repository to be open-sourced under the MIT License with the database redesign and features required to turn the system into a multi-tenant SaaS application.

---

## 1. Task Summary (Status Checklist)

### Phase 1: Open Source Cleanup (Completed)
- [x] **Branding Rebrand**: Rename package to `madrassa-ms` and update parameters.
- [x] **Database Setup**: Set default fallback connection parameter to `madrassa_db`.
- [x] **Clean Startup logic**: Move local-only modifications to git-ignored `private/kui_normalize.js`.
- [x] **Arabic Translation Defaults**: Set fallback language locale to Arabic (`ar`) by default.
- [x] **Database Scrubbing**: Clean historical migration files (`V2__Data.sql`) and remove private institution records.
- [x] **Urdu Demo Seeder**: Build a full Urdu/Arabic seed script mapping realistic data and varied textbook progress slopes.
- [x] **Urdu Role Logins**: Add logins for Mudeer (`مدیر`), Nazim (`ناظم`), Teacher (`استاذ`), Areef (`عریف`), and Student (`طالب`) with password `1234`.
- [x] **Docker Support**: Setup `Dockerfile` and `docker-compose.yml` configs.
- [x] **Documentation & MIT License**: Add generic files (`README.md`, `DEPLOYMENT.md`, `CONTRIBUTING.md`, `LICENSE`).
- [x] **Mobile App**: Update Java entries to generic URLs.

### Phase 2: Multi-Tenant & SaaS Conversion (Completed)
- [x] **Create Tenants & Super-Admin Tables**: Introduce the `tenants` table and a `master_admins` table.
- [x] **Database Migration (tenant_id)**: Add `tenant_id` columns and foreign keys to all tenant-scoped tables. Update unique indexes to include `tenant_id`.
- [x] **Context-Based Middleware**: Build subdomain parsing middleware and set up `AsyncLocalStorage` to carry the active `tenantId`.
- [x] **Query Safety Wrapper**: Modify `db.js` to assert that all queries run under the tenant context, throwing errors in development if a tenant filter is omitted.
- [x] **Limit Enforcement Logic**: Add quota checks before inserting new students, teachers, or classes (Free vs Pro limits).
- [x] **Dynamic Branding Injection**: Inject CSS variables (colors) and logo URLs into EJS templates based on the current tenant config.
- [x] **Super-Admin Interface (`admin.mms.nukrim.com`)**: Build the control interface for provisioning new tenants, upgrading plan tiers, and suspending/activating domains.

---

## 2. Multi-Tenant Architecture & Database Redesign (Shared Database)

To ensure ease of migrations, we will host all tenants inside a **Single Database (Shared Schema)** and scope all data logically using a `tenant_id` column.

### A. Core Tenant Schema
We will create the `tenants` table to manage tenant routing, limits, status, and branding.

#### 1. The `tenants` Table
```sql
CREATE TABLE IF NOT EXISTS tenants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    subdomain VARCHAR(100) NOT NULL UNIQUE, -- e.g. 'mmsdemo' or 'kui'
    custom_domain VARCHAR(255) UNIQUE,       -- e.g. 'mmsdemo.nukrim.com' or 'kui.nukrim.com'
    status ENUM('active', 'suspended', 'maintenance') DEFAULT 'active',
    
    -- Plan and Limits
    plan_tier ENUM('free', 'pro', 'enterprise') DEFAULT 'free',
    max_students INT DEFAULT 50,             -- Limit for Free tier
    max_teachers INT DEFAULT 5,              -- Limit for Free tier
    max_classes INT DEFAULT 5,               -- Limit for Free tier
    
    -- Feature Flags
    enable_custom_branding TINYINT(1) DEFAULT 0,
    enable_mobile_app TINYINT(1) DEFAULT 0,
    enable_advanced_reports TINYINT(1) DEFAULT 0,
    
    -- Branding details
    logo_url VARCHAR(255) DEFAULT '/images/default_logo.png',
    school_name VARCHAR(255) NOT NULL,       -- e.g., 'Jamia Dar-ul-Huda' or 'Kulliyat-ul-Uloom Al-Islamia'
    primary_color VARCHAR(7) DEFAULT '#3b82f6',
    secondary_color VARCHAR(7) DEFAULT '#1d4ed8',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 2. The `master_admins` Table
Admin users managing the entire SaaS network will log in through `admin.mms.nukrim.com` (or `adminmms.nukrim.com`) and exist in a globally isolated table:
```sql
CREATE TABLE IF NOT EXISTS master_admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### B. Table Modification & Composite Unique Constraints
We will add `tenant_id INT` and foreign keys referencing `tenants(id) ON DELETE CASCADE` to all tenant-scoped tables. Existing global unique constraints must be converted to composite indexes scoped by `tenant_id`:

#### 1. Users Table (`users`)
```sql
ALTER TABLE users ADD COLUMN tenant_id INT NOT NULL;
ALTER TABLE users DROP INDEX username;
ALTER TABLE users ADD UNIQUE KEY unique_username_per_tenant (tenant_id, username);
ALTER TABLE users ADD CONSTRAINT fk_users_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
```

#### 2. Students Table (`students`)
```sql
ALTER TABLE students ADD COLUMN tenant_id INT NOT NULL;
ALTER TABLE students DROP INDEX roll_number;
ALTER TABLE students ADD UNIQUE KEY unique_roll_number_per_tenant (tenant_id, roll_number);
ALTER TABLE students ADD CONSTRAINT fk_students_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
```

#### 3. Teachers Table (`teachers`)
```sql
ALTER TABLE teachers ADD COLUMN tenant_id INT NOT NULL;
ALTER TABLE teachers DROP INDEX id_number;
ALTER TABLE teachers ADD UNIQUE KEY unique_id_number_per_tenant (tenant_id, id_number);
ALTER TABLE teachers ADD CONSTRAINT fk_teachers_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
```

#### 4. Other Scoped Tables
The following tables will also have `tenant_id INT NOT NULL` and a foreign key constraint added:
`classes`, `attendance_students`, `attendance_teachers`, `books`, `teacher_books`, `book_progress`, `periods`, `sessions`, `student_enrollments`, and `role_permissions`.

### C. URL Routing & Authentication Flow
1. **Domain Detection**:
   When a user requests a URL, the middleware inspects the host header:
   * `mmsdemo.nukrim.com` maps to **Tenant 1** (Demo tenant name: **Jamia Habibullah Islamabad (Demo Account) / جامعہ حبیب اللہ اسلام آباد (فرضی نام)**).
   * `kui.nukrim.com` maps to **Tenant 2** (KUI Production name: **Kulliyat-ul-Uloom Al-Islamia / کلیۃ العلوم الاسلامیہ**).
   * `admin.mms.nukrim.com` (or `adminmms.nukrim.com`) bypasses tenant lookup and activates the Super-Admin panel.
2. **Context Binding**:
   The active `tenantId` is bound to the request thread using Node's `AsyncLocalStorage`.
3. **Login Lookup**:
   Authentication queries retrieve users matching both the username and the resolved tenant:
   ```sql
   SELECT * FROM users WHERE username = ? AND tenant_id = ?;
   ```

### D. Developer Guardrails (Query Scoping)
Because this application uses raw SQL strings via `db.execute()`, we will protect against data leaks by implementing runtime validations:
1. **Tenant Middleware**: Resolves tenant by hostname and binds `tenantId` to an `AsyncLocalStorage` instance.
2. **Query Scoping Check**: In development, `db.execute` will check queries targetting tenant tables (e.g. `students`, `teachers`) and throw a runtime error if the query lacks a `tenant_id` filter.

---

## 3. SaaS Feature Controls & Quotas

### A. Lifecycle Status Routing
* **Active**: Standard application access.
* **Suspended**: Users see an account lockout screen; login is blocked.
* **Maintenance**: Only Super-Admins or tenant admins can log in; others see a maintenance screen.

### B. Quota Checks
A utility function will execute before record insertions:
```javascript
async function checkQuota(tenantId, resourceType) {
    const [[tenant]] = await db.query('SELECT plan_tier, max_students, max_teachers, max_classes FROM tenants WHERE id = ?', [tenantId]);
    // Checks if count >= limit, throwing a Quota Exception if true
}
```

### C. Branding Customization
The main HTML layout file will load CSS variables dynamically:
```html
<style>
  :root {
    --primary-color: <%= tenant.enable_custom_branding ? tenant.primary_color : '#3b82f6' %>;
    --secondary-color: <%= tenant.enable_custom_branding ? tenant.secondary_color : '#1d4ed8' %>;
  }
</style>
```

---

## 4. Central Administration Interface (`admin.mms.nukrim.com`)

We will configure a separate Nginx site config or subfolder routing for the Super-Admin dashboard:
* **Tenant Registry**: Table displaying all tenants, their subdomains, statuses, and current student count vs limits.
* **Tenant Provisioner & Management**: Form to add new tenants, update plan type (Free/Pro/Enterprise), and override specific quotas.
* **Tenant Lifecycle Control**: Enable/Disable (Suspend) or place a tenant in maintenance mode.
* **Branding Settings**: Form to upload custom school logos and update colors.

---

## 5. Verification Plan

### Automated Tests
- Run database migrations on a clean local database to verify new schema setup.
- Execute unit checks testing that inserting students beyond limits returns a quota warning.

### Manual Verification
- Point hostnames in the local `hosts` file.
- Log in to `kui.nukrim.local` and `mmsdemo.nukrim.local`. Confirm that adding a student to the demo does not alter production.
- Suspend the demo tenant from `admin.mms.nukrim.local` and verify the tenant website immediately locks down.
