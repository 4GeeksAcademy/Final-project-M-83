from flask_sqlalchemy import AQLAlchemy
from sqlalchemy import String, Boolean, Column, Integer, Table, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship


db = SQLAlchemy()



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
            "occupation" : self.occupation,
            "hometown": self.hometown,
            "status": self.status
        }







