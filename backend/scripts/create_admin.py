
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from database import SessionLocal
from models.operador import Operador, UserRole
from core.security import get_password_hash

def create_admin():
    db = SessionLocal()
    try:
        username = "admin"
        email = "admin@sicop.com"
        password = "admin"
        
        existing = db.query(Operador).filter(Operador.username == username).first()
        if existing:
            print(f"User {username} already exists")
            return
            
        admin_user = Operador(
            nombre="Administrador",
            apellido="Sistema",
            email=email,
            username=username,
            hashed_password=get_password_hash(password),
            rol=UserRole.ADMIN,
            activo=True
        )
        
        db.add(admin_user)
        db.commit()
        print(f"Created admin user: {username} / {password}")
        
    except Exception as e:
        print(f"Error creating admin: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()
