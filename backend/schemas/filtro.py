"""
Schemas Pydantic para el modelo Filtro
"""

from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import date, datetime
from decimal import Decimal


# Schema base
class FiltroBase(BaseModel):
    """Schema base de Filtro"""
    numero: int = Field(..., ge=1, le=6)
    nombre: str = Field(..., min_length=1, max_length=50)
    capacidad_maxima: Optional[Decimal] = None
    altura_maxima: Optional[Decimal] = None
    fecha_instalacion: Optional[date] = None
    estado: str = Field(default="OPERATIVO", max_length=20)
    ultima_limpieza: Optional[date] = None
    activo: bool = True


# Schema para crear
class FiltroCreate(FiltroBase):
    """Schema para crear un nuevo filtro"""
    pass


# Schema para actualizar
class FiltroUpdate(BaseModel):
    """Schema para actualizar un filtro existente"""
    numero: Optional[int] = Field(None, ge=1, le=6)
    nombre: Optional[str] = Field(None, min_length=1, max_length=50)
    capacidad_maxima: Optional[Decimal] = None
    altura_maxima: Optional[Decimal] = None
    fecha_instalacion: Optional[date] = None
    estado: Optional[str] = Field(None, max_length=20)
    ultima_limpieza: Optional[date] = None
    activo: Optional[bool] = None


# Schema para respuesta
class FiltroResponse(FiltroBase):
    """Schema de respuesta con datos completos del filtro"""
    id: int
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


# Schema simplificado
class FiltroList(BaseModel):
    """Schema simplificado para listado de filtros"""
    id: int
    numero: int
    nombre: str
    estado: str
    activo: bool
    
    model_config = ConfigDict(from_attributes=True)
