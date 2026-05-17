# School Management System - Validation & Use Cases Guide
This document provides a comprehensive, step-by-step validation guide for all requirements and features developed today. You can use this checklist to test each use case one-by-one.

---

## 📅 Part 1: Timetable, Translation & Language Rules

### Use Case 1: Timetable Urdu Translation Fix
* **Requirement**: Ensure the Urdu translation is fully applied and renders correctly on the timetable management page.
* **How to Validate**:
  1. Set your browser/system language or toggle the UI language switcher to **Urdu (اردو)**.
  2. Navigate to the **Manage Timetable** page (`/periods/manage`).
  3. **Expected Outcome**: All column names, buttons, day names (السبت, الأحد to ہفتہ, اتوار, etc.), and headings must be displayed completely in correct Urdu script with zero Arabic or English fallbacks.

### Use Case 2: Clean English Translations from UI
* **Requirement**: Remove all residual English words and labels from all management buttons (e.g., "Manage" button in timetables, student, book forms).
* **How to Validate**:
  1. Navigate to the Admin / Representative dashboard.
  2. Review the action buttons (Timetable, Students, Book Management).
  3. **Expected Outcome**: All English terms such as "Manage", "Edit", "Delete", or "Add" must be replaced with their localized equivalents (`مدير` / `انتظام` or `تعديل` / `ترميم`).

### Use Case 3: Arabic Strings Cleanup in Urdu Locales
* **Requirement**: Arabic text like `إضافة حصة جديدة` (Add new period), `توزيع الكتاب` (Book distribution), and day names in Arabic must not display when the language is set to Urdu.
* **How to Validate**:
  1. Select **Urdu** in the language settings.
  2. Navigate to `/periods/manage` and review the "Add Period" modal/form inputs.
  3. **Expected Outcome**:
     - `إضافة حصة جديدة` is translated to `نیا پیریڈ شامل کریں`.
     - `توزيع الكتاب` is translated to `کتاب کی تقسیم`.
     - Day options (`السبت`, `الأحد`, etc.) are translated to (`ہفتہ`, `اتوار`, etc.).

---

## 🔒 Part 2: Security & Roles

### Use Case 4: Default Password Policy
* **Requirement**: The default password for all newly created users must be initialized to `1981`.
* **How to Validate**:
  1. Create a new user (Teacher, Student, or Admin) inside the database or via the management screens.
  2. Attempt to log in with the new user's username and the password `1981`.
  3. **Expected Outcome**: Login is successful.

### Use Case 5: Areeb (Class Representative) Book Progress Permissions
* **Requirement**: The Class Representative role (Areeb / `عريب`) must have complete authority to update book progress for their class.
* **How to Validate**:
  1. Log in as a Class Representative (**Areeb / عريب**).
  2. Navigate to the book progress modal or the new CR Dashboard.
  3. Modify the current page number for a book and save.
  4. **Expected Outcome**: Save completes successfully with no "Unauthorized / 403 Forbidden" errors.

---

## 📈 Part 3: Timetable Engine & Extra Periods

### Use Case 6: Dynamic Weekly & Extra Period Creator
* **Requirement**: Support standard 5 periods across 6 days, plus the ability to dynamically add extra periods on any selected weekday.
* **How to Validate**:
  1. Navigate to the **Manage Timetable** page (`/periods/manage`).
  2. Click **Add New Period** (نیا پیریڈ شامل کریں).
  3. Verify the form fields.
  4. **Expected Outcome**:
     - The form includes a **Day Select Option** (ہفتہ, اتوار, etc.) instead of assuming a single fixed day.
     - You can specify any period number (including extra periods) for any day.
     - Saving automatically updates the dynamic weekly grid view.

---

## 📊 Part 4: Time-Based Analytics & Variance Reports

### Use Case 7: Time-Based Filter Presets for Reports
* **Requirement**: The **Reports & Statistics** page must be filterable by a custom date range, defaulting to the **Current Month**, with quick preset buttons: **1 Day**, **7 Days**, **1 Month**, and **6 Months**.
* **How to Validate**:
  1. Navigate to the **Reports** page (`/reports`).
  2. Verify the date input card.
  3. **Expected Outcome**:
     - The default start date is the 1st day of the current month, and the end date is today.
     - Selecting "1 Day", "7 Days", "1 Month", or "6 Months" presets dynamically shifts the inputs and fetches matching logs.

### Use Case 8: Teacher Period Variance & Makeup Report Math
* **Requirement**: Calculate required teacher periods dynamically based on their schedule and the selected date range, and compare it with classes actually taken (including makeup/extra classes) to output:
  - **Ontime** (Taken === Required)
  - **Extra/Makeup** (Taken > Required, show `+N` badge)
  - **Shortage** (Taken < Required, show `-N` badge)
