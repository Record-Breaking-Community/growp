import os
from enum import Enum
from datetime import datetime, timedelta
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt, JWTError

import models

pwd_cxt = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY")
ACCESS_TOKEN_LIFETIME = 1
REFRESH_TOKEN_LIFETIME = 4


class TokenEnum(str, Enum):
    """TSの従来のEnum相当"""

    Access = "access_token"
    Refresh = "refresh_token"


class Hash:
    """パスワードのハッシュ化関連"""

    def __init__(self, password: str):
        self.password = password

    @property
    def password(self):
        return self.__password

    @password.setter
    def password(self, password):
        """Validation"""
        pass_len = len(password)  # 文字数制限
        if pass_len < 8 or pass_len > 20:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password must be at least 8 characters, maximum 20 characters.",
            )
        self.__password = password

    def get_password_hash(self):
        """パスワードのハッシュ化"""
        try:
            return pwd_cxt.hash(self.password)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=e.message
            )

    def verify_password(self, hashed_password):
        """パスワードの検証"""
        try:
            return pwd_cxt.verify(self.password, hashed_password)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=e.message
            )


def create_tokens(db: Session, user_id: int):
    """パスワード認証を行い、トークンを生成"""
    # ペイロード作成
    access_payload = {
        "token_type": "access_token",
        "exp": datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_LIFETIME),
        "user_id": user_id,
    }
    refresh_payload = {
        "token_type": "refresh_token",
        "exp": datetime.utcnow() + timedelta(hours=REFRESH_TOKEN_LIFETIME),
        "user_id": user_id,
    }

    try:
        # トークン作成
        access_token = jwt.encode(access_payload, SECRET_KEY, algorithm="HS256")
        refresh_token = jwt.encode(refresh_payload, SECRET_KEY, algorithm="HS256")
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # DBにリフレッシュトークンを保存
    user = db.query(models.User).filter(models.User.id == user_id).first()
    user.refresh_token = refresh_token

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }
