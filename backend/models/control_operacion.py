"""
Modelo para el control horario de operación del sistema (Matriz 2)
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Date, Time, DateTime, Text, ForeignKey, UniqueConstraint, Numeric
from sqlalchemy.orm import relationship
from . import Base


class ControlOperacion(Base):
    """Modelo para el control horario de operación del sistema"""
    __tablename__ = "control_operacion"
    
    id = Column(Integer, primary_key=True, index=True)
    fecha = Column(Date, nullable=False, index=True)
    hora = Column(Time, nullable=False, index=True)
    
    # Turbedad
    turbedad_ac = Column(Numeric(10, 2))  # Agua cruda (FTU)
    turbedad_at = Column(Numeric(10, 2))  # Agua tratada (FTU)
    
    # Color
    color = Column(String(50))
    
    # pH
    ph_ac = Column(Numeric(4, 2))  # pH agua cruda
    ph_sulf = Column(Numeric(4, 2))  # pH con sulfato
    ph_at = Column(Numeric(4, 2))  # pH agua tratada
    
    # Dosis Químicos
    dosis_sulfato = Column(Numeric(10, 3))  # l/s
    dosis_cal = Column(Numeric(10, 3))  # l/s
    dosis_floergel = Column(Numeric(10, 3))  # l/s
    
    # Factor de Forma
    ff = Column(Numeric(10, 2))
    
    # Clarificación
    clarificacion_is = Column(Numeric(10, 2))  # K/Cm³
    clarificacion_cs = Column(Numeric(10, 2))  # K/Cm³
    clarificacion_fs = Column(Numeric(10, 2))  # K/Cm³
    
    # Presión
    presion_psi = Column(Numeric(10, 2))  # PSI
    presion_pre = Column(Numeric(10, 2))  # Kg/h
    presion_pos = Column(Numeric(10, 2))  # Kg/h
    presion_total = Column(Numeric(10, 2))  # PRE + POS (Kg/h)
    
    # Cloración
    cloro_residual = Column(Numeric(10, 2))  # mg/l
    
    observaciones = Column(Text)
    operador_id = Column(Integer, ForeignKey("operadores.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relaciones
    operador = relationship("Operador", back_populates="controles_operacion")
    
    __table_args__ = (
        UniqueConstraint('fecha', 'hora', name='uq_fecha_hora_operacion'),
    )
    
    def __repr__(self):
        return f"<ControlOperacion(id={self.id}, fecha={self.fecha}, hora={self.hora})>"
