-- Crear usuario administrador por defecto
-- Usuario: admin
-- Contraseña: admin123 (cambiar en producción)

-- Hash de la contraseña 'admin123' usando bcrypt
-- Puedes generarlo con: python -c "from passlib.context import CryptContext; print(CryptContext(schemes=['bcrypt']).hash('admin123'))"

INSERT INTO usuarios (
    nombre, 
    apellido, 
    email, 
    telefono, 
    activo, 
    username, 
    hashed_password, 
    rol, 
    fecha_contratacion
) VALUES (
    'Administrador',
    'Sistema',
    'admin@esperanza.com',
    NULL,
    TRUE,
    'admin',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYfQwRw1234', -- admin123
    'ADMINISTRADOR',
    CURRENT_DATE
)
ON CONFLICT (username) DO NOTHING;

-- Crear un usuario operador de ejemplo
INSERT INTO usuarios (
    nombre, 
    apellido, 
    email, 
    telefono, 
    activo, 
    username, 
    hashed_password, 
    rol, 
    fecha_contratacion
) VALUES (
    'Juan',
    'Pérez',
    'juan.perez@esperanza.com',
    '555-0123',
    TRUE,
    'jperez',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYfQwRw1234', -- admin123
    'OPERADOR',
    CURRENT_DATE
)
ON CONFLICT (username) DO NOTHING;

SELECT 'Usuarios de ejemplo creados' AS resultado;
SELECT username, nombre, apellido, rol, activo FROM usuarios;
