from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    database_url: str = Field(
        default="postgresql+psycopg://forge:forge@localhost:5432/forge_pipe",
        alias="DATABASE_URL",
    )
    jwt_secret: str = Field(default="dev-only-change-me", alias="JWT_SECRET")
    jwt_algorithm: str = Field(default="HS256", alias="JWT_ALGORITHM")
    jwt_expires_minutes: int = Field(default=60 * 24 * 7, alias="JWT_EXPIRES_MINUTES")
    cors_origins: list[str] = Field(
        default=["http://localhost:3000"], alias="CORS_ORIGINS"
    )


settings = Settings()
