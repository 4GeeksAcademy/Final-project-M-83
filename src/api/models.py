from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Column, Integer, Table, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()
favorite_islanders = Table(
    "favorite_islanders",
    db.Model.metadata,
    Column("user_id", Integer, ForeignKey("user.id"), primary_key=True),
    Column("islander_id", Integer, ForeignKey("islander.id"), primary_key=True)
)

# favorite_bombshells = Table(
#     "favorite_bombshells",
#     db.Model.metadata,
#     Column("user_id", Integer, ForeignKey("user.id"), primary_key = True),
#     Column("bombshell_id", Integer, ForeignKey("bombshell.id"), primary_key = True)
# )


class User(db.Model):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    email = Column(String(70), unique=True, nullable=False)
    username = Column(String(70), unique=True, nullable=False)
    phonenumber = Column(Integer, unique=True, nullable=True)
    profile_image = Column(String(260), nullable=True)
    favorite_islanders = relationship("Islander", secondary=favorite_islanders)
    # favorite_bombshells = relationship("Bombshells", secondary = favorite_bombshells)
    password = Column(String(70), unique=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "phonenumber": self.phonenumber,
            "profile_image": self.profile_image,
            "email": self.email,
            "favorite_islanders": [item.serialize() for item in self.favorite_islanders],
            # "favorite_bombshells": [item.serialize() for item in self.favorite_bombshells]
        }


class Islander (db.Model):
    __tablename__ = "islander"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    age = Column(Integer, nullable=True)
    occupation = Column(String(100), nullable=True)
    hometown = Column(String(100), nullable=True)
    status = Column(String(20), default="active")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "age": self.age,
            "occupation": self.occupation,
            "hometown": self.hometown,
            "status": self.status
        }


class Bombshell (db.Model):
    __tablename__ = "bombshells"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    age = Column(Integer, nullable=False)
    hometown = Column(String(100), nullable=False)
    occupation = Column(String(100), nullable=False)
    status = Column(Boolean, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "age": self.age,
            "hometown": self.hometown,
            "occupation": self.occupation,
            "status": self.status
        }
