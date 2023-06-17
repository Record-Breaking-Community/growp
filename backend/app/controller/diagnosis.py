from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from db import get_db
from helper import diagnosis as diagnosis_helper, registration as registration_helper
from schema import diagnosis as diagnosis_schema

router = APIRouter(prefix="/diagnosis")


@router.get("", response_model=list[diagnosis_schema.ResultResponse])
def index(
    db: AsyncSession = Depends(get_db),
    token: str = Depends(registration_helper.oauth2_scheme),
):
    return diagnosis_helper.get_all_answer(db, token)


@router.post("/submit", response_model=diagnosis_schema.ResultResponse)
def submit(
    body: diagnosis_schema.SubmitRequest,
    db: AsyncSession = Depends(get_db),
    token: str = Depends(registration_helper.oauth2_scheme),
):
    return diagnosis_helper.submit(db, body, token)
