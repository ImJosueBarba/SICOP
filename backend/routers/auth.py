
from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session, joinedload

from core.database import get_db
from core.security import create_access_token, verify_password
from models.usuario import Usuario
from models.log import LogAuditoria
from schemas.auth import Token
from schemas.usuario import UsuarioResponse
from core.dependencies import get_current_active_user

router = APIRouter()


def create_log(
    db: Session,
    usuario_id: int,
    usuario_nombre: str,
    accion: str,
    entidad: str = None,
    entidad_id: int = None,
    detalles: str = None,
    ip_address: str = None,
    user_agent: str = None
):
    """Función auxiliar para crear logs"""
    log = LogAuditoria(
        usuario_id=usuario_id,
        usuario_nombre=usuario_nombre,
        accion=accion,
        entidad=entidad,
        entidad_id=entidad_id,
        detalles=detalles,
        ip_address=ip_address,
        user_agent=user_agent
    )
    db.add(log)
    db.commit()


@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    request: Request,
    db: Session = Depends(get_db)
):
    user = db.query(Usuario).options(joinedload(Usuario.rol_obj)).filter(Usuario.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        # Registrar intento fallido de login
        if user:
            create_log(
                db=db,
                usuario_id=user.id,
                usuario_nombre=f"{user.nombre} {user.apellido}",
                accion="LOGIN_FAILED",
                entidad=user.username,
                entidad_id=user.id,
                detalles=f"Intento fallido de inicio de sesión para usuario: {form_data.username}",
                ip_address=request.client.host if request.client else None,
                user_agent=request.headers.get("user-agent")
            )
        
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Registrar login exitoso
    create_log(
        db=db,
        usuario_id=user.id,
        usuario_nombre=f"{user.nombre} {user.apellido}",
        accion="LOGIN",
        entidad=user.username,
        entidad_id=user.id,
        detalles=f"Inicio de sesión exitoso",
        ip_address=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent")
    )
    
    access_token_expires = timedelta(minutes=60 * 24) # 24 hours
    access_token = create_access_token(
        subject=user.username, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UsuarioResponse)
async def read_users_me(current_user: Annotated[Usuario, Depends(get_current_active_user)]):
    return current_user
