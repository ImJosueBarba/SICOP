"""
Módulo de routers para la API
"""

from . import (
    usuarios,
    quimicos,
    filtros,
    consumo_mensual,
    control_operacion,
    produccion_filtros,
    consumo_diario,
    cloro_libre,
    monitoreo_fisicoquimico
)

__all__ = [
    "usuarios",
    "quimicos",
    "filtros",
    "consumo_mensual",
    "control_operacion",
    "produccion_filtros",
    "consumo_diario",
    "cloro_libre",
    "monitoreo_fisicoquimico"
]
