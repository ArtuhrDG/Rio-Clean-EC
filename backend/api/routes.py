# api/routes.py (Actualizado)
from fastapi import APIRouter, File, UploadFile, Form, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime
import uuid

from core.security import verificar_password, crear_token_acceso
from api.dependencies import obtener_usuario_actual, requerir_roles
from db.database import usuarios_db, centro_acopio, contenedores_fijos, alertas_ciudadanas
from services.ai_service import procesar_imagen_basura
from services.routing_service import optimizar_tsp

router = APIRouter()

# --- 1. ENDPOINT DE LOGIN ---
@router.post("/auth/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    usuario = usuarios_db.get(form_data.username)
    
    # Verificamos que el usuario exista y la contraseña sea correcta ("123456")
    if not usuario or not verificar_password(form_data.password, usuario["hashed_password"]):
        raise HTTPException(status_code=400, detail="Usuario o contraseña incorrectos")
    
    # Creamos el token inyectando el username (sub) y el rol
    access_token = crear_token_acceso(data={"sub": usuario["username"], "rol": usuario["rol"]})
    
    return {"access_token": access_token, "token_type": "bearer", "rol": usuario["rol"]}

# --- 2. RUTAS PROTEGIDAS CON RBAC ---

# Solo ADMIN y RECOLECTOR pueden ver el mapa completo del GAD
@router.get("/estado-actual", dependencies=[Depends(requerir_roles(["ADMIN", "RECOLECTOR"]))])
def obtener_mapa():
    return {
        "centro": centro_acopio,
        "contenedores": contenedores_fijos,
        "alertas": alertas_ciudadanas
    }

# Cualquier usuario logueado (Ciudadano, Admin o Recolector) puede reportar
@router.post("/reportar", dependencies=[Depends(requerir_roles(["CIUDADANO", "ADMIN", "RECOLECTOR"]))])
async def crear_reporte(lat: float = Form(...), lng: float = Form(...), foto: UploadFile = File(...)):
    # ... (Mismo código de reportar de antes) ...
    pass 

# ¡Principio de menor privilegio! SOLO el ADMIN del GAD puede ejecutar la optimización de rutas
@router.get("/optimizar-ruta", dependencies=[Depends(requerir_roles(["ADMIN"]))])
def calcular_mejor_ruta():
    ruta = optimizar_tsp(centro_acopio, contenedores_fijos, alertas_ciudadanas)
    return {"status": "success", "ruta_optimizada": ruta}

# (Opcional) Ruta para que la app móvil sepa quién está conectado
@router.get("/auth/me")
def obtener_mi_perfil(current_user: dict = Depends(obtener_usuario_actual)):
    return {"username": current_user["username"], "rol": current_user["rol"], "nombre": current_user["nombre"]}