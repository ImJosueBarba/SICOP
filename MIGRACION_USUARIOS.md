# MIGRACIÓN: Sistema de Usuarios con Roles

## ✅ Cambios Realizados

### 1. Base de Datos
- ✅ Tabla `operadores` renombrada a `usuarios`
- ✅ Enum `UserRole` actualizado con roles: `ADMINISTRADOR` y `OPERADOR`
- ✅ Todas las columnas `operador_id` renombradas a `usuario_id` en:
  - control_operacion
  - produccion_filtros
  - control_consumo_diario_quimicos
  - control_cloro_libre
  - monitoreo_fisicoquimico
  - consumo_quimicos_mensual
- ✅ Foreign keys actualizadas
- ✅ Índices creados para mejor performance

### 2. Backend - Modelos
- ✅ `models/operador.py` → `models/usuario.py`
- ✅ Clase `Operador` → `Usuario`
- ✅ Roles actualizados: `ADMINISTRADOR` y `OPERADOR`
- ✅ Propiedades agregadas: `es_administrador`, `es_operador`
- ✅ Todas las relaciones actualizadas en los modelos

### 3. Backend - Schemas
- ✅ `schemas/operador.py` → `schemas/usuario.py`
- ✅ Todos los schemas renombrados:
  - `OperadorBase` → `UsuarioBase`
  - `OperadorCreate` → `UsuarioCreate`
  - `OperadorUpdate` → `UsuarioUpdate`
  - `OperadorResponse` → `UsuarioResponse`
  - `OperadorList` → `UsuarioList`
- ✅ Campo `rol` agregado a `UsuarioUpdate`
- ✅ Campos adicionales en `UsuarioResponse`: `es_administrador`, `es_operador`
- ✅ Campo `username` agregado a `UsuarioList`

### 4. Backend - Routers
- ✅ `routers/operadores.py` → `routers/usuarios.py`
- ✅ Endpoint `/api/operadores` → `/api/usuarios`
- ✅ Sistema de permisos implementado:
  - Administradores pueden gestionar todos los usuarios
  - Operadores solo pueden ver/editar su propio perfil
- ✅ CRUD completo para administradores:
  - GET `/api/usuarios` - Listar usuarios (con filtros)
  - GET `/api/usuarios/{id}` - Ver usuario
  - POST `/api/usuarios` - Crear usuario (solo admin)
  - PUT `/api/usuarios/{id}` - Actualizar usuario
  - DELETE `/api/usuarios/{id}` - Desactivar usuario (solo admin)
  - POST `/api/usuarios/{id}/activar` - Reactivar usuario (solo admin)

### 5. Backend - Autenticación
- ✅ `dependencies.py` actualizado para usar `Usuario`
- ✅ `routers/auth.py` actualizado para usar `Usuario`
- ✅ Sistema de roles integrado en la autenticación

### 6. Datos Iniciales
- ✅ Script `create_users.py` creado
- ✅ Usuarios de prueba creados:
  ```
  Username: admin
  Password: admin123
  Rol: ADMINISTRADOR
  
  Username: jperez
  Password: operador123
  Rol: OPERADOR
  ```

## 📋 Endpoints Actualizados

### Gestión de Usuarios (requiere autenticación)

#### `GET /api/usuarios`
**Descripción**: Obtener lista de usuarios
**Permisos**:
- Administradores: Pueden ver todos los usuarios
- Operadores: Solo pueden ver su propio perfil

**Query Params**:
- `skip` (int): Paginación
- `limit` (int): Límite de resultados
- `activo` (bool): Filtrar por estado activo
- `rol` (UserRole): Filtrar por rol

#### `GET /api/usuarios/{usuario_id}`
**Descripción**: Obtener un usuario específico
**Permisos**:
- Administradores: Pueden ver cualquier usuario
- Operadores: Solo pueden ver su propio perfil

#### `POST /api/usuarios`
**Descripción**: Crear un nuevo usuario
**Permisos**: Solo administradores
**Body**:
```json
{
  "nombre": "string",
  "apellido": "string",
  "email": "email@example.com",
  "telefono": "string",
  "username": "string",
  "password": "string",
  "rol": "ADMINISTRADOR" | "OPERADOR",
  "activo": true,
  "fecha_contratacion": "2025-12-12"
}
```

#### `PUT /api/usuarios/{usuario_id}`
**Descripción**: Actualizar un usuario
**Permisos**:
- Administradores: Pueden actualizar cualquier usuario
- Operadores: Solo pueden actualizar su propio perfil (campos limitados)

**Campos restringidos para operadores**:
- `rol`
- `activo`

#### `DELETE /api/usuarios/{usuario_id}`
**Descripción**: Desactivar un usuario
**Permisos**: Solo administradores
**Nota**: No elimina físicamente, solo desactiva el usuario

#### `POST /api/usuarios/{usuario_id}/activar`
**Descripción**: Reactivar un usuario desactivado
**Permisos**: Solo administradores

## 🔐 Sistema de Permisos

### Roles

#### ADMINISTRADOR
- ✅ Crear, ver, editar y eliminar usuarios
- ✅ Cambiar roles de usuarios
- ✅ Activar/desactivar usuarios
- ✅ Acceso completo a todas las matrices de control
- ✅ Gestión de químicos, filtros y otros maestros

#### OPERADOR
- ✅ Ver su propio perfil
- ✅ Editar su perfil (campos limitados)
- ✅ Registrar datos en las matrices de control
- ❌ No puede gestionar otros usuarios
- ❌ No puede cambiar su propio rol

## 📝 Notas Importantes

1. **Contraseñas**: Todas las contraseñas se almacenan hasheadas con bcrypt
2. **Rol por defecto**: Al crear un usuario sin especificar rol, se asigna `OPERADOR`
3. **Eliminación suave**: Los usuarios no se eliminan físicamente, solo se desactivan
4. **Validaciones**:
   - Username único
   - Email único (opcional)
   - Password mínimo 6 caracteres
   - Username mínimo 3 caracteres

## 🚀 Cómo Usar

### Login como Administrador
```bash
curl -X POST "http://localhost:8000/api/auth/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=admin123"
```

### Crear Nuevo Usuario (como admin)
```bash
curl -X POST "http://localhost:8000/api/usuarios" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María",
    "apellido": "García",
    "email": "maria@esperanza.com",
    "username": "mgarcia",
    "password": "password123",
    "rol": "OPERADOR",
    "activo": true
  }'
```

### Listar Usuarios
```bash
curl -X GET "http://localhost:8000/api/usuarios" \
  -H "Authorization: Bearer {token}"
```

## ✨ Próximos Pasos Recomendados

1. **Frontend**: Actualizar el servicio de operadores a usuarios
2. **Interfaz de Admin**: Crear componente para gestión de usuarios
3. **Seguridad**: Cambiar contraseñas por defecto en producción
4. **Validaciones**: Agregar políticas de contraseñas más estrictas
5. **Auditoría**: Implementar logs de acciones de usuarios

## 🔧 Solución de Problemas

### Error de enum en PostgreSQL
Si hay problemas con el enum, ejecutar:
```sql
ALTER TABLE usuarios ALTER COLUMN rol TYPE VARCHAR(20);
DROP TYPE IF EXISTS userole CASCADE;
CREATE TYPE userole AS ENUM ('ADMINISTRADOR', 'OPERADOR');
ALTER TABLE usuarios ALTER COLUMN rol TYPE userole USING rol::text::userole;
```

### Recrear usuarios de prueba
```bash
cd backend
python create_users.py
```
