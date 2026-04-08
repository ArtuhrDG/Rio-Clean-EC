# services/routing_service.py
import math

def calcular_distancia(p1: dict, p2: dict) -> float:
    return math.sqrt((p1['lat'] - p2['lat'])**2 + (p1['lng'] - p2['lng'])**2)

def optimizar_tsp(centro: dict, contenedores: list, alertas: list) -> list:
    """Algoritmo del Vecino Más Cercano."""
    puntos_pendientes = contenedores + alertas
    if not puntos_pendientes:
        return [centro]

    ruta = [centro]
    actual = centro
    visitados = set()

    while len(visitados) < len(puntos_pendientes):
        mas_cercano = None
        min_dist = float('inf')

        for punto in puntos_pendientes:
            if punto['id'] not in visitados:
                dist = calcular_distancia(actual, punto)
                if dist < min_dist:
                    min_dist = dist
                    mas_cercano = punto

        visitados.add(mas_cercano['id'])
        ruta.append(mas_cercano)
        actual = mas_cercano

    ruta.append(centro) # Regreso a la base
    return ruta