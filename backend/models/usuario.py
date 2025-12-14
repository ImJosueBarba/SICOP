"""
Modelo de Usuarios del sistema
"""

from datetime import datetime
import enum
from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime, Enum
from sqlalchemy.orm import relationship
from . import Base


class UserRole(str, enum.Enum):
    """Roles de usuario en el sistema"""
    ADMINISTRADOR = "ADMINISTRADOR"
    OPERADOR = "OPERADOR"


class Usuario(Base):
    """Modelo de Usuarios del sistema"""
    __tablename__ = "usuarios"
    
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
    rol = Column(Enum(UserRole, name='userole', create_type=False), default=UserRole.OPERADOR, nullable=False)
    foto_perfil = Column(String(500), nullable=True)  # URL o ruta de la foto de perfil
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relaciones
    controles_operacion = relationship("ControlOperacion", back_populates="usuario")
    producciones_filtros = relationship("ProduccionFiltro", back_populates="usuario")
    consumos_diarios = relationship("ControlConsumoDiario", back_populates="usuario")
    controles_cloro = relationship("ControlCloroLibre", back_populates="usuario")
    monitoreos = relationship("MonitoreoFisicoquimico", back_populates="usuario")
    consumos_mensuales = relationship("ConsumoQuimicoMensual", back_populates="usuario")
    
    def __repr__(self):
        return f"<Usuario(id={self.id}, nombre='{self.nombre} {self.apellido}', rol='{self.rol.value}')>"
    
    @property
    def nombre_completo(self):
        """Retorna el nombre completo del usuario"""
        return f"{self.nombre} {self.apellido}"
    
    @property
    def es_administrador(self):
        """Verifica si el usuario es administrador"""
        return self.rol == UserRole.ADMINISTRADOR
    
    @property
    def es_operador(self):
        """Verifica si el usuario es operador"""
        return self.rol == UserRole.OPERADOR
