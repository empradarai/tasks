# Tasks — Simple Task Manager

A full-stack task management app built with **Next.js 15** (App Router), **MongoDB**, **NextAuth**, **Redux Toolkit**, and **Resend**.

## Features

- User registration and login (credentials)
- Welcome email on signup via Resend (no email confirmation yet)
- CRUD tasks scoped per user
- Redux for optimistic, responsive task list UX
- Simple, functional UI

## Prerequisites

- Node.js 18+
- MongoDB running locally or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string
- [Resend](https://resend.com) API key (for welcome emails)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables and adjust as needed:

   ```bash
   cp .env.example .env
   ```

   | Variable | Description |
   |----------|-------------|
   | `MONGODB_URI` | MongoDB connection string |
   | `NEXTAUTH_SECRET` | Random string for JWT signing |
   | `NEXTAUTH_URL` | App URL (e.g. `http://localhost:3000`) |
   | `RESEND_API_KEY` | Resend API key |
   | `RESEND_FROM_EMAIL` | Verified sender in Resend |

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000), register, and manage tasks.

## Project structure

```
src/
  app/              # App Router pages & API routes
  components/       # Reusable UI (Button, Input, tasks, auth)
  lib/              # DB, auth, email, validations
  models/           # Mongoose schemas
  store/            # Redux store & tasks slice
  types/            # Shared TypeScript types
```

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — production server
- `npm run lint` — ESLint
"# tasks" 
