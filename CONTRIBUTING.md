# Contributing to Madrassa Management System (MMS)

Thank you for your interest in contributing to the Madrassa Management System (MMS)! We welcome community involvement to make this system robust, localized, and useful for educational institutions worldwide.

## How Can I Contribute?

### 1. Reporting Bugs
- Search existing issues before opening a new one.
- Describe the bug clearly: what did you expect to happen, what actually happened, and steps to reproduce.
- Include environment information (Node.js version, database, browser, OS).

### 2. Suggesting Enhancements
- Open an issue explaining the feature and why it would be beneficial to Islamic schools/seminaries.
- Describe use cases and possible implementation ideas.

### 3. Submitting Pull Requests (PRs)
- Fork the repository and create your branch from `main`.
- Install dependencies locally with `npm install`.
- Ensure your code does not contain institution-specific secrets, custom usernames, or hardcoded passwords.
- Keep commits focused on a single topic with clear commit messages.
- Open a PR describing your changes.

## Development Environment Setup

### Prerequisites
- Node.js (v18+)
- MySQL (v8.0+)
- OR Docker and Docker Compose

### Local Development (Standard Setup)
1. Clone your fork and create a branch.
2. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```
3. Update the database credentials in `.env`.
4. Run the database migrations:
   ```bash
   npm run migrate
   ```
5. Seed a default admin user:
   ```bash
   npm run seed
   ```
6. (Optional) Seed the database with mock Urdu/Arabic demo data:
   ```bash
   npm run seed:demo
   ```
7. Start the dev server:
   ```bash
   npm start
   ```

### Docker Setup
Simply run:
```bash
docker compose up
```
This starts both the app and a MySQL database. In another terminal, you can seed the database:
```bash
docker compose exec app npm run migrate
docker compose exec app npm run seed
```

## Security Disclosure
If you find a security vulnerability, please do NOT open a public issue. Instead, email the repository owner privately so we can issue a security patch before the exploit is public.
