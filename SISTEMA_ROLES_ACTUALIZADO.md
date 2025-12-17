# Sistema de Roles Actualizado

## Resumen de Cambios

El sistema ha sido actualizado para soportar un sistema de roles jerárquico y flexible, reemplazando el simple enum ADMINISTRADOR/OPERADOR con una tabla de roles que soporta 8 roles organizados en 4 niveles jerárquicos.

## Estructura de Roles

### Nivel 1 - Administración Superior
- **Coordinación General** (COORD_GENERAL)

### Nivel 2 - Jefaturas
- **Jefatura de Operación** (JEF_OPERACION)

### Nivel 3 - Supervisión
- **Supervisor de Medio Ambiente** (SUP_MEDIOAMBIENTE)
- **Asistente Técnico** (SUP_ASISTEC)
- **Supervisor Técnico** (SUP_TECNICO)

### Nivel 4 - Operación
- **Operador de Planta** (OP_PLANTA)
- **Operador de Gestión Ambiental** (OP_GESTAMBIENTAL)
- **Operador de Distribución** (OP_DISTRIBUCION)

## Archivos Modificados en Backend

### 1. Modelos (models/)

#### `models/rol.py` (NUEVO)
- Modelo SQLAlchemy para la tabla `roles`
- Campos: id, codigo, nombre, descripcion, nivel_jerarquia, categoria, activo, created_at

#### `models/usuario.py` (ACTUALIZADO)
- Agregado `rol_id` como FK a tabla `roles`
- Agregado `rol_obj` como relationship para cargar datos del rol
- Renombrado `rol` → `rol_legacy` (mantener compatibilidad temporal)
- Agregado `rol_antiguo` para respaldo durante migración
- Actualizado `es_administrador` para usar `rol_obj.categoria`
- Actualizado `es_operador` para usar `rol_obj.categoria`
- Agregada propiedad `rol` que retorna `rol_obj` para serialización

#### `models/__init__.py` (ACTUALIZADO)
- Agregada importación de `Rol`
- Agregado "Rol" a `__all__`

### 2. Schemas (schemas/)

#### `schemas/rol.py` (NUEVO)
- `RolBase`: Schema base con todos los campos
- `RolCreate`: Para crear nuevos roles
- `RolUpdate`: Para actualizar roles (todos los campos opcionales)
- `RolResponse`: Respuesta completa con id y created_at
- `RolSimple`: Version simplificada para listas y dropdowns

#### `schemas/usuario.py` (ACTUALIZADO)
- Cambiado `rol: UserRole` → `rol_id: int` en `UsuarioBase`
- Agregado import de `RolSimple`
- Actualizado `UsuarioResponse` para incluir:
  - `rol: RolSimple` - información completa del rol
  - `rol_id: int` - ID del rol
  - Mantenido `es_administrador` y `es_operador` para compatibilidad
- Actualizado `UsuarioList` para incluir `rol: RolSimple` y `rol_id`

### 3. Routers (routers/)

#### `routers/roles.py` (NUEVO)
Endpoints para gestión de roles:

