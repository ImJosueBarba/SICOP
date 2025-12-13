"""
Modelo para el registro mensual de consumo de químicos (Matriz 1)
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Date, DateTime, Text, ForeignKey, UniqueConstraint, CheckConstraint, Numeric
from sqlalchemy.orm import relationship
from . import Base


class ConsumoQuimicoMensual(Base):
    """Modelo para el registro mensual de consumo de químicos"""
    __tablename__ = "consumo_quimicos_mensual"
    
    id = Column(Integer, primary_key=True, index=True)
    fecha = Column(Date, nullable=False)
    mes = Column(Integer, nullable=False)
    anio = Column(Integer, nullable=False)
    
    # Sulfato de Aluminio
    sulfato_con = Column(Numeric(10, 2))
    sulfato_ing = Column(Numeric(10, 2))
    sulfato_guia = Column(String(50))
    sulfato_re = Column(Numeric(10, 2))
    
    # Cal
    cal_con = Column(Integer)
    cal_ing = Column(Integer)
    cal_guia = Column(String(50))
    
    # Hipoclorito de Calcio
    hipoclorito_con = Column(Numeric(10, 2))
    hipoclorito_ing = Column(Numeric(10, 2))
    hipoclorito_guia = Column(String(50))
    
    # Gas Licuado de Cloro
    cloro_gas_con = Column(Numeric(10, 2))
    cloro_gas_ing_bal = Column(Numeric(10, 2))
    cloro_gas_ing_bdg = Column(Numeric(10, 2))
    cloro_gas_guia = Column(String(50))
    cloro_gas_egre = Column(Numeric(10, 2))
    
    # Producción
    produccion_m3_dia = Column(Numeric(10, 2))
    
    # Resumen mensual
    inicio_mes_kg = Column(Numeric(10, 2))
    ingreso_mes_kg = Column(Numeric(10, 2))
    consumo_mes_kg = Column(Numeric(10, 2))
    egreso_mes_kg = Column(Numeric(10, 2))
    fin_mes_kg = Column(Numeric(10, 2))
    
    observaciones = Column(Text)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relaciones
    usuario = relationship("Usuario", back_populates="consumos_mensuales")
    
    __table_args__ = (
        UniqueConstraint('mes', 'anio', name='uq_mes_anio'),
        CheckConstraint('mes >= 1 AND mes <= 12', name='check_mes_valido'),
    )
    
    def __repr__(self):
        return f"<ConsumoQuimicoMensual(id={self.id}, mes={self.mes}, anio={self.anio})>"