* **How to Validate**:
  1. Go to the **Reports** page (`/reports`) and filter by a date range (e.g., May 1st to May 15th).
  2. Locate the **Teacher Attendance & Period Variance** table.
  3. **Verification Math**:
     - *If Teacher A has 2 periods scheduled on Mondays, and the filtered range has exactly 3 Mondays, Required = 6.*
     - *If actual attendance logged for Teacher A in that range is 8 classes: Status shows `Extra/Makeup` with `+2` badge.*
     - *If actual attendance is 5: Status shows `Shortage` with `-1` badge.*

### Use Case 9: Weekly Teacher Attendance Grid Report
* **Requirement**: Provide a comprehensive Saturday-to-Thursday weekly calendar grid for all teachers sorted by name, showing classes marked present vs scheduled, with previous/next week navigation buttons.
* **How to Validate**:
  1. Navigate to the **Teacher Attendance** report page (`/teachers`).
  2. **Expected Outcome**:
     - A stunning indigo calendar header shows the start of the week (Saturday).
     - Clicking the **Change Date** calendar input or using the **الأسبوع السابق (Previous Week)** and **الأسبوع التالي (Next Week)** buttons shifts the dates by 7 days.
     - The grid lists all teachers sorted by Name.
     - Columns represent the 6 schooling days (السبت to الخميس).
     - Status badges are color-coded:
       - **منجز (On time)** (Green) if classes taken match scheduled.
       - **إضافي (Extra)** or **تعويضي (Makeup)** (Purple) if they took more than scheduled.
       - **نقص (Shortage)** or **غائب (Absent)** (Red) if they took fewer than scheduled.
       - **غير مسجل (Not marked)** (Warning Orange) if periods are scheduled but attendance is not saved yet.

---

## ⚡ Part 5: Class Representative Minimal-Interaction Dashboard

### Use Case 10: Live Student Attendance Grid (AJAX)
* **Requirement**: Mark student attendance directly on the CR dashboard with zero page reloads.
* **How to Validate**:
  1. Log in as **Areeb** and view the main dashboard (`/dashboard/cr`).
  2. Tap any of the status buttons (Present, Absent, Leave, Online) next to a student.
  3. **Expected Outcome**: The button color highlights instantly in success/danger/warning/info, and the status commits in the background without reloading the page.

### Use Case 11: Today's Teacher Attendance Checkbox Cards (Simplified Checklist)
* **Requirement**: Mark teacher presence for today's periods instantly using simple checkbox cards with labels showing period number, teacher name, and book title.
* **How to Validate**:
  1. Log in as **Areeb** and view the main dashboard (`/dashboard/cr`).
  2. Locate the **Teacher Attendance & Book Progress** section.
  3. **Expected Outcome**:
     - The table has been replaced with a premium flex checklist.
     - Each card displays a checkbox with the exact label: `الحصة [Period Number] - [Teacher Name] - [Book Title]`.
     - Toggling the checkbox instantly updates the teacher's attendance record in the background via AJAX.

### Use Case 12: Teacher Dashboard Calendar Date Selector
* **Requirement**: Allow teachers to select past/future dates on their dashboard to view class schedules and update book progress.
* **How to Validate**:
  1. Log in as a **Teacher** and view the teacher dashboard (`/dashboard/teacher`).
  2. Locate the premium green header card at the top.
  3. Click on the **Change Date** calendar input field and choose a past or future date.
  4. **Expected Outcome**:
     - The dashboard dynamically refreshes and shows the class schedule corresponding to the selected date.
     - The header updates to show the selected date formatted in Arabic locale.

### Use Case 13: In-Line Independent Book Progress Inputs
* **Requirement**: Update book progress pages directly inside the CR dashboard period table.
* **How to Validate**:
  1. Locate the **Page** input box in the period table.
  2. Change the page number (e.g. from 12 to 14) and press **Enter** or click out of the input.
  3. **Expected Outcome**:
     - Progress is saved independently.
     - The input border flashes green to confirm success.
     - Out-of-bounds page inputs (e.g., exceeding book end page) are blocked and trigger warnings.

---

## 📝 Part 6: Book Progress Audit & Timestamp History

### Use Case 14: Precision Time Logging (Audit Trail)
* **Requirement**: Database must log the exact timestamp (date & time) when progress is saved.
* **How to Validate**:
  1. Change any book progress in the CR dashboard or reports page.
  2. Look at the database `book_progress` table.
  3. **Expected Outcome**: The new record logs the exact time of the transaction in the `updated_at` column.

### Use Case 15: "Last Updated" Status Displays
* **Requirement**: Displays the last update time and page number alongside all progress bars.
* **How to Validate**:
  1. Navigate to the **Reports Page** under "Book Progress".
  2. **Expected Outcome**: A clock icon and text stating `Last Updated: [Date/Time] at page [page_no]` is rendered beautifully under the progress bar.
  3. On the **CR Dashboard**, changing a page dynamically updates the text to `الآن (Now) [current_time]`, giving instant feedback to the user.

---
*Created by Antigravity on 17 May 2026. All test cases are ready for validation!*
