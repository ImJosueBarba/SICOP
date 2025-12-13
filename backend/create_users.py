"""
Script para crear usuarios iniciales en la base de datos
"""
import sys
sys.path.append('.')

from core.security import get_password_hash
from database import SessionLocal
from models.usuario import Usuario, UserRole
from datetime import date

def create_initial_users():
    db = SessionLocal()
    try:
        # Verificar si ya existe el admin
        admin_exists = db.query(Usuario).filter(Usuario.username == 'admin').first()
        
        if not admin_exists:
            # Crear usuario administrador
            admin = Usuario(
                nombre='Administrador',
                apellido='Sistema',
                email='admin@esperanza.com',
                username='admin',
                hashed_password=get_password_hash('admin123'),
                rol=UserRole.ADMINISTRADOR,
                activo=True,
                fecha_contratacion=date.today()
            )
            db.add(admin)
            print("✅ Usuario administrador creado")
            print("   Username: admin")
            print("   Password: admin123")
        else:
            print("ℹ️  Usuario administrador ya existe")
        
        # Verificar si ya existe el operador de ejemplo
        operador_exists = db.query(Usuario).filter(Usuario.username == 'jperez').first()
        
        if not operador_exists:
            # Crear usuario operador de ejemplo
            operador = Usuario(
                nombre='Juan',
                apellido='Pérez',
                email='juan.perez@esperanza.com',
                telefono='555-0123',
                username='jperez',
                hashed_password=get_password_hash('operador123'),
                rol=UserRole.OPERADOR,
                activo=True,
                fecha_contratacion=date.today()
            )
            db.add(operador)
            print("✅ Usuario operador creado")
            print("   Username: jperez")
            print("   Password: operador123")
        else:
            print("ℹ️  Usuario operador ya existe")
        
        db.commit()
        print("\n✅ Proceso completado exitosamente")
        
        # Mostrar usuarios creados
        usuarios = db.query(Usuario).all()
        print("\n📋 Usuarios en el sistema:")
        for user in usuarios:
            print(f"   - {user.username} ({user.nombre} {user.apellido}) - Rol: {user.rol.value}")
            
    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("🚀 Creando usuarios iniciales...\n")
    create_initial_users()
