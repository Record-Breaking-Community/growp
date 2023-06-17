from fastapi import HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

import models
from schema import registration as registration_schema
from .auth import Hash, create_tokens, TokenEnum
from .user import get_user_from_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_user(db: Session, email: str) -> models.User:
    """ユーザーの取得"""
    return db.query(models.User).filter(models.User.email == email).first()


def sign_up(db: Session, request: registration_schema.SignUp):
    """新規登録処理"""
    user = get_user(db, request.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists."
        )

    new_user = models.User(
        name=request.name,
        email=request.email,
        password=Hash(request.password).get_password_hash(),
        refresh_token="",
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_tokens(db, new_user.id)

    response: registration_schema.SignUpResponse = {
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email,
        "access_token": token["access_token"],
        "refresh_token": token["refresh_token"],
        "token_type": token["token_type"],
    }

    return response


def sign_in(db: Session, request: registration_schema.SignIn):
    """ログイン処理"""
    user = get_user(db, request.email)

    # userがない場合
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    # passwordの検証
    if Hash(request.password).verify_password(hashed_password=user.password):
        token = create_tokens(db, user.id)
        response: registration_schema.SignInResponse = {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "motto": user.motto,
            "access_token": token["access_token"],
            "refresh_token": token["refresh_token"],
            "token_type": token["token_type"],
        }
        return response
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Password is incorrect",
        )


def logout(db: Session, token: str = Depends(oauth2_scheme)):
    """ログアウト"""
    current_user = get_user_from_token(db, token, TokenEnum.Access)
    if current_user.refresh_token == "":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="You are already logged out."
        )
    current_user.refresh_token = ""

    db.add(current_user)
    db.commit()
    db.refresh(current_user)
