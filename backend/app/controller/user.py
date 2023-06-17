from fastapi import APIRouter, Depends, Response
from sqlalchemy.ext.asyncio import AsyncSession
import datetime

from db import get_db
from schema import user as user_schema, registration as registration_schema
from helper import user as user_helper, auth as auth_helper

router = APIRouter(prefix="/users")


@router.get("/me", response_model=user_schema.UserResponse)
def read_users_me(
    current_user: user_schema.UserResponse = Depends(user_helper.get_current_user),
):
    """ログイン中のユーザーを取得"""
    return current_user


@router.patch("/update", response_model=user_schema.UpdateUserResponse)
def update_profile(
    body: user_schema.UpdateUserRequest,
    db: AsyncSession = Depends(get_db),
    token=Depends(user_helper.oauth2_scheme),
):
    return user_helper.update_user(db, body, token)


@router.get("/refresh_token")
def refresh_token(
    response: Response,
    current_user: registration_schema.Token = Depends(
        user_helper.get_current_user_with_refresh_token
    ),
    db: AsyncSession = Depends(get_db),
):
    """リフレッシュトークンでトークンを再取得"""
    res = auth_helper.create_tokens(db, current_user["id"])

    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")

    now = datetime.datetime.now()
    access_utc_time = (
        now + datetime.timedelta(hours=auth_helper.ACCESS_TOKEN_LIFETIME)
    ).strftime("%Y-%m-%dT%H:%M:%SZ")
    refresh_utc_time = (
        now + datetime.timedelta(hours=auth_helper.REFRESH_TOKEN_LIFETIME)
    ).strftime("%Y-%m-%dT%H:%M:%SZ")
    response.set_cookie(
        "access_token",
        res["access_token"],
        expires=access_utc_time,
    )
    response.set_cookie(
        "refresh_token",
        res["refresh_token"],
        expires=refresh_utc_time,
    )

    return {"message": "access_token is set."}
