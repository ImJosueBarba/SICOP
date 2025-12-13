"""
Schemas Pydantic para el modelo Usuario
"""

from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional
from datetime import date, datetime
from models.usuario import UserRole


# Schema base
class UsuarioBase(BaseModel):
    """Schema base de Usuario"""
    nombre: str = Field(..., min_length=1, max_length=100)
    apellido: str = Field(..., min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    telefono: Optional[str] = Field(None, max_length=20)
    activo: bool = True
    fecha_contratacion: Optional[date] = None
    
    # Auth fields
    username: str = Field(..., min_length=3, max_length=50)
    rol: UserRole = UserRole.OPERADOR


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
    rol: Optional[UserRole] = None
    password: Optional[str] = Field(None, min_length=6)


# Schema para respuesta
class UsuarioResponse(UsuarioBase):
    """Schema de respuesta con datos completos del usuario"""
    id: int
    nombre_completo: str
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
    rol: UserRole
    activo: bool
    
    model_config = ConfigDict(from_attributes=True)
