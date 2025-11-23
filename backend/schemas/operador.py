"""
Schemas Pydantic para el modelo Operador
"""

from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional
from datetime import date, datetime


# Schema base
class OperadorBase(BaseModel):
    """Schema base de Operador"""
    nombre: str = Field(..., min_length=1, max_length=100)
    apellido: str = Field(..., min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    telefono: Optional[str] = Field(None, max_length=20)
    activo: bool = True
    fecha_contratacion: Optional[date] = None


# Schema para crear un operador
class OperadorCreate(OperadorBase):
    """Schema para crear un nuevo operador"""
    pass


# Schema para actualizar un operador
class OperadorUpdate(BaseModel):
    """Schema para actualizar un operador existente"""
    nombre: Optional[str] = Field(None, min_length=1, max_length=100)
    apellido: Optional[str] = Field(None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    telefono: Optional[str] = Field(None, max_length=20)
    activo: Optional[bool] = None
    fecha_contratacion: Optional[date] = None


# Schema para respuesta
class OperadorResponse(OperadorBase):
    """Schema de respuesta con datos completos del operador"""
    id: int
    nombre_completo: str
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


# Schema simplificado para listar
class OperadorList(BaseModel):
    """Schema simplificado para listado de operadores"""
    id: int
    nombre: str
    apellido: str
    nombre_completo: str
    activo: bool
    
    model_config = ConfigDict(from_attributes=True)
