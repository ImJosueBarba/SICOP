-- ============================================================================
-- BASE DE DATOS: PLANTA DE TRATAMIENTO DE AGUA POTABLE "LA ESPERANZA"
-- Sistema de Gestión de Operaciones y Monitoreo
-- ============================================================================

-- Eliminar tablas si existen (para desarrollo)
DROP TABLE IF EXISTS monitoreo_fisicoquimico CASCADE;
DROP TABLE IF EXISTS control_cloro_libre CASCADE;
DROP TABLE IF EXISTS control_consumo_diario_quimicos CASCADE;
DROP TABLE IF EXISTS produccion_filtros CASCADE;
DROP TABLE IF EXISTS control_operacion CASCADE;
DROP TABLE IF EXISTS consumo_quimicos_mensual CASCADE;
DROP TABLE IF EXISTS operadores CASCADE;
DROP TABLE IF EXISTS quimicos CASCADE;
DROP TABLE IF EXISTS filtros CASCADE;

-- ============================================================================
-- TABLAS MAESTRAS
-- ============================================================================

-- Tabla de Operadores
CREATE TABLE operadores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    telefono VARCHAR(20),
    activo BOOLEAN DEFAULT TRUE,
    fecha_contratacion DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Químicos (catálogo)
CREATE TABLE quimicos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL, -- 'SULFATO_ALUMINIO', 'CAL', 'HIPOCLORITO', 'CLORO_GAS', 'FLOCULANTE', 'CLORO_LIBRE'
    unidad_medida VARCHAR(20) NOT NULL, -- 'KG', 'SACOS', 'LITROS', 'UNIDADES'
    peso_por_unidad DECIMAL(10, 2), -- Para conversiones (ej: 25 kg por saco)
    stock_minimo INTEGER,
    stock_actual INTEGER DEFAULT 0,
    proveedor VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Filtros
