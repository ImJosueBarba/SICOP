"""
Modelo de Logs de Auditoría del sistema
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from . import Base


class LogAuditoria(Base):
    """Modelo de Logs de Auditoría para rastrear todas las acciones del sistema"""
    __tablename__ = "logs_auditoria"
    
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey('usuarios.id', ondelete='SET NULL'), nullable=True)
    usuario_nombre = Column(String(200), nullable=True)  # Guardamos nombre por si se elimina el usuario
    accion = Column(String(50), nullable=False, index=True)  # LOGIN, LOGOUT, CREATE, UPDATE, DELETE
    entidad = Column(String(100), nullable=True, index=True)  # usuarios, control_operacion, etc.
    entidad_id = Column(Integer, nullable=True)  # ID del registro afectado
    detalles = Column(Text, nullable=True)  # JSON con detalles adicionales
    ip_address = Column(String(50), nullable=True)
    user_agent = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    # Relación con usuario (opcional, puede ser NULL si el usuario fue eliminado)
    # usuario = relationship("Usuario", back_populates="logs")
    
    def __repr__(self):
        return f"<LogAuditoria(id={self.id}, usuario='{self.usuario_nombre}', accion='{self.accion}', entidad='{self.entidad}')>"
