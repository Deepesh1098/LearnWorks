# LearnWorks

### Learn. Exchange. Experience. Get Hired.

A full-stack student career platform connecting learning, peer skill exchange, micro-internships, and portfolio building.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** SQLite via Prisma ORM
- **Auth:** NextAuth.js v5 (Credentials provider)
- **Real-time:** Socket.io (with polling fallback)
- **Search:** Meilisearch-ready (demo search fallback)
- **Payments:** Razorpay integration (test mode ready)
- **Video:** YouTube/Vimeo embed abstraction

## Setup

```bash
cd learnworks
npm install
npx prisma generate
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
npm run dev
```

Open http://localhost:3000

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Student | deepesh@learnworks.demo | demo1234 |
| Business | business@learnworks.demo | demo1234 |
| Admin | admin@learnworks.demo | demo1234 |

## Features Implemented

### Core Platform
- Landing page with 10 sections
- Multi-role authentication (Student, Business, Admin)
- 7-step student onboarding flow
- Student dashboard with stats
- SkillSwap matching algorithm
- Skill Credits system
- Course marketplace with enrollments
- Course player with lesson navigation
- Challenges with submission flow
- Portfolio project builder
- Micro-internship marketplace
- Candidate matching (AI-style scoring)
- Application status workflow

### Supporting Features
- Resume builder (print-friendly)
- Skill gap analysis (5 career paths)
- Earnings tracker
- Real-time messaging (Socket.io)
- Notification center
- Global search
- Public portfolio pages (`/u/username`)

### Business Features
- Business dashboard
- Project posting
- Candidate discovery with filters
- Application management
- Hiring analytics

### Admin Features
- Platform dashboard
- User management
- Course management
- Project management
- Revenue analytics

### Integrations

#### 1. SQLite + Prisma ORM
- Full database schema with 25+ models
- Migrations, seeding, studio
- File: `prisma/schema.prisma`

#### 2. NextAuth.js Authentication
- Credentials provider with bcryptjs
- JWT sessions
- File: `src/auth.ts`

#### 3. Socket.io Real-time Messaging
- Run separately: `npm run socket`
- Falls back to polling when not available
- Files: `src/lib/socket-server.ts`, `src/lib/socket-client.ts`

#### 4. Razorpay Payments
- Test mode ready (no API keys needed for demo)
- 10% platform commission logic
- File: `src/lib/razorpay.ts`
- To enable: Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to `.env.local`

#### 5. Meilisearch Search
- Demo search works without Meilisearch
- Full-text search when Meilisearch is running
- Install: `curl -L https://install.meilisearch.com | sh`
- File: `src/lib/search.ts`

#### 6. Video Hosting
- YouTube/Vimeo embed abstraction
- Works without API keys
- File: `src/lib/videos.ts`

## Environment Variables

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Optional
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_API_KEY=your_key
SOCKET_PORT=3001
```

## Scripts

```bash
npm run dev          # Start Next.js dev server
npm run build        # Production build
npm run db:seed      # Seed database
npm run db:reset     # Reset and reseed
npm run db:studio    # Open Prisma Studio
npm run socket       # Start Socket.io server
```

## Known Limitations

- SQLite not suitable for production (swap to PostgreSQL)
- Socket.io runs as separate process
- No real video hosting (uses embeds)
- No real payment processing (test mode)
- No full-text search engine running (demo fallback)

## Next Steps for Production

1. Switch to PostgreSQL (change `provider` in `prisma/schema.prisma`)
2. Deploy Socket.io with the app
3. Add Meilisearch or Algolia for search
4. Set up Razorpay production keys
5. Add video hosting (Cloudflare Stream, Bunny, or Mux)
6. Add rate limiting and CSRF protection
7. Set up email notifications
8. Add file upload for avatars and project images
