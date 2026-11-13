# LEARNWORKS

## Learn. Exchange. Experience. Get Hired.

### A Full-Stack Web Application for Student Career Development

---

## PROJECT REPORT

---

### Cover Page

| Field | Details |
|---|---|
| Project Title | LearnWorks |
| Project Subtitle | Learn. Exchange. Experience. Get Hired. |
| Student Developer | Deepesh Yadav |
| Subject | Subject Name |
| Guide / Teacher | Teacher Guide Name |
| Institution | Institution Name |
| Academic Year | 2025-2026 |

### Certificate

This is to certify that the project titled "LearnWorks" was designed and developed by Deepesh Yadav as part of the academic submission for the subject "Subject Name" at "Institution Name".

### Acknowledgement

The successful completion of this project would not have been possible without the guidance and support of the faculty mentor and the encouragement of the project team.

The developer expresses sincere gratitude to the teacher for valuable technical feedback, academic supervision, and encouragement during the development of this project.

Special thanks to the academic department for providing the opportunity to work on such an ambitious and meaningful project.

### Abstract

LearnWorks is a full-stack web application built to bridge the gap between learning and employment for students. The platform is built around the core idea of "Learn. Exchange. Experience. Get Hired."

The project addresses a well-known gap in traditional education: certificates alone do not prove a student's skills. Resumes often list skills without any supporting evidence, and learning is frequently disconnected from real-world practice and employer needs.

LearnWorks solves this by integrating four pillars into a single platform:

1. Learn - structured online courses with lessons, video content, and progress tracking, along with practical challenges that require submission and evaluation.
2. Exchange - SkillSwap, a peer-to-peer skill exchange system with a smart matching algorithm, Skill Credits economy, session logging, and verified reviews.
3. Experience - Micro-Internships, short paid projects posted by real businesses, with candidate discovery, AI-style matching scores, application workflows, and payment processing.
4. Get Hired - Portfolio builder, certificates, experience points (XP), skill credits, and reviews that together form verifiable proof of skill acquisition and delivery.

The application supports three roles: Student, Business, and Admin, each with dedicated dashboards and workflows.

The system was implemented using modern web technologies: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Prisma ORM with SQLite, NextAuth.js v5, Socket.io, Razorpay, Recharts, Meilisearch, and YouTube/Vimeo video embeds.

The complete application was developed, seeded with realistic demo data, and verified locally.

Keywords: Full Stack Web Development, Next.js, React, TypeScript, Prisma, SQLite, NextAuth, Socket.io, Razorpay, Portfolio, Micro-Internship, SkillSwap, EdTech.

### Table of Contents

1. Introduction
2. The LearnWorks Solution
3. Technology Stack
4. System Architecture and Database Design
5. Implementation Details
6. Setup, Demo, and Verification
7. Results and Conclusion
8. Future Scope and Enhancements
9. References
10. Appendices

---

# Chapter 1: Introduction

## 1.1 Introduction

LearnWorks is a full-stack web application for students built to connect structured learning, peer skill exchange, real-world micro-internship experience, and portfolio-based proof of skill into a single ecosystem.

The product tagline, "Learn. Exchange. Experience. Get Hired.", captures the four-stage career journey the platform is designed to support.

The application is built with the Next.js full-stack framework, using file-based routing, server actions, relational persistence through Prisma, authentication through NextAuth, real-time messaging through Socket.io, payments through Razorpay, analytics through Recharts, and scalable search through Meilisearch.

## 1.2 Background

Conventional learning management systems focus primarily on content delivery through courses. However, in practice, students accumulate certificates while lacking demonstrable project history, peer-verified skill growth, and real employer exposure.

Resumes typically list technologies as text such as "React" or "Node.js" without any verifiable evidence. Recruiters therefore rely heavily on self-reported information, referrals, and interviews, creating an information gap that is expensive for both students seeking opportunities and businesses seeking talent.

## 1.3 Problem Statement

The project was motivated by three observed problems:

1. Certificates do not prove skills.
2. Learning is disconnected from practice.
3. There is no verifiable skill proof.

## 1.4 Objectives

The primary objectives of the LearnWorks project were:

1. Design and develop a full-stack web application for students.
2. Implement a multi-role system: Student, Business, and Admin.
3. Provide structured learning modules: courses, lessons, challenges, submissions.
4. Implement peer skill exchange through SkillSwap with matching and credits.
5. Implement micro-internship posting, candidate discovery, application workflow, and payments.
6. Implement portfolio, certificate, XP, credit, and review mechanisms for verifiable progress.
7. Provide real-time messaging and notifications.
8. Provide analytics dashboards for students, businesses, and administrators.

