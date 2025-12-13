"""
Modelo para el control horario de producción por filtro (Matriz 3)
"""

from datetime import datetime
from sqlalchemy import Column, Integer, Date, Time, DateTime, Text, ForeignKey, UniqueConstraint, Numeric
from sqlalchemy.orm import relationship
from . import Base


class ProduccionFiltro(Base):
    """Modelo para el control horario de producción por filtro"""
    __tablename__ = "produccion_filtros"
    
    id = Column(Integer, primary_key=True, index=True)
    fecha = Column(Date, nullable=False, index=True)
    hora = Column(Time, nullable=False)
    
    # Filtro 1
    filtro1_h = Column(Numeric(10, 2))  # Altura en cm
    filtro1_q = Column(Numeric(10, 2))  # Caudal en l/s
    
    # Filtro 2
    filtro2_h = Column(Numeric(10, 2))
    filtro2_q = Column(Numeric(10, 2))
    
    # Filtro 3
    filtro3_h = Column(Numeric(10, 2))
    filtro3_q = Column(Numeric(10, 2))
    
    # Filtro 4
    filtro4_h = Column(Numeric(10, 2))
    filtro4_q = Column(Numeric(10, 2))
    
    # Filtro 5
    filtro5_h = Column(Numeric(10, 2))
    filtro5_q = Column(Numeric(10, 2))
    
    # Filtro 6
    filtro6_h = Column(Numeric(10, 2))
    filtro6_q = Column(Numeric(10, 2))
    
    # Total (se calcula automáticamente por trigger en BD)
    caudal_total = Column(Numeric(10, 2))
    
    observaciones = Column(Text)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relaciones
    usuario = relationship("Usuario", back_populates="producciones_filtros")
    
    __table_args__ = (
        UniqueConstraint('fecha', 'hora', name='uq_fecha_hora_produccion'),
    )
    
    def __repr__(self):
        return f"<ProduccionFiltro(id={self.id}, fecha={self.fecha}, hora={self.hora}, total={self.caudal_total})>"
