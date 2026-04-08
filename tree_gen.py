import os 

exclude = set(['node_modules', '.git', 'venv', '__pycache__', '.vite', 'dist', '.env']) 
out_file = 'estructura_proyecto.txt'

print("Escaneando el proyecto de forma segura...")

with open(out_file, 'w', encoding='utf-8') as f: 
    for root, dirs, files in os.walk('.'): 
        # Ignorar las carpetas pesadas
        dirs[:] = [d for d in dirs if d not in exclude] 
        
        level = root.replace('.', '').count(os.sep) 
        indent = '    ' * level 
        folder_name = os.path.basename(root) if root != '.' else 'Rio-Clean-EC (Raiz)' 
        
        # Escribir la carpeta
        f.write(f'{indent}|-- {folder_name}/\n') 
        
        # Escribir los archivos dentro de la carpeta
        subindent = '    ' * (level + 1) 
        for file in files: 
            # Ignorar los scripts generadores para que no salgan en el mapa
            if file not in ['generar_arbol.py', out_file, 'generar_arbol.bat']: 
                f.write(f'{subindent}|-- {file}\n')

print(f"¡ÉXITO! Tu estructura limpia se ha guardado en: {out_file}")