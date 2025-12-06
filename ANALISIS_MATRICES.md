# Análisis de Matrices - Planta de Tratamiento de Agua Potable "La Esperanza"

## Fecha de Análisis: 23 de Noviembre 2025

---

## MATRIZ 1: Consumo de Químicos en Planta (Mensual)

### Descripción
Control mensual del consumo de químicos utilizados en la planta de tratamiento.

### Parámetros

| Campo | Tipo | Descripción | Unidad |
|-------|------|-------------|--------|
| FECHA | Date | Fecha del registro | - |
| **SULFATO DE ALUMINIO (KG)** | | | |
| - CON | Decimal | Consumo | KG |
| - ING | Decimal | Ingreso | KG |
| - GUIA(#) | String | Número de guía | - |
| - RE (KG) | Decimal | Remanente | KG |
| **CAL (SACOS DE CALCIO)** | | | |
| - CON | Integer | Consumo | Sacos |
| - ING | Integer | Ingreso | Sacos |
| - GUIA(#) | String | Número de guía | - |
| **HIPOCLORITO DE CALCIO** | | | |
| - CON | Decimal | Consumo | - |
| - ING | Decimal | Ingreso | - |
| - GUIA(#) | String | Número de guía | - |
| **GAS LICUADO DE CLORO** | | | |
| - CON | Decimal | Consumo | - |
| - ING BAL | Decimal | Ingreso balón | - |
| - ING BDG | Decimal | Ingreso bodega | - |
| - GUIA(#) | String | Número de guía | - |
| - EGRE | Decimal | Egreso | - |
| **PRODUCCIÓN** | | | |
| - M3/DIA | Decimal | Producción diaria | m³/día |
| TOTAL | Decimal | Total del periodo | - |

### Resumen Mensual (Septiembre 2025)

| Campo | Descripción | Unidad |
|-------|-------------|--------|
| INICIO MES (KG) | Stock inicial del mes | KG |
| INGRESO (KG) | Total ingresado en el mes | KG |
| CONSUMO (KG) | Total consumido en el mes | KG |
| EGRESO (KG) | Total de egresos | KG |
| FIN DE MES (KG) | Stock final del mes | KG |

**Químicos controlados:**
- Sulfato de aluminio (sacos de 25 kg)
- Cal (sacos de 25 kg)
- Hipoclorito de calcio (tambores 45K)
- Gas licuado de cloro (de 907 y 1000 kg)

---

## MATRIZ 2: Control de Operación del Sistema de Coagulación - Floculación y Cloración

### Descripción
Control horario (24 horas) de los parámetros operacionales del sistema de tratamiento.

### Parámetros

| Campo | Tipo | Descripción | Unidad |
|-------|------|-------------|--------|
| HORA | Time | Hora de medición (1:00 - 24:00) | HH:00 |
| **TURBEDAD** | | | |
| - AC (FTU) | Decimal | Agua cruda | FTU |
| - AT (FTU) | Decimal | Agua tratada | FTU |
| COLOR | String/Integer | Color del agua | - |
| **Ph** | | | |
| - AC | Decimal | pH agua cruda | - |
| - SULF | Decimal | pH con sulfato | - |
| - AT | Decimal | pH agua tratada | - |
| **DOSIS QUÍMICOS** | | | |
| - SULFATO (l/s) | Decimal | Dosificación de sulfato | l/s |
| - CAL (l/s) | Decimal | Dosificación de cal | l/s |
| - FLOERGEL (l/s) | Decimal | Dosificación de floculante | l/s |
| FF | Decimal | Factor de forma | - |
| **CLARIFICACIÓN** | | | |
| - IS | Decimal | Índice superior | K/Cm³ |
| - CS | Decimal | Centro superior | K/Cm³ |
| - FS | Decimal | Fondo superior | K/Cm³ |
| **PRESIÓN** | | | |
| - PRESION (PSI) | Decimal | Presión general | PSI |
| - PRE (Kg/h) | Decimal | Presión entrada | Kg/h |
| - POS (Kg/h) | Decimal | Presión salida | Kg/h |
| - PRE + POS (Kg/h) | Decimal | Suma de presiones | Kg/h |
| **CLORACIÓN** | | | |
| - CLORO RESIDUAL (mg/l) | Decimal | Cloro residual | mg/l |

### Frecuencia de Registro
Cada hora durante 24 horas

---

## MATRIZ 3: Control de Producción por Filtro

### Descripción
Control horario de la producción de agua por cada uno de los 6 filtros de la planta.

### Parámetros

| Campo | Tipo | Descripción | Unidad |
|-------|------|-------------|--------|
| HORA | Time | Hora de medición (01H00 - 24H00) | HH:00 |
| **FILTRO 1** | | | |
| - h (cm) | Decimal | Altura/nivel | cm |
| - q (l/s) | Decimal | Caudal | l/s |
| **FILTRO 2** | | | |
| - h (cm) | Decimal | Altura/nivel | cm |
| - q (l/s) | Decimal | Caudal | l/s |
| **FILTRO 3** | | | |
| - h (cm) | Decimal | Altura/nivel | cm |
| - q (l/s) | Decimal | Caudal | l/s |
| **FILTRO 4** | | | |
| - h (cm) | Decimal | Altura/nivel | cm |
| - q (l/s) | Decimal | Caudal | l/s |
| **FILTRO 5** | | | |
| - h (cm) | Decimal | Altura/nivel | cm |
| - q (l/s) | Decimal | Caudal | l/s |
| **FILTRO 6** | | | |
| - h (cm) | Decimal | Altura/nivel | cm |
| - q (l/s) | Decimal | Caudal | l/s |
| **TOTAL** | | | |
| - Q (l/s) | Decimal | Caudal total (suma de todos los filtros) | l/s |
| TOTAL (fila final) | Decimal | Total acumulado del día | - |

### Número de Filtros
6 filtros operativos

### Frecuencia de Registro
Cada hora durante 24 horas

---

## MATRIZ 4: Control Diario del Consumo de Químicos

### Descripción
Control detallado diario del consumo de químicos con lecturas de tanques y movimientos de bodega.

### Parámetros

#### A) SULFATO DE ALUMINIO (SACOS DE 25 KG)

**Bodega:**
| Campo | Tipo | Descripción | Unidad |
|-------|------|-------------|--------|
| INGRESA | Integer | Sacos que ingresan | Sacos |
| EGRESA | Integer | Sacos que egresan | Sacos |
| STOCK | Integer | Stock actual (1376) | Sacos |

**Tanque N1:**
| Campo | Tipo | Descripción | Unidad |
|-------|------|-------------|--------|
| HORA | Time | Hora de medición | HH:MM:SS |
| LECT. INICIAL | Decimal | Lectura inicial del tanque | cm |
| LECT. FINAL | Decimal | Lectura final del tanque | cm |
| CONSUMO | Decimal | Consumo calculado | cm |
| TOTAL | Decimal | Total consumido | - |

**Tanque N2:**
| Campo | Tipo | Descripción | Unidad |
|-------|------|-------------|--------|
| HORA | Time | Hora de medición | HH:MM:SS |
| LECT. INICIAL | Decimal | Lectura inicial del tanque | cm |
| LECT. FINAL | Decimal | Lectura final del tanque | cm |
| CONSUMO | Decimal | Consumo calculado | cm |
| TOTAL | Decimal | Total consumido | - |

#### B) CAL (SACOS DE 25 KG)

**Bodega:**
| Campo | Tipo | Descripción | Unidad |
|-------|------|-------------|--------|
| INGRESA | Integer | Sacos que ingresan | Sacos |
| EGRESA | Integer | Sacos que egresan | Sacos |
| STOCK | Integer | Stock actual (1376) | Sacos |

**Tanque N1:**
| Campo | Tipo | Descripción | Unidad |
|-------|------|-------------|--------|
| HORA | Time | Hora de medición | HH:MM:SS |
| LECT. INICIAL | Decimal | Lectura inicial del tanque | cm |
| LECT. FINAL | Decimal | Lectura final del tanque | cm |
| CONSUMO | Decimal | Consumo calculado | - |
| TOTAL | Decimal | Total consumido | - |

#### C) FLOERGER (SACOS DE 25 KG)

**Bodega:**
| Campo | Tipo | Descripción | Unidad |
|-------|------|-------------|--------|
| INGRESA | Integer | Sacos que ingresan | Sacos |
| EGRESA | Integer | Sacos que egresan | Sacos |
| STOCK | Integer | Stock actual (1376) | Sacos |

**Tanque N1:**
| Campo | Tipo | Descripción | Unidad |
|-------|------|-------------|--------|
| HORA | Time | Hora de medición | HH:MM:SS |
| LECT. INICIAL | Decimal | Lectura inicial del tanque | cm |
| LECT. FINAL | Decimal | Lectura final del tanque | cm |
| CONSUMO | Decimal | Consumo calculado | - |
| TOTAL | Decimal | Total consumido | - |

#### D) HIPOCLORITO DE CALCIO (45 Kg)

**Bodega:**
| Campo | Tipo | Descripción | Unidad |
|-------|------|-------------|--------|
| INGRESA | Integer | Unidades que ingresan | Unidades |
| EGRESA | Integer | Unidades que egresan | Unidades |
| STOCK (1) | Integer | Stock actual (1376) | Unidades |
| STOCK (2) | Integer | Stock adicional (1376) | Unidades |
| Total (45 Kg) | Decimal | Total en kilogramos | Kg |

---

## MATRIZ 5: Control de CLORO LIBRE (Inventario)

### Descripción
Control de inventario del cloro libre con entradas y salidas. Código del químico: 21055-28

### Parámetros

| Campo | Tipo | Descripción | Unidad |
|-------|------|-------------|--------|
| FECHA MES | Date | Fecha del movimiento | DD-MMM-YY |
| DOCUMENTO SOPORTE | String | Tipo de documento (inventario, consumo) | - |
| PROVEEDOR / SOLICITANTE | String | Nombre del proveedor o solicitante | - |
| COD. | String | Código del producto | - |
| ESPECIFICACIÓN | String | Especificación del producto | - |
| **Entra** | | | |
| - Cant | Integer | Cantidad que ingresa | Unidades |
| **Sale** | | | |
| - Cant | Integer | Cantidad que egresa | Unidades |
| **Saldo** | | | |
| - Cant | Integer | Saldo actual | Unidades |

### Ejemplo de Registro
- Inventario inicial: 1307 unidades (HDM ELQUITE)
- Consumos diarios en planta (PLE)
- Código producto: CLORO-LIBRE-1
- Especificación: VIENE D AGT

---

## MATRIZ 6: Reporte Diario de Monitoreo Fisicoquímico Complementario

### Descripción
Reporte comparativo de parámetros fisicoquímicos entre agua cruda y agua tratada.

### Parámetros Generales

| Campo | Tipo | Descripción |
|-------|------|-------------|
| Fecha | Date | Fecha del reporte |
| Operador | String | Nombre del operador |
| Lugar agua cruda | String | Ubicación de toma de muestra (agua cruda) |
| Lugar agua tratada | String | Ubicación de toma de muestra (agua tratada) |

### Parámetros por Muestra

| Campo | Tipo | Descripción | Unidad |
|-------|------|-------------|--------|
| MUESTRA Nº | Integer | Número de muestra (1, 2, 3) | - |
| HORA | Time | Hora de toma (9:00:00, 12:00:00, 18:00:00) | HH:MM:SS |

**AGUA CRUDA:**
| Campo | Tipo | Descripción | Unidad |
|-------|------|-------------|--------|
| pH | Decimal | Potencial de hidrógeno | - |
| CE (μS/cm) | Decimal | Conductividad eléctrica | μS/cm |
| TDS (ppm) | Decimal | Sólidos disueltos totales | ppm |
| SALIN (ppt) | Decimal | Salinidad | ppt |
| TEMP (°C) | Decimal | Temperatura | °C |

**AGUA TRATADA:**
| Campo | Tipo | Descripción | Unidad |
|-------|------|-------------|--------|
| pH | Decimal | Potencial de hidrógeno | - |
| CE (μS/cm) | Decimal | Conductividad eléctrica | μS/cm |
| TDS (ppm) | Decimal | Sólidos disueltos totales | ppm |
| SALIN (ppt) | Decimal | Salinidad | ppt |
| TEMP (°C) | Decimal | Temperatura | °C |

**Adicional:**
| Campo | Tipo | Descripción |
|-------|------|-------------|
| OBSERVACIONES | Text | Observaciones del operador |

### Número de Muestras Diarias
3 muestras (9:00, 12:00, 18:00)

---

## RELACIONES ENTRE MATRICES

### 1. MATRIZ 1 ↔ MATRIZ 4
**Tipo de relación:** Agregación temporal (Diario → Mensual)

**Descripción:**
- La **Matriz 4** registra el consumo diario detallado de químicos con lecturas de tanques
- La **Matriz 1** consolida estos datos en un reporte mensual
- Ambas controlan los mismos químicos: Sulfato de Aluminio, Cal, Hipoclorito de Calcio

**Campos relacionados:**
- Sulfato de Aluminio (sacos de 25 kg)
- Cal (sacos de 25 kg)
- Hipoclorito de Calcio

**Flujo de datos:**
```
Matriz 4 (Diario) → Acumulación → Matriz 1 (Mensual)
```

---

### 2. MATRIZ 2 ↔ MATRIZ 3
**Tipo de relación:** Datos complementarios horarios

**Descripción:**
- Ambas matrices registran datos cada hora (24 registros por día)
- **Matriz 2:** Controla la calidad del agua y dosificación de químicos
- **Matriz 3:** Controla la producción y caudales por filtro
- Ambas son necesarias para evaluar la eficiencia operacional

**Sincronización:**
- Mismo intervalo de tiempo (horario)
- Misma frecuencia de registro

**Análisis cruzado posible:**
- Correlación entre dosificación de químicos y producción por filtro
- Efecto de turbedad en caudales de filtros
- Impacto de presiones en producción

---

### 3. MATRIZ 4 ↔ MATRIZ 5
**Tipo de relación:** Control de inventario especializado

**Descripción:**
- **Matriz 4:** Control general de químicos incluyendo Hipoclorito de Calcio
- **Matriz 5:** Control específico y detallado del inventario de Cloro Libre
- La Matriz 5 es un desglose detallado del cloro

**Campos relacionados:**
- Hipoclorito de Calcio (Matriz 4) 
- Cloro Libre (Matriz 5)

**Flujo de datos:**
```
Matriz 5 (Movimientos de inventario) → Matriz 4 (Consumo diario)
```

---

### 4. MATRIZ 2 ↔ MATRIZ 6
**Tipo de relación:** Monitoreo de calidad complementario

**Descripción:**
- **Matriz 2:** Monitoreo operacional continuo (cada hora)
- **Matriz 6:** Monitoreo fisicoquímico complementario (3 veces al día)
- Ambas evalúan la calidad del agua pero con diferentes parámetros y frecuencias

**Parámetros comunes:**
- pH (agua cruda y tratada)
- Turbedad (Matriz 2) vs parámetros físicos (Matriz 6)

**Diferencias:**
- Matriz 2: Enfoque operacional (dosificación, presiones, filtros)
- Matriz 6: Enfoque analítico (conductividad, TDS, salinidad)

---

### 5. MATRIZ 1 ↔ MATRIZ 5
**Tipo de relación:** Control de inventario químico

**Descripción:**
- Ambas manejan inventarios de químicos
- **Matriz 1:** Consolidado mensual de todos los químicos
- **Matriz 5:** Detalle de movimientos de cloro con trazabilidad

**Campos relacionados:**
- Ingreso de químicos
- Consumo/Egreso
- Stock/Saldo

---

### 6. MATRIZ 2 → MATRIZ 1
**Tipo de relación:** Datos operacionales que afectan el consumo

**Descripción:**
- Las dosificaciones horarias de la Matriz 2 determinan el consumo mensual de la Matriz 1
- Las dosis de sulfato, cal y cloro registradas horariamente se acumulan para el reporte mensual

**Flujo de datos:**
```
Matriz 2 (Dosificación horaria) → Acumulación → Matriz 1 (Consumo mensual)
```

---

## RESUMEN DE DATOS CLAVE

### Químicos Utilizados
1. **Sulfato de Aluminio** - Sacos de 25 kg
2. **Cal (Óxido de Calcio)** - Sacos de 25 kg
3. **Floergel (Floculante)** - Sacos de 25 kg
4. **Hipoclorito de Calcio** - Unidades de 45 kg
5. **Gas Licuado de Cloro** - Cilindros de 907 y 1000 kg
6. **Cloro Libre** - Control específico

### Equipos de Tratamiento
- **6 Filtros** (Filtro 1 a Filtro 6)
- **Tanques de dosificación:**
  - Tanque N1 (Sulfato de Aluminio)
  - Tanque N2 (Sulfato de Aluminio)
  - Tanque N1 (Cal)
  - Tanque N1 (Floergel)

### Parámetros de Calidad Monitoreados
- **Físicos:** Turbedad, Color, Temperatura
- **Químicos:** pH, Cloro residual, Conductividad eléctrica, TDS, Salinidad
- **Operacionales:** Presiones, Caudales, Dosificaciones

### Frecuencias de Registro
- **Horario (24 veces/día):** Matrices 2 y 3
- **3 veces/día:** Matriz 6
- **Diario:** Matriz 4
- **Por evento:** Matriz 5
- **Mensual:** Matriz 1

---

## DIAGRAMA DE FLUJO DE DATOS

```
┌─────────────────────────────────────────────────────────┐
│                    OPERACIÓN DIARIA                      │
└─────────────────────────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │Matriz 2 │    │Matriz 3 │    │Matriz 6 │
    │(Horaria)│    │(Horaria)│    │(3x día) │
    │Calidad  │    │Filtros  │    │Físico-  │
    │         │    │         │    │Químico  │
    └────┬────┘    └─────────┘    └─────────┘
         │
         │ Dosificación
         ▼
    ┌─────────┐
    │Matriz 4 │
    │(Diaria) │
    │Consumo  │◄────────┐
    │Químicos │         │
    └────┬────┘         │
         │              │
         │ Acumulación  │
         ▼              │
    ┌─────────┐    ┌─────────┐
    │Matriz 1 │    │Matriz 5 │
    │(Mensual)│    │Inventario│
    │Resumen  │    │Cloro    │
    └─────────┘    └─────────┘
```

---

## PRÓXIMOS PASOS SUGERIDOS

### Para el Diseño de la Aplicación:

1. **Base de Datos:**
   - Diseñar esquema relacional con las 6 entidades principales
   - Definir claves primarias y foráneas
   - Establecer restricciones y validaciones

2. **Backend (Python):**
   - API REST con FastAPI o Django REST Framework
   - Modelos de datos (ORM)
   - Endpoints para CRUD de cada matriz
   - Cálculos automáticos (totales, promedios, acumulados)
   - Validaciones de datos

3. **Frontend (Angular):**
   - Formularios para ingreso de datos
   - Dashboards de visualización
   - Reportes automáticos
   - Gráficos y estadísticas
   - Alertas de stock bajo

4. **Funcionalidades Adicionales:**
   - Autenticación de operadores
   - Histórico de registros
   - Exportación a Excel/PDF
   - Alertas automáticas
   - Cálculos predictivos de consumo

---

**Documento generado:** 23 de Noviembre 2025  
**Planta de Tratamiento:** La Esperanza  
**Análisis realizado por:** GitHub Copilot
