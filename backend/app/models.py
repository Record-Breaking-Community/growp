"""Model Module"""
from datetime import datetime
from sqlalchemy import (
    Column,
    String,
    Integer,
    Unicode,
    DateTime,
    Boolean,
    ForeignKey,
)
from sqlalchemy.orm import relationship
from db import Base


class User(Base):
    """User Model"""

    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    motto = Column(Unicode(100))  # 座右の銘
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)
    refresh_token = Column(String)
    created_at = Column(DateTime(timezone=True), default=datetime.now, nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        default=datetime.now,
        nullable=False,
    )

    answers = relationship("Answer")


class FormationStage(Base):
    """形成段階 Model"""

    __tablename__ = "formation_stage"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(Unicode(400))  # 説明
    created_at = Column(DateTime(timezone=True), default=datetime.now, nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        default=datetime.now,
        nullable=False,
    )

    answers = relationship("Answer")


class Answer(Base):
    """診断結果 Model"""

    __tablename__ = "answer"

    id = Column(Integer, primary_key=True)
    is_forming = Column(Boolean, nullable=False)
    is_storming = Column(Boolean, nullable=False)
    is_norming = Column(Boolean, nullable=False)
    is_performing = Column(Boolean, nullable=False)
    is_adjourning = Column(Boolean, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.now, nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        default=datetime.now,
        nullable=False,
    )
    user_id = Column(Integer, ForeignKey("user.id"))
    formation_stage_id = Column(Integer, ForeignKey("formation_stage.id"))

    formation_stage = relationship("FormationStage", back_populates="answers")
    user = relationship("User", back_populates="answers")
