-- ==================================================================
-- MIGRACIÓN: CAMBIO DE TABLA OPERADORES A USUARIOS
-- ==================================================================

-- 1. Renombrar la tabla
ALTER TABLE operadores RENAME TO usuarios;

-- 2. Actualizar el enum de roles (eliminar el antiguo y crear uno nuevo)
-- Primero, necesitamos eliminar la restricción del enum existente
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

-- 4. Actualizar los roles existentes (si hay datos)
-- Convertir roles antiguos a los nuevos
UPDATE usuarios SET rol = 'ADMINISTRADOR'::userole WHERE rol = 'ADMIN'::userole;
UPDATE usuarios SET rol = 'OPERADOR'::userole WHERE rol = 'OPERADOR'::userole OR rol = 'VISUALIZADOR'::userole;

-- 5. Crear índice en usuario_id para mejor performance
CREATE INDEX IF NOT EXISTS idx_control_operacion_usuario_id ON control_operacion(usuario_id);
CREATE INDEX IF NOT EXISTS idx_produccion_filtros_usuario_id ON produccion_filtros(usuario_id);
CREATE INDEX IF NOT EXISTS idx_control_consumo_usuario_id ON control_consumo_diario_quimicos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_control_cloro_usuario_id ON control_cloro_libre(usuario_id);
CREATE INDEX IF NOT EXISTS idx_consumo_mensual_usuario_id ON consumo_quimicos_mensual(usuario_id);

-- 6. Comentarios para la tabla y columnas
COMMENT ON TABLE usuarios IS 'Tabla de usuarios del sistema con roles de Administrador y Operador';
COMMENT ON COLUMN usuarios.rol IS 'Rol del usuario: ADMINISTRADOR o OPERADOR';
COMMENT ON COLUMN usuarios.username IS 'Nombre de usuario único para iniciar sesión';
COMMENT ON COLUMN usuarios.hashed_password IS 'Contraseña hasheada del usuario';

-- Script completado
SELECT 'Migración completada exitosamente' AS resultado;
