"""
Script para actualizar contraseñas de usuarios por defecto
Ejecutar después de la primera inicialización de la base de datos
"""
from core.database import SessionLocal
from core.security import get_password_hash
from models.usuario import Usuario

def update_passwords():
    db = SessionLocal()
    try:
        # Actualizar contraseña del admin
        admin = db.query(Usuario).filter(Usuario.username == 'admin').first()
        if admin:
            admin.hashed_password = get_password_hash('admin123')
            print(f"✓ Contraseña actualizada para usuario: admin")
        else:
            print("✗ Usuario 'admin' no encontrado")
        
        # Actualizar contraseña del operador
        jperez = db.query(Usuario).filter(Usuario.username == 'jperez').first()
        if jperez:
            jperez.hashed_password = get_password_hash('operador123')
            print(f"✓ Contraseña actualizada para usuario: jperez")
        else:
            print("✗ Usuario 'jperez' no encontrado")
        
        db.commit()
        print("\n✓ Todas las contraseñas han sido actualizadas correctamente")
        
    except Exception as e:
        print(f"✗ Error al actualizar contraseñas: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    update_passwords()
