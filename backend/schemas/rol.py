"""
Schemas Pydantic para Roles
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class RolBase(BaseModel):
    """Schema base de Rol"""
    codigo: str = Field(..., max_length=50, description="Código único del rol")
    nombre: str = Field(..., max_length=100, description="Nombre descriptivo del rol")
    descripcion: Optional[str] = Field(None, description="Descripción detallada del rol")
    nivel_jerarquia: int = Field(..., ge=1, le=10, description="Nivel jerárquico (1=más alto)")
    categoria: str = Field(..., max_length=20, description="Categoría: ADMINISTRADOR, JEFATURA, SUPERVISOR, OPERADOR")
    activo: bool = Field(default=True, description="Estado activo del rol")


class RolCreate(RolBase):
    """Schema para crear un rol"""
    pass


class RolUpdate(BaseModel):
    """Schema para actualizar un rol"""
    codigo: Optional[str] = Field(None, max_length=50)
    nombre: Optional[str] = Field(None, max_length=100)
    descripcion: Optional[str] = None
    nivel_jerarquia: Optional[int] = Field(None, ge=1, le=10)
    categoria: Optional[str] = Field(None, max_length=20)
    activo: Optional[bool] = None


class RolResponse(RolBase):
    """Schema de respuesta de Rol"""
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class RolSimple(BaseModel):
    """Schema simplificado de Rol para listas"""
    id: int
    codigo: str
    nombre: str
    categoria: str
    nivel_jerarquia: int
    activo: bool

    class Config:
        from_attributes = True
