from pydantic import BaseModel, Field, EmailStr


class SignBase(BaseModel):
    """ログイン・サインアップリクエストの素"""

    email: EmailStr = Field(None, example="sample@gmail.com")
    password: str = Field(None, example="sampleTest")


class SignUp(SignBase):
    """サインアップのリクエスト"""

    name: str = Field(None, example="名前")


class SignIn(SignBase):
    """ログインのリクエスト"""

    pass


class Token(BaseModel):
    """Token Type"""

    access_token: str
    refresh_token: str
    token_type: str


class ResponseBase(BaseModel):
    """レスポンスの素"""

    id: int = Field(None, example=1)
    name: str = Field(None, exapmle="sample")
    email: EmailStr = Field(None, example="sample@gmail.com")


class SignUpResponse(ResponseBase):
    """サインアップのレスポンス"""

    pass


class SignInResponse(ResponseBase):
    """ログインのレスポンス"""

    motto: str = Field(None, example="座右の銘")


class LogoutResponse(BaseModel):
    """ログアウトのレスポンス"""

    message: str = Field("logout has completed.")
