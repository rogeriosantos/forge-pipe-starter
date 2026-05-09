from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select

from app.auth.deps import CurrentUser, DbSession
from app.auth.jwt import create_access_token
from app.auth.password import verify_password
from app.models import User
from app.schemas.auth import LoginRequest, LoginResponse, UserOut

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=LoginResponse, response_model_by_alias=True)
def login(payload: LoginRequest, db: DbSession) -> LoginResponse:
    user = db.execute(
        select(User).where(User.email == payload.email.lower())
    ).scalar_one_or_none()

    if user is None or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token, expires_at = create_access_token(subject=str(user.id))
    return LoginResponse(
        user=UserOut.model_validate(user),
        access_token=token,
        expires_at=expires_at,
    )


@router.get("/me", response_model=UserOut, response_model_by_alias=True)
def me(user: CurrentUser) -> UserOut:
    return UserOut.model_validate(user)
