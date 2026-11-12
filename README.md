# Zenin Systems Solutions LLP — Enterprise B2B Website & CMS

Production-ready full-stack corporate website, solutions catalog, lead-generation platform, and secure content management dashboard built for **Zenin Systems Solutions LLP**.

## 1. Technology Stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 15 (App Router, Server Components, Server Actions, Route Handlers), TypeScript |
| **Styling & UI** | Tailwind CSS v4, custom enterprise industrial design system (`#0B1730`, `#142B49`, `#1877F2`, `#00B8D9`), Lucide React |
| **Animations** | Motion / Framer Motion with reduced-motion accessibility support |
| **Database & ORM** | PostgreSQL + Prisma ORM (with portable local verification support) |
| **Authentication** | Server-side HTTP-only session authentication with `bcryptjs` password hashing & role-based access (`SUPER_ADMIN`, `EDITOR`) |
| **Forms & Validation** | React Hook Form + Zod (`@hookform/resolvers/zod`) |
| **Media Storage** | Pluggable storage adapter supporting Cloudinary, S3-compatible object storage, and local development uploads |
| **Email Notifications** | Resend / Nodemailer SMTP transactional notification service |
| **Testing** | Vitest automated test suite |

---

## 2. Public Sitemap & Architecture

- `/` — Homepage (Hero, Core Pillars, AI Video Analytics Showcase, 12 Engineering Services, Industries Served, Why Choose Us, Conditional Projects/Testimonials/Brands, Quote CTA)
- `/about-us` — Company Profile, Engineering Philosophy, Mission & Vision, Core Values, Capabilities
- `/products` — Complete Product & Solutions Catalog (4 Core Solution Pillars + 15 Wider Portfolio Categories + Filterable Product Directory)
- `/products/item/[slug]` — Individual Product Detail Page with technical specifications & context-aware quote attribution
- `/products/cctv-surveillance` — Industrial CCTV & Video Surveillance Pillar Page
- `/products/ai-video-analytics` — AI Video Analytics Hub (Categories A–E, 21 Named AI Vision Applications)
- `/products/ai-video-analytics/[solution-slug]` — Dynamic Detail Page for each of the 21 AI Video Analytics Applications
- `/products/video-management` — Video Management Solutions (VMS) Pillar Page
- `/products/intelligent-automation` — Intelligent Automation Solutions Pillar Page
- `/services` — 12 Engineering & Technology Service Categories Hub
- `/services/[service-slug]` — Dynamic Detail Page for each of the 12 Service Categories
- `/brands` — Configurable Technology Brands & Ecosystem Partners Page
- `/testimonials` — Configurable Client Testimonials Page
- `/contact-us` — Contact Information & Project Quote Request Page
- `/privacy-policy` & `/terms-and-conditions` — Configurable Legal Pages
- `/sitemap.xml` & `/robots.txt` — Dynamic XML Sitemap and Robots Policy (excluding `/admin`)

---

## 3. Secure Admin CMS (`/admin`)

- `/admin/login` — Secure Administrator Sign-In
- `/admin/dashboard` — KPI Cards, Recent Leads, Category Summaries, Quick Actions, Audit Log Feed
- `/admin/enquiries` — Lead Management, Status Workflow (`NEW`, `CONTACTED`, `IN_PROGRESS`, `QUOTED`, `CLOSED`, `SPAM`), Internal Notes, CSV Export (`/api/admin/enquiries/export`)
- `/admin/products` — Product CRUD, Technical Specifications, Features, Applications, Review Flags
- `/admin/categories` — Product Categories (4 Core Pillars + 15 Wider Portfolio Categories) CRUD
- `/admin/ai-solutions` — AI Video Analytics Solutions CRUD (Categories A–E, 21 Solutions, including `HDRI Wheel Inspection` technical review flag)
- `/admin/services` — 12 Engineering Service Categories CRUD
- `/admin/testimonials` — Testimonials CRUD (hidden on public homepage until published records exist)
- `/admin/brands` — Brands & Partners CRUD (hidden on public homepage until published records exist)
- `/admin/industries` — Industries Served & Featured Projects CRUD
- `/admin/content` — Structured CMS Editor for Homepage, About Us, Contact, and Legal Sections
- `/admin/media` — Media Upload, Alt-Text Management, and Reference-Protected Deletion (`/api/admin/media`)
- `/admin/settings` — Global Site Settings, Contact Placeholders, Navigation Visibility Toggles, Announcement Bar, SEO Defaults
- `/admin/profile` — Admin Account Password Change & User Provisioning (`SUPER_ADMIN`)

---

## 4. Local Setup & Development

### Prerequisites

- **Node.js** `>= 20.x`
- **pnpm** `>= 9.x`
- **PostgreSQL** database (or local Prisma file database for offline development/testing)

### Step 1: Install Dependencies

```bash
pnpm install
```

### Step 2: Configure Environment Variables

Copy `.env.example` to `.env` and populate your configuration values:

```bash
cp .env.example .env
```

Required environment variables in `.env`:

- `DATABASE_URL` — PostgreSQL connection string (`postgresql://USER:PASSWORD@HOST:5432/zenin_systems?schema=public`)
- `AUTH_SECRET` — Random 32+ character secret for signing session tokens
- `ADMIN_INITIAL_EMAIL` — Email address for bootstrapping the initial `SUPER_ADMIN` user during `pnpm db:seed`
- `ADMIN_INITIAL_PASSWORD` — Strong password (minimum 10 characters) for bootstrapping the initial `SUPER_ADMIN` user during `pnpm db:seed`
- `ADMIN_NOTIFICATION_EMAIL` — Destination email for new lead/quote alerts
- `RESEND_API_KEY` or `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` — Email delivery configuration
- `STORAGE_PROVIDER` — `local`, `cloudinary`, or `s3`

> **Security Note:** Never commit `.env` or hardcode administrator passwords in source control.

### Step 3: Initialize & Seed the Database

For PostgreSQL deployments:

```bash
pnpm db:use:postgres
npx prisma migrate deploy
pnpm db:seed
```

For local development push:

```bash
pnpm db:push
pnpm db:seed
```

### Step 4: Start the Development Server

```bash
pnpm dev
```

Open `http://localhost:3000` for the public website and `http://localhost:3000/admin` for the administration portal.

---

## 5. Verification & Testing

Run the automated test suite, TypeScript compiler check, and production build:

```bash
# Run Vitest unit & integration test suite
pnpm test

# Run TypeScript type checking
pnpm typecheck

# Run production Next.js build
pnpm build
```

---

## 6. Deployment (Vercel + Managed PostgreSQL)

1. Provision a managed PostgreSQL database (Neon, Supabase, AWS RDS, or Vercel Postgres).
2. In your deployment environment variables, set `DATABASE_URL` to your PostgreSQL connection string along with `AUTH_SECRET`, `ADMIN_INITIAL_EMAIL`, `ADMIN_INITIAL_PASSWORD`, and storage/email credentials.
3. Configure the build command in Vercel:
   ```bash
   pnpm db:use:postgres && npx prisma generate && npx prisma migrate deploy && pnpm build
   ```
4. Run `pnpm db:seed` once against the production database to populate the 19 product categories, 21 AI video analytics applications, 12 engineering service categories, industries, CMS blocks, and initial administrator account.
