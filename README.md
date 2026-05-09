# forge-pipe-starter

Vetted full-stack starter consumed by the [`app-forge-pipe`](https://github.com/rogeriosantos/app-forge-pipe) Claude Code plugin.

This repo is the foundation of the pipeline. The plugin clones it (at a pinned commit) at `Phase 6 — /pipe:scaffold`, then layers project-specific features on top via `/pipe:features`. Everything in this repo must work end-to-end before the plugin consumes it.

## What's in the box

A real, deployable, two-tier app:

- **Frontend** — Next.js 15 App Router · TypeScript · Tailwind · shadcn/ui · NextAuth v5 · next-intl
  - Auth flows: login · signup · forgot/reset password · email verification · OAuth slots (Google, GitHub)
  - Account pages: profile (read+edit) · settings (account, security, notifications, danger zone)
  - App shell: sidebar · topbar · responsive mobile drawer · theme switcher
  - Error pages: 404 · 500 · 403
  - One example CRUD module (`/items`) wired end-to-end as the **reference shape** every plugin-generated CRUD follows
  - Typed API client with auth header injection
- **Backend** — FastAPI · PostgreSQL · SQLAlchemy 2.0 · Alembic · Pydantic v2 · uv
  - JWT verification middleware compatible with NextAuth v5 sessions (shared secret)
  - Initial Alembic migration: `users`, `sessions`, `items`
  - Items CRUD endpoints: `GET /items` (paginated) · `POST /items` · `GET /items/{id}` · `PATCH /items/{id}` · `DELETE /items/{id}`
  - Health endpoint: `GET /healthz`
  - CORS configured for the frontend origin
  - Seed script for local dev
- **E2E** — Playwright smoke gauntlet that exercises the full stack
- **Local dev** — `docker-compose.yml` for Postgres (or point at any Postgres you already have)

## Stack rationale

- **NextAuth v5 (Auth.js)** — the standard auth solution for Next.js App Router. No Supabase anywhere.
- **FastAPI + Postgres** — explicit backend with full control. No Supabase as a backend either.
- **Single starter, single stack** — narrow scope, deeply tested. Variants live in branches, not in this main path.

## Quick start

```bash
# 1. Database (choose one)
docker compose up -d                                     # if you have Docker
# or
brew services start postgresql@18 && createdb forge_pipe # native macOS

# 2. Backend
cd backend
uv sync
uv run alembic upgrade head
uv run python -m app.scripts.seed
uv run uvicorn app.main:app --reload --port 8000

# 3. Frontend (new terminal)
cd frontend
npm install
cp .env.example .env.local   # then edit AUTH_SECRET, DATABASE_URL
npm run dev                  # http://localhost:3000

# 4. Smoke (new terminal)
cd e2e
npm install
npx playwright install --with-deps
npx playwright test
```

After the smoke suite is green, you have a working app: signup → login → dashboard → profile edit → settings change → Items CRUD → logout.

## How the plugin consumes this

`/pipe:scaffold` runs:

1. Clones this repo at the pinned commit recorded in the plugin's `forge-pipe-state.json`
2. Applies the project's `tokens.json` (from `/pipe:design`) to `frontend/tailwind.config.ts` and `frontend/app/globals.css`
3. Swaps branding (project name, package.json name, README)
4. Runs the bundled smoke suite as the gate — phase only completes when smoke is green

After that, `/pipe:features` generates one CRUD module per project entity by templating the shape of `/items`.

## Repository layout

```
forge-pipe-starter/
├── frontend/         Next.js 15 + NextAuth v5 + shadcn
├── backend/          FastAPI + Postgres + Alembic
├── e2e/              Playwright smoke suite
├── docker-compose.yml
└── .github/workflows/  CI: smoke runs on every push
```

## Versioning

The plugin pins to a specific commit SHA. Every commit on `main` is smoke-tested in CI; only commits with green CI are eligible to be pinned.
