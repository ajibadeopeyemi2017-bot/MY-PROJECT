# Deployment Guide — Greater Light Global Consult & Academy (GLGC)

This full-stack web application is built with **React** for the frontend and **Next.js** for the backend (API routes & server-rendered App Router).

---

## 🌟 Quick Options for Deployment

### Option 1: Vercel Deployment (Recommended for Full Next.js Backend)

Since this website utilizes Next.js backend API routes (`/api/courses`, `/api/certificates`, `/api/consultations`, `/api/discussions`, `/api/mentorship`), **Vercel** provides the most seamless full-stack deployment with zero configuration.

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete Next.js backend and React frontend"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
3. Click **"Add New Project"** and select `ajibadeopeyemi2017-bot/MY-PROJECT`.
4. Leave the default settings (Framework preset: Next.js).
5. Click **Deploy**.
6. Vercel will automatically build the React frontend and deploy the Next.js API routes as serverless endpoints. Every subsequent `git push` to `main` will automatically trigger a new production deployment.

---

### Option 2: GitHub Pages Deployment (Automated via GitHub Actions)

We have preconfigured a GitHub Actions CI/CD workflow at `.github/workflows/deploy.yml`.

1. **Enable GitHub Pages in your repository**:
   - Go to your repository on GitHub: `https://github.com/ajibadeopeyemi2017-bot/MY-PROJECT`
   - Click **Settings** > **Pages** (under Code and automation in the left sidebar).
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
2. **Push to `main`**:
   ```bash
   git add .
   git commit -m "feat: setup GitHub Actions deployment workflow"
   git push origin main
   ```
3. GitHub Actions will automatically run the build and publish your site to:
   `https://ajibadeopeyemi2017-bot.github.io/MY-PROJECT/`

> **Note:** The React frontend includes built-in graceful local fallback (`lib/api-client.js`). When running on GitHub Pages (static hosting), courses, quizzes, notes, consultations, and discussions function seamlessly using client-side memory and storage.

---

### Option 3: Self-Hosted Node.js / VPS Server

To run the full Next.js production server on any Ubuntu/Linux VPS (e.g. DigitalOcean, AWS EC2, or Render):

1. **Clone and Install**:
   ```bash
   git clone https://github.com/ajibadeopeyemi2017-bot/MY-PROJECT.git
   cd MY-PROJECT
   npm install
   ```
2. **Build the Application**:
   ```bash
   npm run build
   ```
3. **Start Production Server**:
   ```bash
   npm run start
   ```
   The site will be live at `http://localhost:3000`. You can use **PM2** to keep it running continuously:
   ```bash
   npm install -g pm2
   pm2 start npm --name "glgc-academy" -- run start
   ```

---

## 🛠 Local Development Commands

- **Run Dev Server**:
  ```bash
  npm run dev
  ```
  Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Build for Production**:
  ```bash
  npm run build
  ```

- **Run Production Build Locally**:
  ```bash
  npm run start
  ```

---

## 📁 Architecture Overview

- `app/layout.jsx` — Global HTML layout, metadata, Google Fonts, and design system styling.
- `app/page.jsx` — React Homepage with course catalog, currency switcher (USD/NGN), bento ecosystem, study abroad admissions, and mentorship booking.
- `app/classroom/page.jsx` — React Student Virtual Classroom with custom video player, synchronized notes, formula sheets, diagnostic checkpoint quizzes, and student discussion Q&A.
- `app/teacher-portal/page.jsx` — React Educator Portal with interactive 80% revenue calculator, onboarding wizard, and Course Studio syllabus builder.
- `app/api/` — Next.js Backend Route Handlers:
  - `/api/courses` — Course catalog fetching & custom course publishing.
  - `/api/certificates` — Cryptographic certificate verification and issuance.
  - `/api/consultations` — Study abroad advisory booking.
  - `/api/discussions` — Classroom student Q&A threads.
  - `/api/mentorship` — 1-on-1 strategy sessions with Engr. Ajibade.
- `components/` — Modular React UI components (Navbar, Footer, CourseCard, Modals, Toast).
- `lib/api-client.js` — Client API communication with graceful offline/static fallbacks.