**GET /api/roles/**
- Lista todos los roles
- Filtros: `activo`, `categoria`
- Ordenado por nivel_jerarquia y nombre
- Acceso: Cualquier usuario autenticado

**GET /api/roles/{rol_id}**
- Obtiene detalles de un rol específico
- Acceso: Cualquier usuario autenticado

**POST /api/roles/**
- Crea un nuevo rol
- Valida que el código no exista
- Acceso: Solo administradores

**PUT /api/roles/{rol_id}**
- Actualiza un rol existente
- Valida código único si se cambia
- Acceso: Solo administradores

**DELETE /api/roles/{rol_id}**
- Desactiva un rol (no elimina físicamente)
- Valida que no haya usuarios activos con ese rol
- Acceso: Solo administradores

**GET /api/roles/categoria/{categoria}**
- Lista roles de una categoría específica
- Filtro: `activo`
- Acceso: Cualquier usuario autenticado

#### `routers/usuarios.py` (ACTUALIZADO)
- Agregado import de `Rol` y `joinedload`
- Función `check_admin_role`: Cambiada a usar `rol_obj.categoria == "ADMINISTRADOR"`
- **GET /api/usuarios/**: 
  - Agregado eager loading: `.options(joinedload(Usuario.rol_obj))`
  - Cambiado filtro `rol: UserRole` → `rol_id: int` y `categoria: str`
  - Actualizado check admin a usar `rol_obj.categoria`
- **GET /api/usuarios/{usuario_id}**:
  - Agregado eager loading de rol_obj
  - Actualizado check admin a usar `rol_obj.categoria`
- **POST /api/usuarios/**:
  - Agregada validación de que el rol exista y esté activo
  - Actualizado log para usar `rol_obj.nombre`
- **PUT /api/usuarios/{usuario_id}**:
  - Cambiado parámetro `rol: str` → `rol_id: int`
  - Agregado eager loading de rol_obj
  - Actualizado check admin a usar `rol_obj.categoria`
  - Agregada validación de que el rol exista y esté activo al cambiar

#### `routers/auth.py` (ACTUALIZADO)
- Agregado import de `joinedload`
- Endpoint `/token`: Agregado `.options(joinedload(Usuario.rol_obj))` al query de usuario

#### `routers/__init__.py` (ACTUALIZADO)
- Agregada importación de `roles`
- Agregado "roles" a `__all__`

### 4. Core (core/)

#### `core/dependencies.py` (ACTUALIZADO)
- Agregado import de `joinedload`
- Función `get_current_user`: Agregado `.options(joinedload(Usuario.rol_obj))` para cargar rol eagerly

### 5. Main (main.py) (ACTUALIZADO)
- Agregada importación de `roles` router
- Agregada línea: `app.include_router(roles.router, tags=["Roles"])`

## Base de Datos

### Migración
Ejecutar el archivo `database/migracion_roles.sql` que:
1. Crea la tabla `roles`
2. Inserta los 8 roles predefinidos
3. Agrega columnas `rol_antiguo` y `rol_id` a `usuarios`
4. Mapea usuarios existentes:
   - ADMINISTRADOR → Coordinación General (id=1)
   - OPERADOR → Operador de Planta (id=6)
5. Mantiene la columna `rol` antigua por compatibilidad

### SQL de Migración
```sql
-- Ver database/migracion_roles.sql
```

## Próximos Pasos

### Frontend

1. **Crear servicio de roles** (`frontend/src/app/services/rol.service.ts`)
   - Métodos CRUD para gestión de roles
   - Cache de lista de roles
   - Filtros por categoría

2. **Actualizar servicio de autenticación** (`frontend/src/app/services/auth.service.ts`)
   - Manejar estructura `rol` en lugar de enum
   - Actualizar `currentUser` para incluir `rol: { id, codigo, nombre, categoria, nivel_jerarquia }`
   - Métodos: `esAdmin()`, `esOperador()`, etc. basados en categoria

3. **Actualizar gestión de usuarios** (`frontend/src/app/pages/usuarios/`)
   - Reemplazar dropdown de rol (ADMIN/OPERADOR) con dropdown dinámico de roles
   - Mostrar `rol.nombre` en la tabla
   - Filtros por categoria y nivel_jerarquia
   - Agregar badge con color según categoria

4. **Actualizar guards** (`frontend/src/app/guards/`)
   - Cambiar checks de `rol === 'ADMINISTRADOR'` a `rol.categoria === 'ADMINISTRADOR'`
   - Implementar guards basados en nivel_jerarquia si es necesario

5. **Actualizar componentes que usan roles**
   - Header: Mostrar `currentUser.rol.nombre` en lugar de enum
   - Sidebar: Permisos basados en categoria
   - Profile: Mostrar información completa del rol

## Ventajas del Nuevo Sistema

1. **Escalabilidad**: Fácil agregar nuevos roles sin modificar código
2. **Jerarquía**: Los roles tienen niveles que pueden usarse para permisos
3. **Categorías**: Agrupación lógica de roles (ADMINISTRADOR, JEFATURA, SUPERVISOR, OPERADOR)
4. **Flexibilidad**: Roles pueden tener descripciones y metadata adicional
5. **Auditoría**: Cambios de rol se pueden trackear mejor
6. **UI Mejorada**: Nombres descriptivos en lugar de códigos técnicos

## Compatibilidad

- El sistema mantiene la columna `rol_legacy` por compatibilidad temporal
- Los métodos `es_administrador` y `es_operador` siguen funcionando
- La migración es no destructiva (no elimina datos)
- Se puede revertir si es necesario

## Testing

Antes de desplegar:
1. Ejecutar migración en base de datos de desarrollo
2. Verificar que todos los usuarios tengan `rol_id` asignado
3. Probar login con usuarios de diferentes roles
4. Verificar permisos de endpoints (admin vs operador)
5. Probar CRUD de usuarios con nuevos roles
6. Verificar que los logs se generen correctamente

## Ejecución de la Migración

```bash
# 1. Conectar a PostgreSQL
psql -U postgres -d planta_esperanza

# 2. Ejecutar script de migración
\i database/migracion_roles.sql

# 3. Verificar migración
SELECT * FROM roles;
SELECT username, rol_antiguo, rol_id FROM usuarios;

# 4. Reiniciar backend
cd backend
# Detener servidor actual
# Iniciar servidor
```

## Notas Importantes

- **NO ELIMINAR** la columna `rol_legacy` hasta confirmar que todo funciona
- **BACKUP** de la base de datos antes de migrar
- Los administradores actuales se mapearán a "Coordinación General"
- Los operadores actuales se mapearán a "Operador de Planta"
- Se puede reasignar roles manualmente después de la migración si es necesario
