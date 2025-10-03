from flask_sqlalchemy import AQLAlchemy
from sqlalchemy import String, Boolean, Column, Integer, Table, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship


db = SQLAlchemy()

# favorite_islanders = table(
#     "favorite_islanders",
#     db.Model.metadata,
#     Column ("user_id", Integer, ForeignKey("user.id"), primary_key = True),
#     Column ("islander_id", Integer, ForeignKey("islander.id"), primary_key = True)
# )


class Islander (db.Model):
    __tablename__ = "islander"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    age = Column(Integer, nullable=True)
    bio = Column(String(500), nullable=True)
    profile_picture = Column(String(255), nullable=True)
    occupation = Column(String(100), nullable=True)
    hometown = Column(String(100), nullable=True)
    status = Column(String(20), default="active")  
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "age": self.age,
            "bio": self.bio,
            "profile_picture": self.profile_picture,
            "occupation" : self.occupation,
            "hometown": self.hometown,
            "status": self.status
        }







