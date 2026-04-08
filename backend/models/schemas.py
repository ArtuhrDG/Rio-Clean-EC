# models/schemas.py
from pydantic import BaseModel
from typing import List

class PuntoGps(BaseModel):
    id: str
    lat: float
    lng: float

class Contenedor(PuntoGps):
    tipo: str

class AlertaCiudadana(PuntoGps):
    fecha: str
    tipo_residuo: str
    confianza_ia: float

class EstadoMapa(BaseModel):
    centro: PuntoGps
    contenedores: List[Contenedor]
    alertas: List[AlertaCiudadana]