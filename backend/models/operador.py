"""
Modelo de Operadores de la planta
"""

from datetime import datetime
import enum
from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime, Enum
from sqlalchemy.orm import relationship
from . import Base


class UserRole(str, enum.Enum):
    ADMIN = "ADMIN"
    VISUALIZADOR = "VISUALIZADOR"
    OPERADOR = "OPERADOR"


class Operador(Base):
    """Modelo de Operadores de la planta"""
    __tablename__ = "operadores"
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    apellido = Column(String(100), nullable=False)
    email = Column(String(100), unique=True)
    telefono = Column(String(20))
    activo = Column(Boolean, default=True)
    fecha_contratacion = Column(Date)
    
    # Campos de Autenticación
    username = Column(String(50), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    rol = Column(Enum(UserRole), default=UserRole.OPERADOR)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relaciones
    controles_operacion = relationship("ControlOperacion", back_populates="operador")
    producciones_filtros = relationship("ProduccionFiltro", back_populates="operador")
    consumos_diarios = relationship("ControlConsumoDiario", back_populates="operador")
    controles_cloro = relationship("ControlCloroLibre", back_populates="operador")
    monitoreos = relationship("MonitoreoFisicoquimico", back_populates="operador")
    consumos_mensuales = relationship("ConsumoQuimicoMensual", back_populates="operador")
    
    def __repr__(self):
        return f"<Operador(id={self.id}, nombre='{self.nombre} {self.apellido}')>"
    
    @property
    def nombre_completo(self):
        """Retorna el nombre completo del operador"""
        return f"{self.nombre} {self.apellido}"
