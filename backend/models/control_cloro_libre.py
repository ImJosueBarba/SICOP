"""
Modelo para el control de inventario de cloro libre (Matriz 5)
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Date, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from . import Base


class ControlCloroLibre(Base):
    """Modelo para el control de inventario de cloro libre"""
    __tablename__ = "control_cloro_libre"
    
    id = Column(Integer, primary_key=True, index=True)
    fecha_mes = Column(Date, nullable=False, index=True)
    documento_soporte = Column(String(100))
    proveedor_solicitante = Column(String(100))
    codigo = Column(String(50), index=True)
    especificacion = Column(String(200))
    
    # Movimientos
    cantidad_entra = Column(Integer, default=0)
    cantidad_sale = Column(Integer, default=0)
    cantidad_saldo = Column(Integer)
    
    observaciones = Column(Text)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relaciones
    usuario = relationship("Usuario", back_populates="controles_cloro")
    
    def __repr__(self):
        return f"<ControlCloroLibre(id={self.id}, fecha={self.fecha_mes}, codigo='{self.codigo}', saldo={self.cantidad_saldo})>"
