# core/config.py
import os
from dotenv import load_dotenv

# Carga las variables desde el archivo .env a las variables de entorno del sistema
load_dotenv()

# --- EXTRACCIÓN SEGURA DE CREDENCIALES ---
ROBOFLOW_API_KEY = os.getenv("ROBOFLOW_API_KEY")
ROBOFLOW_MODEL = os.getenv("ROBOFLOW_MODEL", "modelo-por-defecto/1") 

# Validación de seguridad para que la app no arranque si falta la llave
if not ROBOFLOW_API_KEY:
    print("⚠️ ADVERTENCIA: No se encontró ROBOFLOW_API_KEY en el archivo .env")

# Construcción de la URL
ROBOFLOW_URL = f"https://detect.roboflow.com/{ROBOFLOW_MODEL}?api_key={ROBOFLOW_API_KEY}"

# --- NUEVO: CONFIGURACIÓN JWT ---
SECRET_KEY = os.getenv("SECRET_KEY", "super_secreto_hackathon_2026") # Cambiar en prod
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# --- CONFIGURACIÓN DE LA APP ---
APP_NAME = "EcoRuta IA API"
VERSION = "1.0.0"