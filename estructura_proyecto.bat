@echo off
color 0A
echo ===================================================
echo   Generador de Estructura (Modo Hackathon)
echo ===================================================
echo.
echo Escaneando el proyecto y evitando carpetas pesadas...

set "OUT_FILE=estructura_proyecto.txt"

:: Creamos un script de Python temporal al vuelo
echo import os > tree_gen.py
echo exclude = set(['node_modules', '.git', 'venv', '__pycache__', '.vite', 'dist']) >> tree_gen.py
echo with open('%OUT_FILE%', 'w', encoding='utf-8') as f: >> tree_gen.py
echo     for root, dirs, files in os.walk('.'): >> tree_gen.py
echo         dirs[:] = [d for d in dirs if d not in exclude] >> tree_gen.py
echo         level = root.replace('.', '').count(os.sep) >> tree_gen.py
echo         indent = '    ' * level >> tree_gen.py
echo         folder_name = os.path.basename(root) if root != '.' else 'Rio-Clean-EC (Raiz)' >> tree_gen.py
echo         f.write(f'{indent}|-- {folder_name}/\n') >> tree_gen.py
echo         subindent = '    ' * (level + 1) >> tree_gen.py
echo         for file in files: >> tree_gen.py
echo             if file != 'tree_gen.py' and file != '%OUT_FILE%' and file != 'generar_arbol.bat': >> tree_gen.py
echo                 f.write(f'{subindent}|-- {file}\n') >> tree_gen.py

:: Ejecutamos el script usando tu entorno de Python y luego lo borramos
python tree_gen.py
del tree_gen.py

echo.
echo [EXITO] El mapa de tu proyecto se ha guardado en: %OUT_FILE%
echo.
pause