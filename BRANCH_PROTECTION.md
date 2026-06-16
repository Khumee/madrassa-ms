# Git Workflow & Branch Protection Guidelines

To protect the integrity of the codebase and ensure safe, robust releases, we utilize a multi-branch workflow paired with GitHub branch protection policies.

## 1. Branch Layout

* **`main`**: The primary development branch. All new feature branches and bug fixes are merged here after passing code reviews and checks.
* **`live`**: The production release branch. Pushing to this branch triggers the auto-deployment pipeline to the live server. Direct pushes to `live` are forbidden; releases must be merged from `main`.

---

## 2. GitHub Branch Protection Setup

To configure these rules in GitHub:
1. Navigate to the repository settings: **Settings > Branches**.
2. Click **Add rule** under **Branch protection rules**.

### Rules for `main`
* **Branch name pattern**: `main`
* **Require a pull request before merging**: Check this.
  * **Require approvals**: Check this and set to at least `1`.
* **Require status checks to pass before merging**: Check this (if CI/CD tests are configured).
* **Forbid force pushes**: Ensure force pushes are blocked (default).
* **Restrict deletions**: Check this.

### Rules for `live`
* **Branch name pattern**: `live`
* **Require a pull request before merging**: Check this.
  * **Require approvals**: Check this (forces team alignment before deploying to production).
* **Require status checks to pass before merging**: Check this.
* **Forbid force pushes**: Ensure force pushes are blocked.
* **Restrict deletions**: Check this.

---

## 3. Deployment Safety Check

- The database migrations are consolidated in the repository.
- **IMPORTANT**: When deploying updates to the production server that modify the migration scripts, the `schema_history` table on the production server must be dropped or truncated beforehand. Since the production database structure already contains the changes, resetting `schema_history` will allow the consolidated `V1__Schema.sql` to execute as a no-op / verify step safely without crashing.
