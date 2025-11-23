"""
Schemas Pydantic base para validación de datos
"""

from pydantic import BaseModel, ConfigDict
from datetime import datetime


class BaseSchema(BaseModel):
    """Schema base con configuración común"""
    model_config = ConfigDict(from_attributes=True)


class TimestampMixin(BaseModel):
    """Mixin para incluir timestamps"""
    created_at: datetime
    updated_at: datetime
