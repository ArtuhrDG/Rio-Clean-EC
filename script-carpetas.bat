@echo off
color 0A
echo ===================================================
echo    [ AIRON TECHFEST 2026 ] - Setup EcoRuta IA
echo ===================================================
echo.

echo [1/3] Configurando el Backend (FastAPI)...
if not exist "backend" mkdir backend
cd backend

:: Creando archivo de dependencias
echo fastapi > requirements.txt
echo uvicorn >> requirements.txt
echo pydantic >> requirements.txt
echo python-multipart >> requirements.txt

:: Creando el servidor base con CORS habilitado
echo from fastapi import FastAPI > main.py
echo from fastapi.middleware.cors import CORSMiddleware >> main.py
echo import json >> main.py
echo. >> main.py
echo app = FastAPI() >> main.py
echo. >> main.py
echo # Evita bloqueos de seguridad entre el Front (Puerto 5173) y Back (Puerto 8000) >> main.py
echo app.add_middleware( >> main.py
echo     CORSMiddleware, >> main.py
echo     allow_origins=["*"], >> main.py
echo     allow_credentials=True, >> main.py
echo     allow_methods=["*"], >> main.py
echo     allow_headers=["*"], >> main.py
echo ) >> main.py
echo. >> main.py
echo @app.get("/") >> main.py
echo def read_root(): >> main.py
echo     return {"status": "Servidor EcoRuta IA Online"} >> main.py
cd ..

echo.
echo [2/3] Configurando el Frontend...
if not exist "front" mkdir front
echo (Para inicializar React, recuerda entrar a la carpeta 'front' y ejecutar:)
echo npm create vite@latest . -- --template react

echo.
echo [3/3] Creando archivo de datos simulados...
type nul > mock_data.json

echo.
echo ===================================================
echo   ¡Estructura generada exitosamente! A programar.
echo ===================================================
pause