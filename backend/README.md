# Backend - Sistema de Gestión Planta de Tratamiento de Agua

## Instalación

### 1. Crear y activar entorno virtual

**Windows (PowerShell):**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Windows (CMD):**
```cmd
python -m venv venv
venv\Scripts\activate.bat
```

**Linux/Mac:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 2. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env` y configura tus credenciales:

```bash
cp .env.example .env
```

Edita `.env` y configura tu conexión a PostgreSQL:
```
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/planta_esperanza
```

### 4. Crear la base de datos

Primero crea la base de datos en PostgreSQL:
```sql
CREATE DATABASE planta_esperanza;
```

Luego ejecuta el script SQL para crear las tablas:
```bash
psql -U tu_usuario -d planta_esperanza -f ../database_schema.sql
```

### 5. Ejecutar la aplicación

```bash
python main.py
```

O con uvicorn directamente:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

La API estará disponible en:
- API: http://localhost:8000
- Documentación Swagger: http://localhost:8000/docs
- Documentación ReDoc: http://localhost:8000/redoc

## Estructura del Proyecto

```
backend/
├── main.py                    # Aplicación principal FastAPI
├── database.py                # Configuración de base de datos
├── requirements.txt           # Dependencias
├── .env                       # Variables de entorno (no incluir en git)
├── .env.example              # Ejemplo de variables de entorno
├── models/                   # Modelos SQLAlchemy
│   ├── __init__.py
│   ├── operador.py
│   ├── quimico.py
│   └── ...
├── schemas/                  # Schemas Pydantic para validación
│   ├── __init__.py
│   ├── operador.py
│   └── ...
└── routers/                  # Endpoints de la API
    ├── __init__.py
    ├── operadores.py
    └── ...
```

## Endpoints Disponibles

### Maestros
- `/api/operadores` - CRUD de operadores
- `/api/quimicos` - CRUD de químicos
- `/api/filtros` - CRUD de filtros

### Matrices de Control
- `/api/consumo-mensual` - Matriz 1: Consumo mensual de químicos
- `/api/control-operacion` - Matriz 2: Control de operación horario
- `/api/produccion-filtros` - Matriz 3: Producción por filtro
- `/api/consumo-diario` - Matriz 4: Consumo diario detallado
- `/api/cloro-libre` - Matriz 5: Inventario de cloro libre
- `/api/monitoreo-fisicoquimico` - Matriz 6: Monitoreo fisicoquímico

## Desarrollo

### Desactivar entorno virtual
```bash
deactivate
```

### Actualizar dependencias
```bash
pip freeze > requirements.txt
```

## Notas

- El entorno virtual (`venv/`) no se incluye en el control de versiones
- Asegúrate de tener PostgreSQL instalado y corriendo
- El archivo `.env` contiene información sensible y no debe compartirse
