from enum import Enum
from sqlalchemy.orm import Session
from fastapi import Depends

import models
from .user import oauth2_scheme, get_user_from_token
from .auth import TokenEnum
from schema import diagnosis as diagnosis_schema


class StageEnum(str, Enum):
    """TSの従来のEnum相当"""

    Forming = "形成期"
    Storming = "混乱期"
    Norming = "統一期"
    Performing = "機能期"
    Adjourning = "散会期"


def get_all_answer(db: Session, token: str = Depends(oauth2_scheme)):
    """診断結果を全て取得"""
    current_user = get_user_from_token(db, token, TokenEnum.Access)
    all_answer = (
        db.query(
            models.FormationStage.id,
            models.FormationStage.name,
            models.FormationStage.description,
            models.Answer.created_at,
            models.Answer.updated_at,
        )
        .join(models.Answer)
        .filter(models.Answer.user_id == current_user.id)
        .all()
    )

    return all_answer


def submit(
    db: Session,
    request: diagnosis_schema.SubmitRequest,
    token: str = Depends(oauth2_scheme),
) -> diagnosis_schema.ResultResponse:
    """診断"""
    search_name = diagnosis(form=request)
    stage: models.FormationStage = (
        db.query(models.FormationStage)
        .filter(models.FormationStage.name == search_name)
        .first()
    )

    current_user = get_user_from_token(db, token, TokenEnum.Access)

    answer = models.Answer(
        is_forming=request.is_forming,
        is_storming=request.is_storming,
        is_norming=request.is_norming,
        is_performing=request.is_performing,
        is_adjourning=request.is_adjourning,
        formation_stage_id=stage.id,
        user_id=current_user.id,
    )

    response: diagnosis_schema.ResultResponse = {
        "name": stage.name,
        "description": stage.description,
    }

    db.add(answer)
    db.commit()
    db.refresh(answer)

    return response


def diagnosis(form: diagnosis_schema.SubmitRequest):
    """診断の結果を検索する名前を返す"""
    search_name = ""
    if form.is_adjourning:
        search_name = StageEnum.Adjourning
    elif form.is_performing:
        search_name = StageEnum.Performing
    elif form.is_norming:
        search_name = StageEnum.Norming
    elif form.is_forming:
        search_name = StageEnum.Forming
    elif form.is_storming:
        search_name = StageEnum.Storming

    return search_name
