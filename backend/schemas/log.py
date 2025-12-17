"""
Schemas Pydantic para Logs de Auditoría
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class LogAuditoriaBase(BaseModel):
    """Schema base para logs"""
    usuario_id: Optional[int] = None
    usuario_nombre: Optional[str] = None
    accion: str
    entidad: Optional[str] = None
    entidad_id: Optional[int] = None
    detalles: Optional[str] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None


class LogAuditoriaCreate(LogAuditoriaBase):
    """Schema para crear un log"""
    pass


class LogAuditoriaResponse(LogAuditoriaBase):
    """Schema de respuesta de log"""
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class LogAuditoriaFilter(BaseModel):
    """Schema para filtrar logs"""
    usuario_id: Optional[int] = None
    accion: Optional[str] = None
    entidad: Optional[str] = None
    fecha_inicio: Optional[datetime] = None
    fecha_fin: Optional[datetime] = None
    limit: int = 100
    offset: int = 0
