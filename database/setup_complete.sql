-- ==================================================================
-- SETUP COMPLETO DE BASE DE DATOS - PLANTA LA ESPERANZA
-- ==================================================================
-- Este script incluye toda la configuración necesaria:
-- 1. Migración de operadores a usuarios
-- 2. Creación de usuarios por defecto (admin y operador)
-- 3. Optimización con índices
-- 4. Constraint de administrador único
--
-- IMPORTANTE: Las contraseñas se actualizarán automáticamente por Python
-- Los hashes aquí son temporales y serán reemplazados
-- ==================================================================

BEGIN;

-- ==================================================================
-- PARTE 1: MIGRACIÓN DE OPERADORES A USUARIOS
-- ==================================================================

-- 1. Renombrar la tabla
ALTER TABLE operadores RENAME TO usuarios;

-- 2. Actualizar el enum de roles
ALTER TABLE usuarios ALTER COLUMN rol DROP DEFAULT;
ALTER TABLE usuarios ALTER COLUMN rol TYPE VARCHAR(20);

-- Eliminar el tipo enum antiguo y crear el nuevo
DROP TYPE IF EXISTS userole CASCADE;
CREATE TYPE userole AS ENUM ('ADMINISTRADOR', 'OPERADOR');

-- Aplicar el nuevo tipo
ALTER TABLE usuarios ALTER COLUMN rol TYPE userole USING rol::text::userole;
ALTER TABLE usuarios ALTER COLUMN rol SET DEFAULT 'OPERADOR'::userole;
ALTER TABLE usuarios ALTER COLUMN rol SET NOT NULL;

-- 3. Actualizar las columnas de referencia en otras tablas

-- Control de Operación
ALTER TABLE control_operacion 
    DROP CONSTRAINT IF EXISTS control_operacion_operador_id_fkey;

ALTER TABLE control_operacion 
    RENAME COLUMN operador_id TO usuario_id;

ALTER TABLE control_operacion 
    ADD CONSTRAINT control_operacion_usuario_id_fkey 
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id);

-- Producción de Filtros
ALTER TABLE produccion_filtros 
    DROP CONSTRAINT IF EXISTS produccion_filtros_operador_id_fkey;

ALTER TABLE produccion_filtros 
    RENAME COLUMN operador_id TO usuario_id;

ALTER TABLE produccion_filtros 
    ADD CONSTRAINT produccion_filtros_usuario_id_fkey 
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id);

-- Control Consumo Diario
ALTER TABLE control_consumo_diario_quimicos 
    DROP CONSTRAINT IF EXISTS control_consumo_diario_quimicos_operador_id_fkey;

ALTER TABLE control_consumo_diario_quimicos 
    RENAME COLUMN operador_id TO usuario_id;

ALTER TABLE control_consumo_diario_quimicos 
    ADD CONSTRAINT control_consumo_diario_quimicos_usuario_id_fkey 
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id);

-- Control Cloro Libre
ALTER TABLE control_cloro_libre 
    DROP CONSTRAINT IF EXISTS control_cloro_libre_operador_id_fkey;

ALTER TABLE control_cloro_libre 
    RENAME COLUMN operador_id TO usuario_id;

ALTER TABLE control_cloro_libre 
    ADD CONSTRAINT control_cloro_libre_usuario_id_fkey 
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id);

-- Monitoreo Fisicoquímico
ALTER TABLE monitoreo_fisicoquimico 
    DROP CONSTRAINT IF EXISTS monitoreo_fisicoquimico_operador_id_fkey;

ALTER TABLE monitoreo_fisicoquimico 
    RENAME COLUMN operador_id TO usuario_id;

ALTER TABLE monitoreo_fisicoquimico 
    ADD CONSTRAINT monitoreo_fisicoquimico_usuario_id_fkey 
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id);

