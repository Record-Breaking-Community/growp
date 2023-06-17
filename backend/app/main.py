"""Main Server Module"""
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from db import Base, engine
from controller import user, registration, diagnosis

app = FastAPI()

# CORS設定
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router(Controllerの登録)
app.include_router(user.router)
app.include_router(registration.router)
app.include_router(diagnosis.router)


@app.exception_handler(RequestValidationError)
def handler(exc: RequestValidationError):
    """例外処理を表示"""
    print(exc)
    print(exc.body)
    return JSONResponse(content={}, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)


@app.on_event("startup")
def configure():
    """サーバー起動前に実行"""
    Base.metadata.create_all(engine)  # テーブル作成


@app.get("/hello")
def hello():
    """テスト用"""
    return {"message": "hello world!"}
