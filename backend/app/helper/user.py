from fastapi import HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession
from jose import jwt, JWTError

from db import get_db
import models
from schema import user as user_schema
from .auth import SECRET_KEY, TokenEnum, Hash

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_user_from_token(db: Session, token: str, token_type: str):
    """DBのUserを返す"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except JWTError:
        raise credentials_exception

    # トークンタイプが一致することを確認
    if payload["token_type"] != token_type:
        raise credentials_exception

    # DBからユーザーを取得
    user: models.User = (
        db.query(models.User).filter(models.User.id == payload["user_id"]).first()
    )

    return user


def get_current_user_from_token(db: Session, token: str, token_type: str):
    """tokenからユーザーを取得"""
    # トークンをデコードしてペイロードを取得。有効期限と署名は自動で検証される。
    user = get_user_from_token(db, token, token_type)

    # リフレッシュトークンの場合、受け取ったものとDBに保存されているものが一致するか確認
    if token_type == TokenEnum.Refresh and user.refresh_token != token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    response: user_schema.UserResponse = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "motto": user.motto,
    }

    return response


def get_current_user(
    token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)
):
    """アクセストークンからログイン中のユーザーを取得"""
    return get_current_user_from_token(db, token, TokenEnum.Access)


def get_current_user_with_refresh_token(
    token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)
):
    """リフレッシュトークンからログイン中のユーザーを取得"""
    return get_current_user_from_token(db, token, TokenEnum.Refresh)


def update_user(
    db: Session,
    body: user_schema.UpdateUserRequest,
    token: str = Depends(oauth2_scheme),
):
    """ユーザー情報の更新"""
    user = get_user_from_token(db, token, TokenEnum.Access)

    user.name = body.name
    user.motto = body.motto
    user.email = body.email
    if body.new_password:
        if Hash(body.password).verify_password():
            user.password = body.new_password
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Password"
            )

    response: user_schema.UpdateUserResponse = {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "motto": user.motto,
    }

    # 追加したインスタンスメソッドで更新/db.py
    db.update(user)

    return response
