"""
Modelo SQLAlchemy para Roles
Sistema de roles jerárquico para la Planta La Esperanza
"""

from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, Text
from sqlalchemy.sql import func
from . import Base


class Rol(Base):
    """Modelo de Rol con jerarquía y categorías"""
    
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String(50), unique=True, nullable=False, index=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(Text, nullable=True)
    nivel_jerarquia = Column(Integer, nullable=False, index=True)
    categoria = Column(String(20), nullable=False, index=True)
    activo = Column(Boolean, default=True, nullable=False, index=True)
    created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)

    def __repr__(self):
        return f"<Rol(codigo='{self.codigo}', nombre='{self.nombre}', categoria='{self.categoria}')>"
