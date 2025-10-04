from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Column, Integer, Table, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()
# favorite_islanders = Table (
#     "favorite_islanders",
#     db.Model.metadata,
#     Column ("user_id", Integer, ForeignKey("user.id"), primary_key = True),
#     Column ("islander_id", Integer, ForeignKey("islander.id"), primary_key = True)
# )

# favorite_bombshells = Table(
#     "favorite_bombshells",
#     db.Model.metadata,
#     Column("user_id", Integer, ForeignKey("user.id"), primary_key = True),
#     Column("bombshell_id", Integer, ForeignKey("bombshell.id"), primary_key = True)
# )



class User(db.Model):
    id = Column(Integer, primary_key = True) 
    email = Column(String(70), unique = True, nullable = False)
    username = Column(String(70), unique = True, nullable = False)
    phonenumber = Column(Integer, unique = True, nullable = True)
    profile_image = Column(String(260), nullable = True)
    password = Column(String(70), unique = False, nullable = False)
    # favorite_islanders = relationship("Islanders", secondary = favorite_islanders)
    # favorite_bombshells = relationship("Bombshells", secondary = favorite_bombshells)


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "phonenumber": self.phonenumber,
            "profile_image": self.profile_image
            # "favorite_islanders": [item.serialize() for item in self.favorite_islanders],
            # "favorite_bombshells": [item.serialize() for item in self.favorite_bombshells]
            # do not serialize the password, its a security breach
        }