-- Consumo Químicos Mensual
ALTER TABLE consumo_quimicos_mensual 
    DROP CONSTRAINT IF EXISTS consumo_quimicos_mensual_operador_id_fkey;

ALTER TABLE consumo_quimicos_mensual 
    RENAME COLUMN operador_id TO usuario_id;

ALTER TABLE consumo_quimicos_mensual 
    ADD CONSTRAINT consumo_quimicos_mensual_usuario_id_fkey 
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id);

-- 4. Agregar columna foto_perfil
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS foto_perfil VARCHAR(500);
COMMENT ON COLUMN usuarios.foto_perfil IS 'URL o ruta de la foto de perfil del usuario';

-- 5. Actualizar los roles existentes (si hay datos)
UPDATE usuarios SET rol = 'ADMINISTRADOR'::userole WHERE rol::text = 'ADMIN';
UPDATE usuarios SET rol = 'OPERADOR'::userole WHERE rol::text IN ('OPERADOR', 'VISUALIZADOR');

-- ==================================================================
-- PARTE 2: OPTIMIZACIÓN CON ÍNDICES
-- ==================================================================

-- Índices en tabla usuarios
CREATE INDEX IF NOT EXISTS idx_usuarios_username ON usuarios(username);
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_activo ON usuarios(activo);
CREATE INDEX IF NOT EXISTS idx_usuarios_login ON usuarios(username, activo);

-- Índices en tablas de registros
CREATE INDEX IF NOT EXISTS idx_control_operacion_usuario_id ON control_operacion(usuario_id);
CREATE INDEX IF NOT EXISTS idx_produccion_filtros_usuario_id ON produccion_filtros(usuario_id);
CREATE INDEX IF NOT EXISTS idx_control_consumo_usuario_id ON control_consumo_diario_quimicos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_control_cloro_usuario_id ON control_cloro_libre(usuario_id);
CREATE INDEX IF NOT EXISTS idx_monitoreo_fisicoquimico_usuario_id ON monitoreo_fisicoquimico(usuario_id);
CREATE INDEX IF NOT EXISTS idx_consumo_mensual_usuario_id ON consumo_quimicos_mensual(usuario_id);

-- Analizar tabla para optimizar consultas
ANALYZE usuarios;

-- ==================================================================
-- PARTE 3: CONSTRAINT DE ADMINISTRADOR ÚNICO
-- ==================================================================

-- Eliminar constraint anterior si existe
ALTER TABLE usuarios DROP CONSTRAINT IF EXISTS single_admin_constraint;
DROP INDEX IF EXISTS idx_single_admin;

-- Crear índice único parcial para asegurar solo un administrador
CREATE UNIQUE INDEX idx_single_admin 
ON usuarios (rol) 
WHERE rol = 'ADMINISTRADOR';

-- ==================================================================
-- PARTE 4: USUARIOS POR DEFECTO
-- ==================================================================

