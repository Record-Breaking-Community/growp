"""DB Module"""
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

# postgresql://{user}:{password}@{host}:{port}/{database}
engine = create_engine(
    "postgresql://postgres:postgres@postgres:5432/postgres_db", echo=True
)

Base = declarative_base()

SessionLocal = sessionmaker(bind=engine)


def get_db():
    """DBをDIで取得するために用いる"""
    db_session = SessionLocal()
    try:
        yield db_session
    finally:
        db_session.close()


def update(self: Session, data: object):
    """DBの値/オブジェクトを更新"""
    data.updated_at = datetime.now()
    self.add(data)
    self.commit()
    self.refresh(data)


# インスタンスメソッドを追加
Session.update = update
