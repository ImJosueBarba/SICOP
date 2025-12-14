-- Agregar columna foto_perfil a la tabla usuarios
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS foto_perfil VARCHAR(500);

-- Comentario explicativo
COMMENT ON COLUMN usuarios.foto_perfil IS 'URL o ruta de la foto de perfil del usuario';
