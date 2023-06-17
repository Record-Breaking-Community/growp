from pydantic import BaseModel, Field
from datetime import datetime


class SubmitRequest(BaseModel):
    """診断結果のリクエスト"""

    is_forming: bool = Field(None, example=True)
    is_storming: bool = Field(None, example=True)
    is_norming: bool = Field(None, example=False)
    is_performing: bool = Field(None, example=False)
    is_adjourning: bool = Field(None, example=False)


class ResultBase(BaseModel):
    """診断結果の素"""

    name: str = Field(None, example="形成期")
    description: str = Field(
        None,
        example="形成期は、チームが立ち上がったばかりのタイミングで、所属しているメンバーのコミュニケーションやチームとしての目標を探っている時期です。",
    )


class ResultResponse(ResultBase):
    """診断結果のレスポンス"""

    id: int = Field(None, example=1)
    created_at: datetime = Field(None, example="2023-06-15T01:33:00.518648+00:00")
    updated_at: datetime = Field(None, example="2023-06-15T02:33:00.518648+00:00")
