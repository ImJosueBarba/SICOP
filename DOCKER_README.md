# 🐳 Guía de Docker para Planta La Esperanza

## Prerrequisitos
- Docker Desktop instalado y ejecutándose
- Al menos 4GB de RAM disponible para Docker

## 🚀 Inicio Rápido

### 1. Primera vez - Construir y levantar todos los servicios
```bash
docker-compose up --build
```

### 2. Iniciar servicios (después de la primera construcción)
```bash
docker-compose up
```

### 3. Iniciar en segundo plano (detached mode)
```bash
docker-compose up -d
```

### 4. Ver logs
```bash
# Todos los servicios
docker-compose logs -f

# Un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### 5. Detener servicios
```bash
docker-compose down
```

### 6. Detener y eliminar volúmenes (⚠️ elimina datos de BD)
```bash
docker-compose down -v
```

## 📋 Servicios Disponibles

| Servicio | Puerto | URL |
|----------|--------|-----|
| Frontend | 80 | http://localhost |
| Backend API | 8000 | http://localhost:8000 |
| PostgreSQL | 5432 | localhost:5432 |
| API Docs | 8000 | http://localhost:8000/docs |

## 🔧 Comandos Útiles

### Reconstruir un servicio específico
```bash
docker-compose up --build backend
docker-compose up --build frontend
```

### Acceder a un contenedor
```bash
# Backend
docker exec -it planta_esperanza_backend bash

# Base de datos
docker exec -it planta_esperanza_db psql -U postgres -d planta_esperanza

# Frontend (Alpine Linux)
docker exec -it planta_esperanza_frontend sh
```

### Ver estado de contenedores
```bash
docker-compose ps
```

### Reiniciar un servicio
```bash
docker-compose restart backend
docker-compose restart frontend
```

### Actualizar contraseñas de usuarios (después de primera ejecución)
```bash
docker exec -it planta_esperanza_backend python -c "from core.database import SessionLocal; from core.security import get_password_hash; from models.usuario import Usuario; db = SessionLocal(); admin = db.query(Usuario).filter(Usuario.username == 'admin').first(); if admin: admin.hashed_password = get_password_hash('admin123'); db.commit(); jperez = db.query(Usuario).filter(Usuario.username == 'jperez').first(); if jperez: jperez.hashed_password = get_password_hash('operador123'); db.commit(); print('Contraseñas actualizadas'); db.close()"
```

## 🗄️ Base de Datos

### Backup de la base de datos
```bash
docker exec planta_esperanza_db pg_dump -U postgres planta_esperanza > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restaurar backup
```bash
docker exec -i planta_esperanza_db psql -U postgres planta_esperanza < backup.sql
```

### Acceder a PostgreSQL
```bash
docker exec -it planta_esperanza_db psql -U postgres -d planta_esperanza
```

## 🔄 Desarrollo

### Backend con hot-reload
El backend ya está configurado con `--reload`, cualquier cambio en el código se reflejará automáticamente.

### Frontend - desarrollo sin Docker
Si prefieres desarrollar el frontend sin Docker:
```bash
cd frontend
npm install
npm start
```

Entonces modifica el `docker-compose.yml` para comentar el servicio frontend o simplemente no lo uses.

## 🛠️ Troubleshooting

### El frontend no conecta con el backend
- Verifica que los contenedores estén corriendo: `docker-compose ps`
- Revisa los logs: `docker-compose logs -f`
- Asegúrate de que el puerto 8000 no esté en uso

### Error de permisos en Windows
- Asegúrate de que Docker Desktop tenga permisos
- Comparte las unidades en Docker Desktop Settings

### La base de datos no inicia
```bash
# Ver logs
docker-compose logs db

# Reiniciar servicio
docker-compose restart db

# Si persiste, eliminar volumen y reiniciar
docker-compose down -v
docker-compose up --build
```

### Limpiar todo Docker (⚠️ elimina todo)
```bash
docker-compose down -v
docker system prune -a --volumes
```

## 📝 Credenciales por Defecto

Después de ejecutar el script de actualización de contraseñas:

**Administrador:**
- Usuario: `admin`
- Contraseña: `admin123`

**Operador:**
- Usuario: `jperez`
- Contraseña: `operador123`

**Base de Datos:**
- Host: `localhost` (desde fuera de Docker) o `db` (desde dentro de Docker)
- Puerto: `5432`
- Database: `planta_esperanza`
- Usuario: `postgres`
- Contraseña: `postgres123`

## 🎯 Flujo de Trabajo Recomendado

1. **Primera vez:**
   ```bash
   docker-compose up --build
   # Esperar a que todo inicie
   # Ejecutar script de actualización de contraseñas
   ```

2. **Desarrollo diario:**
   ```bash
   docker-compose up -d
   # Trabajar normalmente
   docker-compose logs -f backend  # Si necesitas ver logs
   docker-compose down  # Al terminar
   ```

3. **Después de cambios importantes:**
   ```bash
   docker-compose up --build
   ```

## 🌐 Producción

Para producción, considera:
- Cambiar todas las contraseñas y SECRET_KEY
- Usar variables de entorno desde archivo `.env`
- Configurar HTTPS con certificados SSL
- Usar volúmenes externos para persistencia
- Implementar backup automatizado
- Configurar límites de recursos en docker-compose
