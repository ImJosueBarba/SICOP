"""
Schemas Pydantic para el modelo Quimico
"""

from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime
from decimal import Decimal


# Schema base
class QuimicoBase(BaseModel):
    """Schema base de Químico"""
    codigo: str = Field(..., min_length=1, max_length=50)
    nombre: str = Field(..., min_length=1, max_length=100)
    tipo: str = Field(..., max_length=50)
    unidad_medida: str = Field(..., max_length=20)
    peso_por_unidad: Optional[Decimal] = None
    stock_minimo: Optional[int] = None
    stock_actual: int = 0
    proveedor: Optional[str] = Field(None, max_length=100)
    activo: bool = True


# Schema para crear
class QuimicoCreate(QuimicoBase):
    """Schema para crear un nuevo químico"""
    pass


# Schema para actualizar
class QuimicoUpdate(BaseModel):
    """Schema para actualizar un químico existente"""
    codigo: Optional[str] = Field(None, min_length=1, max_length=50)
    nombre: Optional[str] = Field(None, min_length=1, max_length=100)
    tipo: Optional[str] = Field(None, max_length=50)
    unidad_medida: Optional[str] = Field(None, max_length=20)
    peso_por_unidad: Optional[Decimal] = None
    stock_minimo: Optional[int] = None
    stock_actual: Optional[int] = None
    proveedor: Optional[str] = Field(None, max_length=100)
    activo: Optional[bool] = None


# Schema para respuesta
class QuimicoResponse(QuimicoBase):
    """Schema de respuesta con datos completos del químico"""
    id: int
    nivel_stock: str
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


# Schema simplificado
class QuimicoList(BaseModel):
    """Schema simplificado para listado de químicos"""
    id: int
    codigo: str
    nombre: str
    tipo: str
    stock_actual: int
    stock_minimo: Optional[int]
    nivel_stock: str
    activo: bool
    
    model_config = ConfigDict(from_attributes=True)
