# db/database.py

# Coordenadas iniciales (Centro de acopio GAD Riobamba)
centro_acopio = {"id": "base_0", "lat": -1.6651, "lng": -78.6502, "nombre": "GAD Riobamba"}

contenedores_fijos = [
    {"id": "c_1", "tipo": "Normal", "lat": -1.6685, "lng": -78.6481},
    {"id": "c_2", "tipo": "Reciclaje", "lat": -1.6712, "lng": -78.6534}
]

# Lista dinámica donde se guardarán los reportes
alertas_ciudadanas = []

# db/database.py (Añadir al final)

# Hash bcrypt de la contraseña "123456"
HASH_123456 = "$2b$12$L9.zVbH1Y.8j/xK3.1X/Z.5qjKxYpY.8j/xK3.1X/Z.5qjKxYpY."

# Simulamos la tabla de usuarios con sus respectivos ROLES
usuarios_db = {
    "admin_gad": {
        "username": "admin_gad",
        "hashed_password": HASH_123456,
        "rol": "ADMIN",
        "nombre": "Gestor Ambiental GAD"
    },
    "chofer_01": {
        "username": "chofer_01",
        "hashed_password": HASH_123456,
        "rol": "RECOLECTOR",
        "nombre": "Unidad Sur 01"
    },
    "ciudadano_01": {
        "username": "ciudadano_01",
        "hashed_password": HASH_123456,
        "rol": "CIUDADANO",
        "nombre": "Arturo - Barrio La Condamine"
    }
}