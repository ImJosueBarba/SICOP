"""
Modelo para el control diario detallado del consumo de químicos (Matriz 4)
"""

from datetime import datetime
from sqlalchemy import Column, Integer, Date, Time, DateTime, Text, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from . import Base


class ControlConsumoDiario(Base):
    """Modelo para el control diario detallado del consumo de químicos"""
    __tablename__ = "control_consumo_diario_quimicos"
    
    id = Column(Integer, primary_key=True, index=True)
    fecha = Column(Date, nullable=False, index=True)
    quimico_id = Column(Integer, ForeignKey("quimicos.id"), index=True)
    
    # Bodega
    bodega_ingresa = Column(Integer)
    bodega_egresa = Column(Integer)
    bodega_stock = Column(Integer)
    
    # Tanque N1
    tanque1_hora = Column(Time)
    tanque1_lectura_inicial = Column(Numeric(10, 2))  # cm
    tanque1_lectura_final = Column(Numeric(10, 2))  # cm
    tanque1_consumo = Column(Numeric(10, 2))  # cm
    
    # Tanque N2 (solo para sulfato de aluminio)
    tanque2_hora = Column(Time)
    tanque2_lectura_inicial = Column(Numeric(10, 2))  # cm
    tanque2_lectura_final = Column(Numeric(10, 2))  # cm
    tanque2_consumo = Column(Numeric(10, 2))  # cm
    
    # Total
    total_consumo = Column(Numeric(10, 2))
    
    observaciones = Column(Text)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relaciones
    quimico = relationship("Quimico", back_populates="consumos_diarios")
    usuario = relationship("Usuario", back_populates="consumos_diarios")
    
    def __repr__(self):
        return f"<ControlConsumoDiario(id={self.id}, fecha={self.fecha}, quimico_id={self.quimico_id})>"
