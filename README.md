# STAR EGGS — Commercial Egg Wholesale, Retail & Distribution Web Platform

![Star Eggs Hero Banner](/public/images/products/egg-tray.svg)

STAR EGGS is a high-performance, award-grade full-stack commercial web platform for an egg wholesale, retail, and regional logistics network headquartered in Adilabad and expanding across all 33 districts of Telangana, India.

---

## 1. Brand Identity & Design System

- **Midnight Navy (`#071426`)**: Deep cinematic background evoking premium studio environments.
- **Cobalt Blue (`#174BFF`)**: Dynamic lighting, primary interactive elements, and focused rim illumination.
- **Bright Red (`#FF303B`)**: High-contrast commercial action highlights, badges, and attention points.
- **Pure White (`#FFFFFF`)**: High-contrast typography and product presentation.
- **Cool Light Grey (`#F3F6FB`)**: High-legibility body backgrounds and spec tables.
- **Secondary Text (`#AAB7CC`)**: Balanced secondary typography.

---

## 2. Key Features

### 🌟 Immersive 3D & Cinematic Motion
- **Photorealistic 3D Egg Studio**: Built with Three.js, React Three Fiber (`@react-three/fiber`), and Drei (`@react-three/drei`).
- **Dramatic Studio Lighting**: Cobalt-blue directional rim lighting, red accent spotlights, and ground contact shadows.
- **Pointer-Responsive Parallax**: Smooth cursor tracking and scroll-linked depth transitions.
- **Graceful WebGL Fallback**: High-impact CSS/SVG fallback ensures fluid presentation on mobile devices and systems with reduced-motion preferences.

### 📦 Commercial Products & Packaging
- **Standard White Eggs (30-Egg Tray)**: Rigid paper pulp trays engineered for zero transit vibration.
- **Commercial Master Cartons (210 Eggs)**: Double-walled heavy corrugated boxes for bulk distributor transit.
- **Select Table White Eggs**: Calibrated uniform size-graded eggs sorted through candling standards.
- **Farm Fresh Brown Eggs**: Specialty batch lots for modern retail marts.
- **Standing Institutional Supply**: Morning replenishment contracts for hotels, bakeries, and cloud kitchens.

### 📍 Registered Shop & Operations Hub Location
- **Head Office & Commercial Shop**: Commercial Complex, Market Road, Near Old Bus Stand, Adilabad, Telangana 504001
- **Google Maps Location**: [https://maps.app.goo.gl/BzzxbCL7VV8kjbS26](https://maps.app.goo.gl/BzzxbCL7VV8kjbS26)
- **Fleet Dispatch Hours**: Monday – Saturday: 5:00 AM – 8:00 PM IST | Sunday: 5:00 AM – 1:00 PM IST
- **Wholesale Walk-in Counter**: Direct spot purchasing and bulk crate loading.

### 🗺️ Interactive Telangana Supply Network
- **All 33 Districts Modeled**: Real-time coverage classification:
  - `Currently Served`: Daily active morning fleets (Hyderabad, Rangareddy, Medchal, Sangareddy).
  - `Planned Expansion`: Regional hubs under onboarding (Warangal, Karimnagar, Nizamabad, Khammam, etc.).
  - `Contact us to confirm availability`: Custom bulk dispatches.
- **Click-to-Enquire**: Selecting any district automatically routes to the wholesale quotation desk with that district pre-selected.

### 💼 B2B Quotation & Enquiry Engine
- Comprehensive quotation forms with client and server-side validation.
- Anti-spam honeypot bot trap.
- Automatic assignment of unique reference IDs.
- Direct official WhatsApp follow-up link generation with prefilled commercial briefs.

### 🛡️ Secure Admin Operations Dashboard
- **Authentication**: Secure bcrypt password verification with HTTP-only JWT sessions.
- **Enquiry Manager**: Search, filter by status (New, Contacted, Quotation Sent, Approved, Completed), edit internal notes, and download one-click CSV reports.
- **Distribution Applications**: Review candidate logistics fleet, warehouse capacity, and contact applicants directly via WhatsApp.
- **Product Manager**: Toggle daily stock availability, adjust MOQ, and add new inventory.
- **Districts Coverage Manager**: Toggle live coverage status and update route hub notes for any of the 33 districts.
- **Settings Manager**: Live configuration of phone numbers, official WhatsApp link, emails, and announcement marquee.

---

## 3. Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript & JSX only (`.js`, `.jsx` — strict adherence to no-TypeScript rule)
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Database & ORM**: Prisma ORM with SQLite (development out-of-the-box, 100% compatible with MySQL / PostgreSQL in production)
- **Authentication**: `bcryptjs` + `jsonwebtoken` (HTTP-only secure cookies)

---

## 4. Getting Started

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd G:\Usama\Usama\Stareggs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. Initialize and seed the database:
   ```bash
   npx prisma generate
   npx prisma db push
   node prisma/seed.js
   ```

5. Run development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 5. Default Credentials

- **Admin Login Route**: `/admin/login`
- **Default Email**: `admin@stareggs.in`
- **Default Password**: `Admin@StarEggs2026`
*(Please update the password and `ADMIN_JWT_SECRET` in your `.env` file before deploying to production).*

---

## 6. Verification & Automated Tests

Run the system validation suite to verify all models, relationships, and authentication logic:
```bash
node tests/verify-system.js
```

Build the production bundle:
```bash
npm run build
```

Start the production server:
```bash
npm run start
```

---

## 7. Production Deployment Guide

### Option A: Vercel / Cloud Platforms
1. Push repository to GitHub/GitLab.
2. Connect to Vercel.
3. Configure environment variables (`DATABASE_URL`, `ADMIN_JWT_SECRET`, `NEXT_PUBLIC_SITE_URL`, etc.).
4. When using PostgreSQL or MySQL on Supabase / PlanetScale / AWS RDS, change provider in `prisma/schema.prisma` to `mysql` or `postgresql`.

### Option B: Node.js VPS / Docker (Ubuntu / Linux)
1. Install Node.js 20+ and PM2:
   ```bash
   npm install -g pm2
   ```
2. Build and start:
   ```bash
   npm run build
   pm2 start npm --name "stareggs-web" -- start
   ```
3. Configure Nginx reverse proxy with SSL via Let's Encrypt Certbot.

---

## 8. Commercial Policy & Transparency Notice

STAR EGGS strictly abides by factual commercial representation. Wholesale prices fluctuate with daily market indices. Product availability and route timings are confirmed directly through the operations desk upon receipt of enquiry.

© 2026 STAR EGGS. All rights reserved.
