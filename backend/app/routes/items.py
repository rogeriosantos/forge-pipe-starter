import uuid

from fastapi import APIRouter, HTTPException, Query, Response, status
from sqlalchemy import func, or_, select

from app.auth.deps import CurrentUser, DbSession
from app.models import Item
from app.schemas.item import ItemCreate, ItemOut, ItemUpdate, PaginatedItems

router = APIRouter(prefix="/items", tags=["items"])


@router.get("", response_model=PaginatedItems, response_model_by_alias=True)
def list_items(
    user: CurrentUser,
    db: DbSession,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=50, ge=1, le=200, alias="pageSize"),
    q: str | None = Query(default=None),
) -> PaginatedItems:
    base = select(Item).where(Item.owner_id == user.id)
    if q:
        like = f"%{q.lower()}%"
        base = base.where(
            or_(
                func.lower(Item.title).like(like),
                func.lower(func.coalesce(Item.description, "")).like(like),
            )
        )

    total = db.execute(
        select(func.count()).select_from(base.subquery())
    ).scalar_one()

    rows = db.execute(
        base.order_by(Item.updated_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
    ).scalars().all()

    return PaginatedItems(
        items=[ItemOut.model_validate(r) for r in rows],
        total=total,
        page=page,
        page_size=page_size,
    )


@router.post("", response_model=ItemOut, response_model_by_alias=True, status_code=status.HTTP_201_CREATED)
def create_item(payload: ItemCreate, user: CurrentUser, db: DbSession) -> ItemOut:
    item = Item(owner_id=user.id, title=payload.title, description=payload.description)
    db.add(item)
    db.commit()
    db.refresh(item)
    return ItemOut.model_validate(item)


@router.get("/{item_id}", response_model=ItemOut, response_model_by_alias=True)
def get_item(item_id: uuid.UUID, user: CurrentUser, db: DbSession) -> ItemOut:
    item = db.get(Item, item_id)
    if item is None or item.owner_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return ItemOut.model_validate(item)


@router.patch("/{item_id}", response_model=ItemOut, response_model_by_alias=True)
def update_item(
    item_id: uuid.UUID, payload: ItemUpdate, user: CurrentUser, db: DbSession
) -> ItemOut:
    item = db.get(Item, item_id)
    if item is None or item.owner_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")

    data = payload.model_dump(exclude_unset=True)
    for field, value in data.items():
        setattr(item, field, value)

    db.commit()
    db.refresh(item)
    return ItemOut.model_validate(item)


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT, response_class=Response)
def delete_item(item_id: uuid.UUID, user: CurrentUser, db: DbSession) -> Response:
    item = db.get(Item, item_id)
    if item is None or item.owner_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    db.delete(item)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