---

# Chapter 2: The LearnWorks Solution

## 2.1 Concept

The LearnWorks concept follows a four-part loop:

- Learn: acquire competence through courses and challenges.
- Exchange: strengthen competence through peer teaching and learning.
- Experience: apply competence through real micro-internship projects and paid work.
- Get Hired: convert experience into opportunity through verifiable portfolios and proof.

## 2.2 The Six-Step Career Journey

The platform organizes the student journey into six steps:

1. Discover - Find skills and peers.
2. SkillSwap - Teach and learn from peers.
3. Learn - Take courses and challenges.
4. Practice - Build real projects.
5. Earn - Micro-internships with real pay.
6. Get Hired - Portfolio speaks for you.

## 2.3 Feature Overview

### 2.3.1 Student Features

- 7-step onboarding flow: Basic Info, Skills I Know, Skills to Learn, Interests, Experience, Availability, Career Goal.
- Student dashboard with profile completion, Skill Credits, Experience Points (XP), and application statistics.
- Discover module for discovering peers, courses, and opportunities.
- SkillSwap module: matching, requests, credits, session logging, reviews.
- Courses module: marketplace, course detail, curriculum with ordered lessons and video embeds, enrollments, progress tracking.
- Challenges module: challenge listing, difficulty levels, submission flow with feedback.
- Projects module: personal project builder and community project showcase.
- Micro-Internships module: browsing, applying with proposals, status workflow.
- Portfolio module: skills, projects, XP, certificates, reviews.
- Resume builder: print-friendly resume generation.
- Skill Gap module: analysis across five career paths with roadmaps.
- Earnings module: revenue model and transaction history.
- Messages module: real-time chat via Socket.io.
- Notifications module: activity alerts with deep links.
- Global search across users, courses, projects, skills, internships.

### 2.3.2 Business Features

- Business dashboard with platform analytics.
- Project posting for micro-internships.
- Candidate discovery with skill and level based filtering.
- Application management with status transitions.
- Hiring analytics and candidate match scores.

### 2.3.3 Admin Features

- Platform dashboard with analytics.
- User management.
- Course management.
- Project management.
- Revenue analytics.

---

# Chapter 3: Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js 16.3.5 (App Router) | Full-stack React framework with file-based routing and server actions |
| UI | React 19.2.8 | Component runtime |
| Language | TypeScript 5 | Static typing |
| Styling | Tailwind CSS 4 | Utility-first styling |
| Icons | lucide-react | Icon library |
| Charts | Recharts 3.10.1 | Analytics visualizations |
| Forms | react-hook-form 7.88, zod 4.6.5 | Form handling and validation |
| Auth | NextAuth.js 5.0.0-beta.32 | Authentication with Credentials provider, JWT sessions, bcryptjs hashing |
| Database | Prisma ORM 5.22, SQLite | ORM and relational storage; PostgreSQL recommended for production |
| Real-time | Socket.io 4.8.3 | Messaging with polling fallback |
| Payments | Razorpay integration, test mode | Micro-internship payments with 10% platform commission |
| Search | Meilisearch ready, demo fallback | Full-text search abstraction |
| Video | YouTube / Vimeo embed abstraction | Course lesson media |
| Utilities | date-fns 4.4.0 | Date formatting |

---

# Chapter 4: System Architecture and Database Design

## 4.1 Architecture

The application follows the Next.js App Router architecture:

- Pages and layouts live under src/app, organized by feature.
- Data access is centralized in server actions in src/lib/queries.ts (use server), calling Prisma through src/lib/prisma.ts.
- API routes exist for authentication (NextAuth), registration, and the Socket.io fallback under src/app/api.
- The real-time layer uses a standalone Socket.io server with client and Next.js API fallback.

## 4.2 Database Design

The relational schema contains 33 Prisma models.

---

# Chapter 5: Implementation Details

## 5.1 Implementation Statistics

| Metric | Value |
|---|---|
| TypeScript / TSX source lines | ~8,066 |
| Next.js pages implemented | 31 |
| API route handlers | 3 |
| Reusable UI components | 19 |
| Library modules | 10 |
| Database models | 33 |
| Seed users | 11 |
| Seeded skills | 24 |

## 5.2 Module-Wise Implementation

