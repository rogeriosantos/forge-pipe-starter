import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ItemBase(BaseModel):
    title: str = Field(min_length=1, max_length=120)
    description: str | None = Field(default=None, max_length=2000)


class ItemCreate(ItemBase):
    pass


class ItemUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=120)
    description: str | None = Field(default=None, max_length=2000)


class ItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    owner_id: uuid.UUID = Field(serialization_alias="ownerId")
    title: str
    description: str | None
    created_at: datetime = Field(serialization_alias="createdAt")
    updated_at: datetime = Field(serialization_alias="updatedAt")


class PaginatedItems(BaseModel):
    items: list[ItemOut]
    total: int
    page: int
    page_size: int = Field(serialization_alias="pageSize")
