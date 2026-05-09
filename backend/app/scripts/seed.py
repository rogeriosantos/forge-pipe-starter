"""Seed a single test user. Idempotent: re-running is safe."""

from sqlalchemy import select

from app.auth.password import hash_password
from app.db import SessionLocal
from app.models import User

SEED_EMAIL = "demo@forge-pipe.dev"
SEED_PASSWORD = "demo1234"
SEED_NAME = "Demo User"


def seed() -> None:
    db = SessionLocal()
    try:
        existing = db.execute(select(User).where(User.email == SEED_EMAIL)).scalar_one_or_none()
        if existing:
            print(f"User {SEED_EMAIL} already exists. Skipping.")
            return

        user = User(
            email=SEED_EMAIL,
            name=SEED_NAME,
            hashed_password=hash_password(SEED_PASSWORD),
            email_verified=True,
        )
        db.add(user)
        db.commit()
        print(f"Created user: {SEED_EMAIL} (password: {SEED_PASSWORD})")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
