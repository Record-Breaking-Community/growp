from pydantic import BaseModel, Field, EmailStr


class UserBaseModel(BaseModel):
    """Userレスポンスの素"""

    id: int = Field(None, example="1")
    name: str = Field(None, exapmle="sample")
    email: EmailStr = Field(None, example="sample@gmail.com")
    motto: str = Field(None, example="座右の銘")


class UserResponse(UserBaseModel):
    """Userのレスポンス"""

    pass


class UpdateUserRequest(UserBaseModel):
    """ユーザー更新のリクエスト"""

    password: str = Field(None, example="sample")
    new_password: str or None = Field(None, example="new_sample")


class UpdateUserResponse(UserBaseModel):
    """ユーザー更新のレスポンス"""

    pass
