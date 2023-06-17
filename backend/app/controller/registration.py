import datetime
from fastapi import APIRouter, Depends, Response
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from db import get_db
from schema import registration as registration_schema
from helper import registration as registration_helper
from helper import auth as auth_helper

router = APIRouter()


@router.post("/sign_up", response_model=registration_schema.SignUpResponse)
def sign_up(
    body: registration_schema.SignUp,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    res = registration_helper.sign_up(db, body)
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
    return res


@router.post("/sign_in", response_model=registration_schema.SignInResponse)
def sign_in(
    body: registration_schema.SignIn,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    res = registration_helper.sign_in(db, body)
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
    return res


# TODO: Cookie消えない事件
@router.delete("/logout", response_model=registration_schema.LogoutResponse)
def logout(
    db: AsyncSession = Depends(get_db),
    token: str = Depends(registration_helper.oauth2_scheme),
):
    registration_helper.logout(db, token)
    # cookieの削除
    response = JSONResponse({"message": "logout has completed."})
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return response
