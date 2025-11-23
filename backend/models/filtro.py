"""
Modelo de Filtros de la planta
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime, Numeric
from . import Base


class Filtro(Base):
    """Modelo de Filtros de la planta"""
    __tablename__ = "filtros"
    
    id = Column(Integer, primary_key=True, index=True)
    numero = Column(Integer, unique=True, nullable=False)
    nombre = Column(String(50), nullable=False)
    capacidad_maxima = Column(Numeric(10, 2))
    altura_maxima = Column(Numeric(10, 2))
    fecha_instalacion = Column(Date)
    estado = Column(String(20), default="OPERATIVO")  # OPERATIVO, MANTENIMIENTO, FUERA_SERVICIO
    ultima_limpieza = Column(Date)
    activo = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f"<Filtro(id={self.id}, numero={self.numero}, nombre='{self.nombre}', estado='{self.estado}')>"
