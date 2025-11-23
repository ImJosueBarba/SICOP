"""
Modelo de Químicos (catálogo)
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Numeric
from sqlalchemy.orm import relationship
from . import Base


class Quimico(Base):
    """Modelo de Químicos (catálogo)"""
    __tablename__ = "quimicos"
    
    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String(50), unique=True, nullable=False)
    nombre = Column(String(100), nullable=False)
    tipo = Column(String(50), nullable=False)  # SULFATO_ALUMINIO, CAL, HIPOCLORITO, etc.
    unidad_medida = Column(String(20), nullable=False)  # KG, SACOS, LITROS, UNIDADES
    peso_por_unidad = Column(Numeric(10, 2))
    stock_minimo = Column(Integer)
    stock_actual = Column(Integer, default=0)
    proveedor = Column(String(100))
    activo = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relaciones
    consumos_diarios = relationship("ControlConsumoDiario", back_populates="quimico")
    
    def __repr__(self):
        return f"<Quimico(id={self.id}, codigo='{self.codigo}', nombre='{self.nombre}')>"
    
    @property
    def nivel_stock(self):
        """Retorna el nivel de alerta del stock"""
        if self.stock_actual <= self.stock_minimo:
            return "CRÍTICO"
        elif self.stock_actual <= (self.stock_minimo * 1.5):
            return "BAJO"
        return "NORMAL"