-- Crear usuario administrador
-- Usuario: admin
-- Contraseña: admin123 (será actualizada por Python)
INSERT INTO usuarios (
    nombre, 
    apellido, 
    email, 
    telefono, 
    activo, 
    username, 
    hashed_password, 
    rol, 
    fecha_contratacion,
    created_at,
    updated_at
) VALUES (
    'Administrador',
    'Sistema',
    'admin@esperanza.com',
    NULL,
    TRUE,
    'admin',
    'temp_hash_admin', -- Será actualizado por Python
    'ADMINISTRADOR',
    CURRENT_DATE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT (username) DO UPDATE SET
    nombre = EXCLUDED.nombre,
    apellido = EXCLUDED.apellido,
    email = EXCLUDED.email,
    activo = EXCLUDED.activo,
    rol = EXCLUDED.rol,
    updated_at = CURRENT_TIMESTAMP;

-- Crear usuario operador de ejemplo
-- Usuario: jperez
-- Contraseña: operador123 (será actualizada por Python)
INSERT INTO usuarios (
    nombre, 
    apellido, 
    email, 
    telefono, 
    activo, 
    username, 
    hashed_password, 
    rol, 
    fecha_contratacion,
    created_at,
    updated_at
) VALUES (
    'Juan',
    'Pérez',
    'juan.perez@esperanza.com',
    '555-0123',
    TRUE,
    'jperez',
    'temp_hash_operador', -- Será actualizado por Python
    'OPERADOR',
    CURRENT_DATE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT (username) DO UPDATE SET
    nombre = EXCLUDED.nombre,
    apellido = EXCLUDED.apellido,
    email = EXCLUDED.email,
    telefono = EXCLUDED.telefono,
    activo = EXCLUDED.activo,
    rol = EXCLUDED.rol,
    updated_at = CURRENT_TIMESTAMP;

-- ==================================================================
-- PARTE 5: COMENTARIOS Y DOCUMENTACIÓN
-- ==================================================================

COMMENT ON TABLE usuarios IS 'Tabla de usuarios del sistema con roles de Administrador y Operador';
COMMENT ON COLUMN usuarios.rol IS 'Rol del usuario: ADMINISTRADOR o OPERADOR';
COMMENT ON COLUMN usuarios.username IS 'Nombre de usuario único para iniciar sesión';
COMMENT ON COLUMN usuarios.hashed_password IS 'Contraseña hasheada del usuario';
COMMENT ON INDEX idx_single_admin IS 'Asegura que solo puede existir un usuario con rol ADMINISTRADOR';

COMMIT;

-- ==================================================================
-- VERIFICACIÓN FINAL
-- ==================================================================

SELECT 'Setup completado exitosamente' AS resultado;

SELECT 
    username, 
    nombre, 
    apellido, 
    rol, 
    activo,
    email
FROM usuarios 
ORDER BY rol DESC, username;

-- ==================================================================
-- PARTE 4: TABLA DE AUDITORÍA/LOGS
-- ==================================================================

-- Crear tabla de logs para auditoría
CREATE TABLE IF NOT EXISTS logs_auditoria (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    usuario_nombre VARCHAR(200),  -- Guardamos nombre por si se elimina el usuario
    accion VARCHAR(50) NOT NULL,  -- LOGIN, LOGOUT, CREATE, UPDATE, DELETE, etc.
    entidad VARCHAR(100),          -- usuarios, control_operacion, produccion_filtros, etc.
    entidad_id INTEGER,            -- ID del registro afectado
    detalles TEXT,                 -- JSON con detalles adicionales
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_logs_usuario_id (usuario_id),
    INDEX idx_logs_accion (accion),
    INDEX idx_logs_created_at (created_at),
    INDEX idx_logs_entidad (entidad)
);

-- Comentario de la tabla
COMMENT ON TABLE logs_auditoria IS 'Registro de auditoría de todas las acciones del sistema';

-- ==================================================================
-- PARTE 5: TABLA DE ROLES Y MIGRACIÓN
-- ==================================================================

-- Crear tabla de roles
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    nivel_jerarquia INTEGER NOT NULL,
    categoria VARCHAR(20) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comentarios de la tabla
COMMENT ON TABLE roles IS 'Catálogo de roles del sistema con jerarquía y categorías';
COMMENT ON COLUMN roles.codigo IS 'Código único del rol para uso en código';
COMMENT ON COLUMN roles.nombre IS 'Nombre descriptivo del rol';
COMMENT ON COLUMN roles.nivel_jerarquia IS 'Nivel jerárquico: 1=más alto, 4=más bajo';
COMMENT ON COLUMN roles.categoria IS 'Categoría del rol: ADMINISTRADOR, JEFATURA, SUPERVISOR, OPERADOR';

-- Insertar roles con jerarquía correcta
INSERT INTO roles (codigo, nombre, nivel_jerarquia, categoria, descripcion) VALUES
('COORD_GENERAL', 'Coordinación General', 1, 'ADMINISTRADOR', 'Administrador principal del sistema'),
('JEF_OPERACION', 'Jefatura de Operación, Producción y Mantenimiento', 2, 'JEFATURA', 'Responsable de operaciones de la planta'),
('GEST_AMBIENTAL', 'Gestión Ambiental y Calidad', 3, 'SUPERVISOR', 'Supervisor de gestión ambiental y control de calidad'),
('ASIST_TECNICO', 'Asistente Técnico', 3, 'SUPERVISOR', 'Asistente técnico de operaciones'),
('SUPERVISOR_TEC', 'Supervisor Técnico', 3, 'SUPERVISOR', 'Supervisor técnico de campo'),
('OP_CAPTACION', 'Operador de Captación', 4, 'OPERADOR', 'Operador en área de captación'),
('OP_PLANTA', 'Operador de Planta', 4, 'OPERADOR', 'Operador en planta de tratamiento'),
('OP_VERGEL', 'Operador de Vergel', 4, 'OPERADOR', 'Operador en área de Vergel')
ON CONFLICT (codigo) DO NOTHING;

-- Crear índices para roles
CREATE INDEX IF NOT EXISTS idx_roles_categoria ON roles(categoria);
CREATE INDEX IF NOT EXISTS idx_roles_activo ON roles(activo);
CREATE INDEX IF NOT EXISTS idx_roles_nivel ON roles(nivel_jerarquia);

-- Migrar usuarios existentes a la nueva estructura
-- Paso 1: Agregar columna temporal para guardar el rol antiguo
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS rol_antiguo VARCHAR(20);
UPDATE usuarios SET rol_antiguo = rol::text WHERE rol_antiguo IS NULL;

-- Paso 2: Agregar nueva columna rol_id
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS rol_id INTEGER REFERENCES roles(id);

-- Paso 3: Mapear roles antiguos a nuevos
UPDATE usuarios SET rol_id = (SELECT id FROM roles WHERE codigo = 'COORD_GENERAL') 
WHERE rol::text = 'ADMINISTRADOR' AND rol_id IS NULL;

UPDATE usuarios SET rol_id = (SELECT id FROM roles WHERE codigo = 'OP_PLANTA') 
WHERE rol::text = 'OPERADOR' AND rol_id IS NULL;

-- Paso 4: Hacer rol_id NOT NULL después de migrar datos
ALTER TABLE usuarios ALTER COLUMN rol_id SET NOT NULL;

-- Paso 5: Eliminar la restricción de administrador único del enum
DROP INDEX IF EXISTS idx_single_admin;

-- Paso 6: Eliminar columna rol antigua (comentar si quieres mantenerla temporalmente)
-- ALTER TABLE usuarios DROP COLUMN IF EXISTS rol;
-- DROP TYPE IF EXISTS userole;

-- Paso 7: Crear índice en la nueva relación
CREATE INDEX IF NOT EXISTS idx_usuarios_rol_id ON usuarios(rol_id);

-- Analizar tabla para optimizar consultas
ANALYZE usuarios;
ANALYZE roles;

-- ==================================================================
-- IMPORTANTE: EJECUTAR DESPUÉS DE ESTE SCRIPT
-- ==================================================================
-- Usar Python para actualizar los hashes de contraseñas:
-- 
-- cd backend
-- python -c "from core.database import SessionLocal; from core.security import get_password_hash; from models.usuario import Usuario; db = SessionLocal(); admin = db.query(Usuario).filter(Usuario.username == 'admin').first(); admin.hashed_password = get_password_hash('admin123'); db.commit(); jperez = db.query(Usuario).filter(Usuario.username == 'jperez').first(); jperez.hashed_password = get_password_hash('operador123'); db.commit(); print('Contraseñas actualizadas'); db.close()"
--
-- Credenciales finales:
-- admin / admin123
-- jperez / operador123
-- ==================================================================
