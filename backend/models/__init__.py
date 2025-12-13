"""
Modelos SQLAlchemy para el Sistema de Gestión de Planta de Tratamiento de Agua
Planta "La Esperanza"
"""

from sqlalchemy.orm import declarative_base

# Base declarativa para todos los modelos
Base = declarative_base()

# Importar todos los modelos
from .usuario import Usuario, UserRole
from .quimico import Quimico
from .filtro import Filtro
from .consumo_quimico_mensual import ConsumoQuimicoMensual
from .control_operacion import ControlOperacion
from .produccion_filtro import ProduccionFiltro
from .control_consumo_diario import ControlConsumoDiario
from .control_cloro_libre import ControlCloroLibre
from .monitoreo_fisicoquimico import MonitoreoFisicoquimico

__all__ = [
    "Base",
    "Operador",
    "Quimico",
    "Filtro",
    "ConsumoQuimicoMensual",
    "ControlOperacion",
    "ProduccionFiltro",
    "ControlConsumoDiario",
    "ControlCloroLibre",
    "MonitoreoFisicoquimico",
]
