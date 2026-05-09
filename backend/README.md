# forge-pipe-starter — backend

FastAPI + PostgreSQL + SQLAlchemy 2.0 + Alembic.

## Local dev

```bash
# 1. Postgres (choose one)
docker compose up -d                                       # from repo root, if Docker
brew services start postgresql@18 \
  && createdb forge_pipe \
  && psql postgres -c "CREATE ROLE forge LOGIN PASSWORD 'forge'" \
  && psql postgres -c "GRANT ALL ON DATABASE forge_pipe TO forge"  # native macOS

# 2. Install + migrate + seed
uv sync
uv run alembic upgrade head
uv run python -m app.scripts.seed   # creates demo@forge-pipe.dev / demo1234

# 3. Run
uv run uvicorn app.main:app --reload --port 8000
```

## Endpoints

- `GET /healthz`
- `POST /auth/login` → `{ user, accessToken, expiresAt }`
- `GET /auth/me` (Bearer JWT)
- `GET /items?page=1&pageSize=50&q=…`
- `POST /items` `{ title, description? }`
- `GET /items/{id}`
- `PATCH /items/{id}`
- `DELETE /items/{id}`

## Configuration

Defaults are sensible for local dev. Override via env vars or `.env` in `backend/`:

| Var | Default |
|---|---|
| `DATABASE_URL` | `postgresql+psycopg://forge:forge@localhost:5432/forge_pipe` |
| `JWT_SECRET` | `dev-only-change-me` (CHANGE IN PROD) |
| `JWT_ALGORITHM` | `HS256` |
| `JWT_EXPIRES_MINUTES` | `10080` (7 days) |
| `CORS_ORIGINS` | `["http://localhost:3000"]` |