CREATE TABLE filtros (
    id SERIAL PRIMARY KEY,
    numero INTEGER UNIQUE NOT NULL, -- 1 a 6
    nombre VARCHAR(50) NOT NULL, -- 'FILTRO 1', 'FILTRO 2', etc.
    capacidad_maxima DECIMAL(10, 2), -- Capacidad máxima en l/s
    altura_maxima DECIMAL(10, 2), -- Altura máxima en cm
    fecha_instalacion DATE,
    estado VARCHAR(20) DEFAULT 'OPERATIVO', -- 'OPERATIVO', 'MANTENIMIENTO', 'FUERA_SERVICIO'
    ultima_limpieza DATE,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- MATRIZ 1: CONSUMO DE QUÍMICOS MENSUAL
-- ============================================================================

CREATE TABLE consumo_quimicos_mensual (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    mes INTEGER NOT NULL CHECK (mes BETWEEN 1 AND 12),
    anio INTEGER NOT NULL,
    
    -- Sulfato de Aluminio
    sulfato_con DECIMAL(10, 2),
    sulfato_ing DECIMAL(10, 2),
    sulfato_guia VARCHAR(50),
    sulfato_re DECIMAL(10, 2),
    
    -- Cal
    cal_con INTEGER,
    cal_ing INTEGER,
    cal_guia VARCHAR(50),
    
    -- Hipoclorito de Calcio
    hipoclorito_con DECIMAL(10, 2),
    hipoclorito_ing DECIMAL(10, 2),
    hipoclorito_guia VARCHAR(50),
    
    -- Gas Licuado de Cloro
    cloro_gas_con DECIMAL(10, 2),
    cloro_gas_ing_bal DECIMAL(10, 2),
    cloro_gas_ing_bdg DECIMAL(10, 2),
    cloro_gas_guia VARCHAR(50),
    cloro_gas_egre DECIMAL(10, 2),
    
    -- Producción
    produccion_m3_dia DECIMAL(10, 2),
    
    -- Resumen mensual
    inicio_mes_kg DECIMAL(10, 2),
    ingreso_mes_kg DECIMAL(10, 2),
    consumo_mes_kg DECIMAL(10, 2),
    egreso_mes_kg DECIMAL(10, 2),
    fin_mes_kg DECIMAL(10, 2),
    
    observaciones TEXT,
    operador_id INTEGER REFERENCES operadores(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Restricción única por mes y año
    UNIQUE(mes, anio)
);

-- ============================================================================
-- MATRIZ 2: CONTROL DE OPERACIÓN (COAGULACIÓN, FLOCULACIÓN Y CLORACIÓN)
-- ============================================================================

CREATE TABLE control_operacion (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    
    -- Turbedad
    turbedad_ac DECIMAL(10, 2), -- Agua cruda (FTU)
    turbedad_at DECIMAL(10, 2), -- Agua tratada (FTU)
    
    -- Color
    color VARCHAR(50),
    
    -- pH
    ph_ac DECIMAL(4, 2), -- pH agua cruda
    ph_sulf DECIMAL(4, 2), -- pH con sulfato
    ph_at DECIMAL(4, 2), -- pH agua tratada
    
    -- Dosis Químicos
    dosis_sulfato DECIMAL(10, 3), -- l/s
    dosis_cal DECIMAL(10, 3), -- l/s
    dosis_floergel DECIMAL(10, 3), -- l/s
    
    -- Factor de Forma
    ff DECIMAL(10, 2),
    
    -- Clarificacion
    clarificacion_is DECIMAL(10, 2), -- K/Cm3
    clarificacion_cs DECIMAL(10, 2), -- K/Cm3
    clarificacion_fs DECIMAL(10, 2), -- K/Cm3
    
    -- Presión
    presion_psi DECIMAL(10, 2), -- PSI
    presion_pre DECIMAL(10, 2), -- Kg/h
    presion_pos DECIMAL(10, 2), -- Kg/h
    presion_total DECIMAL(10, 2), -- PRE + POS (Kg/h)
    
    -- Cloración
    cloro_residual DECIMAL(10, 2), -- mg/l
    
    observaciones TEXT,
    operador_id INTEGER REFERENCES operadores(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Índice para búsquedas rápidas por fecha y hora
    CONSTRAINT control_operacion_fecha_hora_unique UNIQUE(fecha, hora)
);

CREATE INDEX idx_control_operacion_fecha ON control_operacion(fecha);
CREATE INDEX idx_control_operacion_hora ON control_operacion(hora);

-- ============================================================================
-- MATRIZ 3: CONTROL DE PRODUCCIÓN POR FILTRO
-- ============================================================================

CREATE TABLE produccion_filtros (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    
    -- Filtro 1
    filtro1_h DECIMAL(10, 2), -- Altura en cm
    filtro1_q DECIMAL(10, 2), -- Caudal en l/s
    
    -- Filtro 2
    filtro2_h DECIMAL(10, 2),
    filtro2_q DECIMAL(10, 2),
    
    -- Filtro 3
    filtro3_h DECIMAL(10, 2),
    filtro3_q DECIMAL(10, 2),
    
    -- Filtro 4
    filtro4_h DECIMAL(10, 2),
    filtro4_q DECIMAL(10, 2),
    
    -- Filtro 5
    filtro5_h DECIMAL(10, 2),
    filtro5_q DECIMAL(10, 2),
    
    -- Filtro 6
    filtro6_h DECIMAL(10, 2),
    filtro6_q DECIMAL(10, 2),
    
    -- Total
    caudal_total DECIMAL(10, 2), -- Suma de todos los caudales (l/s)
    
    observaciones TEXT,
    operador_id INTEGER REFERENCES operadores(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT produccion_filtros_fecha_hora_unique UNIQUE(fecha, hora)
);

CREATE INDEX idx_produccion_filtros_fecha ON produccion_filtros(fecha);

-- ============================================================================
-- MATRIZ 4: CONTROL DIARIO DEL CONSUMO DE QUÍMICOS
-- ============================================================================

CREATE TABLE control_consumo_diario_quimicos (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    quimico_id INTEGER REFERENCES quimicos(id),
    
    -- Bodega
    bodega_ingresa INTEGER,
    bodega_egresa INTEGER,
    bodega_stock INTEGER,
    
    -- Tanque N1
    tanque1_hora TIME,
    tanque1_lectura_inicial DECIMAL(10, 2), -- cm
    tanque1_lectura_final DECIMAL(10, 2), -- cm
    tanque1_consumo DECIMAL(10, 2), -- cm
    
    -- Tanque N2 (solo para sulfato de aluminio)
    tanque2_hora TIME,
    tanque2_lectura_inicial DECIMAL(10, 2), -- cm
    tanque2_lectura_final DECIMAL(10, 2), -- cm
    tanque2_consumo DECIMAL(10, 2), -- cm
    
    -- Total
    total_consumo DECIMAL(10, 2),
    
    observaciones TEXT,
    operador_id INTEGER REFERENCES operadores(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_control_consumo_fecha ON control_consumo_diario_quimicos(fecha);
CREATE INDEX idx_control_consumo_quimico ON control_consumo_diario_quimicos(quimico_id);

-- ============================================================================
-- MATRIZ 5: CONTROL DE CLORO LIBRE (INVENTARIO)
-- ============================================================================

CREATE TABLE control_cloro_libre (
    id SERIAL PRIMARY KEY,
    fecha_mes DATE NOT NULL,
    documento_soporte VARCHAR(100), -- 'inventario', 'consumo en ple', etc.
    proveedor_solicitante VARCHAR(100),
    codigo VARCHAR(50), -- 'CLORO-LIBRE-1', etc.
    especificacion VARCHAR(200), -- 'VIENE D AGT', etc.
    
    -- Movimientos
    cantidad_entra INTEGER DEFAULT 0,
    cantidad_sale INTEGER DEFAULT 0,
    cantidad_saldo INTEGER,
    
    observaciones TEXT,
    operador_id INTEGER REFERENCES operadores(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_control_cloro_fecha ON control_cloro_libre(fecha_mes);
CREATE INDEX idx_control_cloro_codigo ON control_cloro_libre(codigo);

-- ============================================================================
-- MATRIZ 6: REPORTE DIARIO DE MONITOREO FISICOQUÍMICO COMPLEMENTARIO
-- ============================================================================

CREATE TABLE monitoreo_fisicoquimico (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    operador_id INTEGER REFERENCES operadores(id),
    lugar_agua_cruda VARCHAR(200),
    lugar_agua_tratada VARCHAR(200),
    
    muestra_numero INTEGER CHECK (muestra_numero BETWEEN 1 AND 3),
    hora TIME NOT NULL,
    
    -- Agua Cruda
    ac_ph DECIMAL(4, 2),
    ac_ce DECIMAL(10, 2), -- Conductividad eléctrica (μS/cm)
    ac_tds DECIMAL(10, 2), -- Sólidos disueltos totales (ppm)
    ac_salinidad DECIMAL(10, 3), -- Salinidad (ppt)
    ac_temperatura DECIMAL(5, 2), -- Temperatura (°C)
    
    -- Agua Tratada
    at_ph DECIMAL(4, 2),
    at_ce DECIMAL(10, 2), -- Conductividad eléctrica (μS/cm)
    at_tds DECIMAL(10, 2), -- Sólidos disueltos totales (ppm)
    at_salinidad DECIMAL(10, 3), -- Salinidad (ppt)
    at_temperatura DECIMAL(5, 2), -- Temperatura (°C)
    
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT monitoreo_fisicoquimico_fecha_muestra_unique UNIQUE(fecha, muestra_numero)
);

CREATE INDEX idx_monitoreo_fisicoquimico_fecha ON monitoreo_fisicoquimico(fecha);
CREATE INDEX idx_monitoreo_fisicoquimico_operador ON monitoreo_fisicoquimico(operador_id);

-- ============================================================================
-- VISTAS ÚTILES
-- ============================================================================

-- Vista: Resumen diario de producción
CREATE OR REPLACE VIEW vista_resumen_diario_produccion AS
SELECT 
    fecha,
    COUNT(*) as registros_horarios,
    AVG(caudal_total) as caudal_promedio,
    MAX(caudal_total) as caudal_maximo,
    MIN(caudal_total) as caudal_minimo,
    SUM(caudal_total) as produccion_total_dia
FROM produccion_filtros
GROUP BY fecha
ORDER BY fecha DESC;

-- Vista: Consumo de químicos consolidado
CREATE OR REPLACE VIEW vista_consumo_quimicos_consolidado AS
SELECT 
    ccd.fecha,
    q.nombre as quimico,
    q.tipo as tipo_quimico,
    ccd.bodega_stock as stock,
    ccd.total_consumo as consumo,
    o.nombre || ' ' || o.apellido as operador
FROM control_consumo_diario_quimicos ccd
JOIN quimicos q ON ccd.quimico_id = q.id
LEFT JOIN operadores o ON ccd.operador_id = o.id
ORDER BY ccd.fecha DESC, q.nombre;

-- Vista: Calidad del agua por día
CREATE OR REPLACE VIEW vista_calidad_agua_diaria AS
SELECT 
    fecha,
    muestra_numero,
    hora,
    -- Promedios Agua Cruda
    ac_ph,
    ac_ce,
    ac_tds,
    ac_temperatura,
    -- Promedios Agua Tratada
    at_ph,
    at_ce,
    at_tds,
    at_temperatura,
    -- Diferencias
    (at_ph - ac_ph) as diferencia_ph,
    (at_tds - ac_tds) as diferencia_tds,
    operador_id
FROM monitoreo_fisicoquimico
ORDER BY fecha DESC, muestra_numero;

-- Vista: Alertas de stock bajo
CREATE OR REPLACE VIEW vista_alertas_stock AS
SELECT 
    codigo,
    nombre,
    tipo,
    stock_actual,
    stock_minimo,
    (stock_actual - stock_minimo) as diferencia,
    CASE 
        WHEN stock_actual <= stock_minimo THEN 'CRÍTICO'
        WHEN stock_actual <= (stock_minimo * 1.5) THEN 'BAJO'
        ELSE 'NORMAL'
    END as nivel_alerta
FROM quimicos
WHERE activo = TRUE
ORDER BY stock_actual ASC;

-- ============================================================================
-- FUNCIONES Y TRIGGERS
-- ============================================================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para todas las tablas
CREATE TRIGGER update_operadores_updated_at BEFORE UPDATE ON operadores
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quimicos_updated_at BEFORE UPDATE ON quimicos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_filtros_updated_at BEFORE UPDATE ON filtros
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consumo_mensual_updated_at BEFORE UPDATE ON consumo_quimicos_mensual
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_control_operacion_updated_at BEFORE UPDATE ON control_operacion
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_produccion_filtros_updated_at BEFORE UPDATE ON produccion_filtros
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_control_consumo_updated_at BEFORE UPDATE ON control_consumo_diario_quimicos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_control_cloro_updated_at BEFORE UPDATE ON control_cloro_libre
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_monitoreo_updated_at BEFORE UPDATE ON monitoreo_fisicoquimico
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para calcular caudal total automáticamente
CREATE OR REPLACE FUNCTION calcular_caudal_total()
RETURNS TRIGGER AS $$
BEGIN
    NEW.caudal_total = COALESCE(NEW.filtro1_q, 0) + 
                       COALESCE(NEW.filtro2_q, 0) + 
                       COALESCE(NEW.filtro3_q, 0) + 
                       COALESCE(NEW.filtro4_q, 0) + 
                       COALESCE(NEW.filtro5_q, 0) + 
                       COALESCE(NEW.filtro6_q, 0);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_calcular_caudal_total 
BEFORE INSERT OR UPDATE ON produccion_filtros
FOR EACH ROW EXECUTE FUNCTION calcular_caudal_total();

-- ============================================================================
-- DATOS INICIALES (SEED DATA)
-- ============================================================================

-- Insertar químicos del catálogo
INSERT INTO quimicos (codigo, nombre, tipo, unidad_medida, peso_por_unidad, stock_minimo, stock_actual, activo) VALUES
('SULF-ALU-25', 'Sulfato de Aluminio', 'SULFATO_ALUMINIO', 'SACOS', 25.00, 50, 1376, TRUE),
('CAL-25', 'Cal (Óxido de Calcio)', 'CAL', 'SACOS', 25.00, 50, 1376, TRUE),
('FLOE-25', 'Floergel (Floculante)', 'FLOCULANTE', 'SACOS', 25.00, 20, 1376, TRUE),
('HIPO-CAL-45', 'Hipoclorito de Calcio', 'HIPOCLORITO', 'UNIDADES', 45.00, 30, 1376, TRUE),
('CLORO-GAS-907', 'Gas Licuado de Cloro', 'CLORO_GAS', 'KG', 907.00, 1000, 5000, TRUE),
('CLORO-LIBRE-1', 'Cloro Libre', 'CLORO_LIBRE', 'UNIDADES', 1.00, 100, 1307, TRUE);

-- Insertar filtros
INSERT INTO filtros (numero, nombre, capacidad_maxima, altura_maxima, fecha_instalacion, estado, activo) VALUES
(1, 'FILTRO 1', 50.00, 200.00, '2020-01-01', 'OPERATIVO', TRUE),
(2, 'FILTRO 2', 50.00, 200.00, '2020-01-01', 'OPERATIVO', TRUE),
(3, 'FILTRO 3', 50.00, 200.00, '2020-01-01', 'OPERATIVO', TRUE),
(4, 'FILTRO 4', 50.00, 200.00, '2020-01-01', 'OPERATIVO', TRUE),
(5, 'FILTRO 5', 50.00, 200.00, '2020-01-01', 'OPERATIVO', TRUE),
(6, 'FILTRO 6', 50.00, 200.00, '2020-01-01', 'OPERATIVO', TRUE);

-- ============================================================================
-- COMENTARIOS EN LAS TABLAS
-- ============================================================================

COMMENT ON TABLE operadores IS 'Catálogo de operadores de la planta';
COMMENT ON TABLE quimicos IS 'Catálogo de químicos utilizados en el tratamiento';
COMMENT ON TABLE filtros IS 'Catálogo de filtros de la planta';
COMMENT ON TABLE consumo_quimicos_mensual IS 'Matriz 1: Registro mensual de consumo de químicos';
COMMENT ON TABLE control_operacion IS 'Matriz 2: Control horario de operación del sistema de coagulación, floculación y cloración';
COMMENT ON TABLE produccion_filtros IS 'Matriz 3: Control horario de producción por filtro';
COMMENT ON TABLE control_consumo_diario_quimicos IS 'Matriz 4: Control diario detallado del consumo de químicos';
COMMENT ON TABLE control_cloro_libre IS 'Matriz 5: Control de inventario de cloro libre';
COMMENT ON TABLE monitoreo_fisicoquimico IS 'Matriz 6: Reporte diario de monitoreo fisicoquímico complementario';

-- ============================================================================
-- FIN DEL SCRIPT
-- ============================================================================
