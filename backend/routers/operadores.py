"""
Router para operaciones CRUD de Operadores
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models.operador import Operador
from schemas.operador import (
    OperadorCreate,
    OperadorUpdate,
    OperadorResponse,
    OperadorList
)

router = APIRouter()


@router.get("/", response_model=List[OperadorList])
def get_operadores(
    skip: int = 0,
    limit: int = 100,
    activo: bool = None,
    db: Session = Depends(get_db)
):
    """Obtener lista de operadores"""
    query = db.query(Operador)
    
    if activo is not None:
        query = query.filter(Operador.activo == activo)
    
    operadores = query.offset(skip).limit(limit).all()
    return operadores


@router.get("/{operador_id}", response_model=OperadorResponse)
def get_operador(operador_id: int, db: Session = Depends(get_db)):
    """Obtener un operador por ID"""
    operador = db.query(Operador).filter(Operador.id == operador_id).first()
    
    if not operador:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Operador con ID {operador_id} no encontrado"
        )
    
    return operador


@router.post("/", response_model=OperadorResponse, status_code=status.HTTP_201_CREATED)
def create_operador(operador: OperadorCreate, db: Session = Depends(get_db)):
    """Crear un nuevo operador"""
    # Verificar si el email ya existe
    if operador.email:
        existing = db.query(Operador).filter(Operador.email == operador.email).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El email ya está registrado"
            )
    
    db_operador = Operador(**operador.model_dump())
    db.add(db_operador)
    db.commit()
    db.refresh(db_operador)
    return db_operador


@router.put("/{operador_id}", response_model=OperadorResponse)
def update_operador(
    operador_id: int,
    operador: OperadorUpdate,
    db: Session = Depends(get_db)
):
    """Actualizar un operador existente"""
    db_operador = db.query(Operador).filter(Operador.id == operador_id).first()
    
    if not db_operador:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Operador con ID {operador_id} no encontrado"
        )
    
    # Actualizar solo los campos proporcionados
    update_data = operador.model_dump(exclude_unset=True)
    
    # Verificar email duplicado
    if "email" in update_data and update_data["email"]:
        existing = db.query(Operador).filter(
            Operador.email == update_data["email"],
            Operador.id != operador_id
        ).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El email ya está registrado"
            )
    
    for key, value in update_data.items():
        setattr(db_operador, key, value)
    
    db.commit()
    db.refresh(db_operador)
    return db_operador


@router.delete("/{operador_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_operador(operador_id: int, db: Session = Depends(get_db)):
    """Eliminar un operador (soft delete)"""
    db_operador = db.query(Operador).filter(Operador.id == operador_id).first()
    
    if not db_operador:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Operador con ID {operador_id} no encontrado"
        )
    
    # Soft delete: marcar como inactivo en lugar de eliminar
    db_operador.activo = False
    db.commit()
    return None
