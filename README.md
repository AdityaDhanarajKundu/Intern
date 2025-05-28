# Job Board Portal

*A full-stack “post & find jobs” web application built with **React 18**, **Node/Express**, **Prisma ORM** & **PostgreSQL (Aiven)**, deployed on **Render**.*

---

## Table of Contents

1. [Project Objectives](#1-project-objectives)  
2. [Technology Stack](#2-technology-stack)  
3. [High-Level Architecture](#3-high-level-architecture)  
4. [Key Functional Modules](#4-key-functional-modules)  
5. [Database Schema](#5-database-schema)  
6. [REST API Specification](#6-rest-api-specification)  
7. [Local Development & Build](#7-local-development--build)  
8. [Deployment on Render](#8-deployment-on-render)  
9. [Security Notes](#9-security-notes)  
10. [Future Enhancements](#10-future-enhancements)  
11. [License](#11-license)  

---

## 1  Project Objectives

* Provide a lightweight **public listing** of open positions (cards view).  
* Allow candidates to **filter by title, location, job-type, salary** in real time.  
* Give hiring managers a **Create Job** modal with inline validation, draft/save, and one-click publish.  
* Persist data in a **cloud Postgres** instance; expose a clean **REST API**.  
* Keep the codebase strictly **component-driven**, **mobile-friendly**, and **easy to extend**.  

---

## 2  Technology Stack

| Layer      | Technology | Notes |
|------------|------------|-------|
| **Frontend** | React 18 (Vite) with hooks (`useState` / `useEffect`), Tailwind-style utility classes, **dayjs** for relative dates, **react-hook-form** + **zod** validation | Deployed as a **static site** on Vercel |
| **Backend**  | Node.js 20, Express 5, `axios` (client), **Prisma ORM** & `@prisma/client`, `schema.prisma` (PostgreSQL datasource) |  |
| **Database** | PostgreSQL on **Aiven** (Free tier) |  |
| **Hosting**  | **Render.com** **Vercel.com** |  |
| **CI / Dev** | ESLint + Prettier, Husky pre-commit (optional), VS Code launch config |  |

---

## 3  Key Functional Modules

| Module            | Responsibility                                                                                   | Source File                    |
|-------------------|---------------------------------------------------------------------------------------------------|--------------------------------|
| **Navbar**        | Logo, desktop links, mobile hamburger & **Create Job** CTA                                        | `components/Navbar.jsx`        |
| **FilterBar**     | Live filters: title search, location auto-suggest, job-type `<select>`, 0 – 100 k salary slider   | `components/FilterBar.jsx`     |
| **JobCards**      | Responsive card (320 × 316 px) showing logo, time-ago, title, meta, bullets, CTA                  | `components/JobCards.jsx`      |
| **CreateJobModal**| Two-column modal form, all fields validated with **zod**, `POST /`                                | `components/CreateJobModal.jsx`|
| **App**           | Glue-layer: global filter state, fetch list, open/close modal 

### 4  REST API Specification

| Verb | Path   | Query / Body Parameters                                            | Purpose                              |
|------|--------|--------------------------------------------------------------------|--------------------------------------|
| GET  | `/`    | `jobTitle`, `location`, `jobType`, `minSalary`, `maxSalary`        | Filter & paginate job listings       |
| POST | `/`    | **JSON body** – validated form object from **CreateJobModal**      | Insert a new job; returns record     |
| GET  | `/:id` | –                                                                  | Fetch a single job (future detail)   |

#### Status Codes
- **200 OK** – successful fetch  
- **201 Created** – successful insert  
- **400 Bad Request** – zod / Prisma validation error  
- **500 Server Error** – unhandled exception  

## 7  Local Development & Build

```bash
# 1  Clone repo
git clone https://github.com/<your-handle>/job-board.git
cd job-board

# 2  Frontend
cd client
npm install
npm run dev           # → http://localhost:5173

# 3  Backend
cd ../server
cp .env.example .env  # add DATABASE_URL, PORT
npm install
npx prisma migrate dev
npm run dev           # → http://localhost:3000
```
