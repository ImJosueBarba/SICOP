"""
Router para gestión de roles
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from core.database import get_db
from core.dependencies import get_current_active_user
from models.usuario import Usuario
from models.rol import Rol
from schemas.rol import RolCreate, RolUpdate, RolResponse, RolSimple

router = APIRouter(prefix="/api/roles", tags=["Roles"])


def verificar_admin(current_user: Usuario = Depends(get_current_active_user)):
    """Verifica que el usuario actual sea administrador"""
    if not current_user.rol_obj or current_user.rol_obj.categoria != "ADMINISTRADOR":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permisos para realizar esta acción"
        )
    return current_user


@router.get("/", response_model=List[RolSimple])
def listar_roles(
    activo: Optional[bool] = None,
    categoria: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_active_user)
):
    """
    Obtener lista de roles
    - Opcionalmente filtrar por estado activo
    - Opcionalmente filtrar por categoría
    """
    query = db.query(Rol)
    
    if activo is not None:
        query = query.filter(Rol.activo == activo)
    
    if categoria:
        query = query.filter(Rol.categoria == categoria)
    
    roles = query.order_by(Rol.nivel_jerarquia, Rol.nombre).all()
    return roles


@router.get("/{rol_id}", response_model=RolResponse)
def obtener_rol(
    rol_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_active_user)
):
    """Obtener detalles de un rol específico"""
    rol = db.query(Rol).filter(Rol.id == rol_id).first()
    
    if not rol:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Rol no encontrado"
        )
    
    return rol


@router.post("/", response_model=RolResponse, status_code=status.HTTP_201_CREATED)
def crear_rol(
    rol_data: RolCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(verificar_admin)
):
    """Crear un nuevo rol (solo administradores)"""
    # Verificar que el código no exista
    existe = db.query(Rol).filter(Rol.codigo == rol_data.codigo).first()
    if existe:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ya existe un rol con el código '{rol_data.codigo}'"
        )
    
    # Crear el nuevo rol
    nuevo_rol = Rol(**rol_data.model_dump())
    db.add(nuevo_rol)
    db.commit()
    db.refresh(nuevo_rol)
    
    return nuevo_rol


@router.put("/{rol_id}", response_model=RolResponse)
def actualizar_rol(
    rol_id: int,
    rol_data: RolUpdate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(verificar_admin)
):
    """Actualizar un rol existente (solo administradores)"""
    rol = db.query(Rol).filter(Rol.id == rol_id).first()
    
    if not rol:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Rol no encontrado"
        )
    
    # Si se intenta cambiar el código, verificar que no exista
    if rol_data.codigo and rol_data.codigo != rol.codigo:
        existe = db.query(Rol).filter(
            Rol.codigo == rol_data.codigo,
            Rol.id != rol_id
        ).first()
        if existe:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Ya existe un rol con el código '{rol_data.codigo}'"
            )
    
    # Actualizar campos
    update_data = rol_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(rol, field, value)
    
    db.commit()
    db.refresh(rol)
    
    return rol


@router.delete("/{rol_id}", status_code=status.HTTP_200_OK)
def desactivar_rol(
    rol_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(verificar_admin)
):
    """
    Desactivar un rol (no se elimina, solo se marca como inactivo)
    Solo administradores
    """
    rol = db.query(Rol).filter(Rol.id == rol_id).first()
    
    if not rol:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Rol no encontrado"
        )
    
    # Verificar que no haya usuarios con este rol activos
    usuarios_activos = db.query(Usuario).filter(
        Usuario.rol_id == rol_id,
        Usuario.activo == True
    ).count()
    
    if usuarios_activos > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"No se puede desactivar el rol porque tiene {usuarios_activos} usuario(s) activo(s)"
        )
    
    rol.activo = False
    db.commit()
    
    return {"message": f"Rol '{rol.nombre}' desactivado exitosamente"}


@router.get("/categoria/{categoria}", response_model=List[RolSimple])
def listar_roles_por_categoria(
    categoria: str,
    activo: Optional[bool] = True,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_active_user)
):
    """Obtener roles de una categoría específica"""
    query = db.query(Rol).filter(Rol.categoria == categoria.upper())
    
    if activo is not None:
        query = query.filter(Rol.activo == activo)
    
    roles = query.order_by(Rol.nivel_jerarquia, Rol.nombre).all()
    return roles
