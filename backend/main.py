# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import APP_NAME, VERSION
from api.routers import router

app = FastAPI(title=APP_NAME, version=VERSION)

# Configuración vital para que React (puerto 5173) no tenga bloqueos de seguridad
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conectamos nuestras rutas limpias al servidor principal
app.include_router(router, prefix="/api")

@app.get("/")
def raiz():
    return {"mensaje": "API EcoRuta Online y Operativa"}