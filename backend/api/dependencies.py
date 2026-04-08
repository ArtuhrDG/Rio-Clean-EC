# api/dependencies.py
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from core.config import SECRET_KEY, ALGORITHM
from db.database import usuarios_db

# Esto le dice a FastAPI dónde está el endpoint para iniciar sesión
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

async def obtener_usuario_actual(token: str = Depends(oauth2_scheme)):
    credenciales_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciales inválidas",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Decodificamos el token para extraer el username
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credenciales_exception
    except JWTError:
        raise credenciales_exception
    
    # Buscamos al usuario en nuestra "BD"
    user = usuarios_db.get(username)
    if user is None:
        raise credenciales_exception
    
    return user

# --- FÁBRICA DE PERMISOS (RBAC) ---
def requerir_roles(roles_permitidos: list):
    """Devuelve una dependencia que verifica si el usuario tiene un rol autorizado."""
    def verificador_rol(current_user: dict = Depends(obtener_usuario_actual)):
        if current_user["rol"] not in roles_permitidos:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Operación denegada. Se requiere uno de los siguientes roles: {roles_permitidos}"
            )
        return current_user
    return verificador_rol