- Authentication: Credentials provider with bcryptjs and JWT sessions (src/auth.ts, src/lib/auth-context.tsx).
- Registration: validated registration API with role normalization (src/app/api/register/route.ts).
- Onboarding: 7-step student onboarding (src/app/onboarding/page.tsx).
- Dashboard: aggregated student statistics (src/app/dashboard/page.tsx).
- SkillSwap: matching and workflow (src/app/skillswap/page.tsx, src/lib/queries.ts).
- Courses: catalog, detail, curriculum, enrollment, progress (src/app/courses, src/app/learn, src/app/teach).
- Challenges: listing, submission, feedback (src/app/challenges/page.tsx).
- Projects: personal and community projects (src/app/projects/page.tsx).
- Micro-Internships: marketplace, application, payments (src/app/micro-internships, src/app/business).
- Portfolio, Resume, Skill Gap, Earnings: student-facing proof tools (src/app/portfolio, src/app/resume, src/app/skill-gap, src/app/earnings).
- Messaging, Notifications, Search: Socket.io messaging, notification center, global search (src/lib/socket-*, src/lib/search.ts).
- Analytics: business and admin dashboards using Recharts (src/app/business/analytics, src/app/admin/analytics).

## 5.3 Third-Party Integrations

- Razorpay: payment order creation and verification interfaces, 10% platform commission (src/lib/razorpay.ts).
- Meilisearch: index and search abstractions with demo fallback (src/lib/search.ts).
- Video hosting: provider abstraction for YouTube and Vimeo embeds (src/lib/videos.ts).
- Real-time: Socket.io server and client (src/lib/socket-server.ts, src/lib/socket-client.ts).

---

# Chapter 6: Setup, Demo, and Verification

## 6.1 Setup

```bash
cd learnworks
npm install
npx prisma generate
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
npm run dev
```

The application runs at http://localhost:3000.

## 6.2 Demo Credentials

| Role | Email | Password |
|---|---|---|
| Student | deepesh@learnworks.demo | demo1234 |
| Business | business@learnworks.demo | demo1234 |
| Admin | admin@learnworks.demo | demo1234 |

## 6.3 Demo Verification

The platform was verified using seeded data covering:

- Student learning journeys (courses, XP, challenges, certificates).
- Peer skill exchange (SkillSwap, credits, reviews).
- Micro-internship applications, acceptance, and payments.
- Real-time messaging and notifications.

---

# Chapter 7: Results and Conclusion

The LearnWorks platform successfully demonstrates a complete full-stack student career ecosystem: learning content delivery, peer skill exchange, practical challenges, paid micro-internships, portfolio building, authentication, real-time communication, payments, and analytics.

The project validates that a unified platform can effectively connect learning, experience, and employment proof.

---

# Chapter 8: Future Scope and Enhancements

Planned production enhancements:

1. Switch from SQLite to PostgreSQL.
2. Deploy Socket.io alongside the Next.js application.
3. Run a production-grade full-text search engine.
4. Configure production Razorpay keys.
5. Add dedicated video hosting.
6. Add rate limiting and CSRF protection.
7. Add email notifications.
8. Add file uploads for avatars and project images.

---

# Chapter 9: References

- Next.js Documentation — https://nextjs.org/docs
- React Documentation — https://react.dev
- TypeScript Documentation — https://www.typescriptlang.org/docs
- Tailwind CSS Documentation — https://tailwindcss.com/docs
- Prisma Documentation — https://www.prisma.io/docs
- NextAuth.js Documentation — https://authjs.dev
- Socket.io Documentation — https://socket.io/docs
- Razorpay Documentation — https://razorpay.com/docs
- Meilisearch Documentation — https://www.meilisearch.com/docs
- YouTube IFrame Embeds — https://developers.google.com/youtube/youtube-iframe-api

---

# Chapter 10: Appendices

### Appendix A — Setup Commands

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
npm run dev
```

### Appendix B — Demo Credentials

Student: deepesh@learnworks.demo / demo1234
Business: business@learnworks.demo / demo1234
Admin: admin@learnworks.demo / demo1234

### Appendix C — Key Project URLs

- Landing Page: src/app/page.tsx
- Student Dashboard: src/app/dashboard/page.tsx
- SkillSwap: src/app/skillswap/page.tsx
- Courses: src/app/courses
- Challenges: src/app/challenges
- Micro-Internships: src/app/micro-internships
- Portfolio: src/app/portfolio
- Business Dashboard: src/app/business/dashboard
- Admin Dashboard: src/app/admin/dashboard

---

LearnWorks — Learn. Exchange. Experience. Get Hired.
