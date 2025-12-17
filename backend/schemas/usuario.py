"""
Schemas Pydantic para el modelo Usuario
"""

from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional
from datetime import date, datetime
from models.usuario import UserRole
from .rol import RolSimple


# Schema base
class UsuarioBase(BaseModel):
    """Schema base de Usuario"""
    nombre: str = Field(..., min_length=1, max_length=100)
    apellido: str = Field(..., min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    telefono: Optional[str] = Field(None, max_length=20)
    activo: bool = True
    fecha_contratacion: Optional[date] = None
    foto_perfil: Optional[str] = None
    
    # Auth fields
    username: str = Field(..., min_length=3, max_length=50)
    rol_id: int = Field(..., gt=0, description="ID del rol asignado")


# Schema para crear un usuario
class UsuarioCreate(UsuarioBase):
    """Schema para crear un nuevo usuario"""
    password: str = Field(..., min_length=6)


# Schema para actualizar un usuario
class UsuarioUpdate(BaseModel):
    """Schema para actualizar un usuario existente"""
    nombre: Optional[str] = Field(None, min_length=1, max_length=100)
    apellido: Optional[str] = Field(None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    telefono: Optional[str] = Field(None, max_length=20)
    activo: Optional[bool] = None
    fecha_contratacion: Optional[date] = None
    rol_id: Optional[int] = Field(None, gt=0, description="ID del rol asignado")
    password: Optional[str] = Field(None, min_length=6)
    foto_perfil: Optional[str] = None


# Schema para respuesta
class UsuarioResponse(BaseModel):
    """Schema de respuesta con datos completos del usuario"""
    id: int
    nombre: str
    apellido: str
    nombre_completo: str
    username: str
    email: Optional[EmailStr] = None
    telefono: Optional[str] = None
    activo: bool
    fecha_contratacion: Optional[date] = None
    foto_perfil: Optional[str] = None
    rol: RolSimple  # Información del rol
    rol_id: int
    # Mantener compatibilidad con código anterior
    es_administrador: bool
    es_operador: bool
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


# Schema simplificado para listar
class UsuarioList(BaseModel):
    """Schema simplificado para listado de usuarios"""
    id: int
    nombre: str
    apellido: str
    nombre_completo: str
    username: str
    email: Optional[EmailStr] = None
    telefono: Optional[str] = None
    rol: RolSimple  # Información del rol
    rol_id: int
    activo: bool
    
    model_config = ConfigDict(from_attributes=True)
