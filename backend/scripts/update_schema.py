
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import text
from database import engine

def update_schema():
    with engine.connect() as conn:
        conn.execute(text("COMMIT"))
        
        # Add username column
        try:
            conn.execute(text("ALTER TABLE operadores ADD COLUMN username VARCHAR(50)"))
            conn.execute(text("CREATE UNIQUE INDEX ix_operadores_username ON operadores (username)"))
            print("Added username column")
        except Exception as e:
            print(f"Username column might already exist: {e}")
            
        # Add hashed_password column
        try:
            conn.execute(text("ALTER TABLE operadores ADD COLUMN hashed_password VARCHAR(255)"))
            print("Added hashed_password column")
        except Exception as e:
            print(f"hashed_password column might already exist: {e}")
            
        # Add rol column
        try:
            # Create enum type if not exists (Postgres specific)
            try:
                conn.execute(text("CREATE TYPE userrole AS ENUM ('ADMIN', 'VISUALIZADOR', 'OPERADOR')"))
            except Exception:
                pass
            conn.execute(text("ALTER TABLE operadores ADD COLUMN rol userrole DEFAULT 'OPERADOR'"))
            print("Added rol column")
        except Exception as e:
            print(f"rol column might already exist: {e}")
            
        conn.commit()

if __name__ == "__main__":
    update_schema()
