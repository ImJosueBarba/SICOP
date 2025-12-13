"""
Modelo para el reporte diario de monitoreo fisicoquímico complementario (Matriz 6)
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Date, Time, DateTime, Text, ForeignKey, UniqueConstraint, CheckConstraint, Numeric
from sqlalchemy.orm import relationship
from . import Base


class MonitoreoFisicoquimico(Base):
    """Modelo para el reporte diario de monitoreo fisicoquímico complementario"""
    __tablename__ = "monitoreo_fisicoquimico"
    
    id = Column(Integer, primary_key=True, index=True)
    fecha = Column(Date, nullable=False, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), index=True)
    lugar_agua_cruda = Column(String(200))
    lugar_agua_tratada = Column(String(200))
    
    muestra_numero = Column(Integer, nullable=False)
    hora = Column(Time, nullable=False)
    
    # Agua Cruda
    ac_ph = Column(Numeric(4, 2))
    ac_ce = Column(Numeric(10, 2))  # Conductividad eléctrica (μS/cm)
    ac_tds = Column(Numeric(10, 2))  # Sólidos disueltos totales (ppm)
    ac_salinidad = Column(Numeric(10, 3))  # Salinidad (ppt)
    ac_temperatura = Column(Numeric(5, 2))  # Temperatura (°C)
    
    # Agua Tratada
    at_ph = Column(Numeric(4, 2))
    at_ce = Column(Numeric(10, 2))  # Conductividad eléctrica (μS/cm)
    at_tds = Column(Numeric(10, 2))  # Sólidos disueltos totales (ppm)
    at_salinidad = Column(Numeric(10, 3))  # Salinidad (ppt)
    at_temperatura = Column(Numeric(5, 2))  # Temperatura (°C)
    
    observaciones = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relaciones
    usuario = relationship("Usuario", back_populates="monitoreos")
    
    __table_args__ = (
        UniqueConstraint('fecha', 'muestra_numero', name='uq_fecha_muestra'),
        CheckConstraint('muestra_numero >= 1 AND muestra_numero <= 3', name='check_muestra_numero'),
    )
    
    def __repr__(self):
        return f"<MonitoreoFisicoquimico(id={self.id}, fecha={self.fecha}, muestra={self.muestra_numero})>"
    
    @property
    def diferencia_ph(self):
        """Calcula la diferencia de pH entre agua tratada y cruda"""
        if self.at_ph and self.ac_ph:
            return float(self.at_ph - self.ac_ph)
        return None
    
    @property
    def diferencia_tds(self):
        """Calcula la diferencia de TDS entre agua tratada y cruda"""
        if self.at_tds and self.ac_tds:
            return float(self.at_tds - self.ac_tds)
        return None
