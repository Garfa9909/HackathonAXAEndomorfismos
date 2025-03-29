import geopandas as gpd
import matplotlib.pyplot as plt
import sys

url = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/spain-provinces.geojson"
provincias = gpd.read_file(url)

# Crear el mapa base
fig, ax = plt.subplots(figsize=(12, 12))

# Dibujar todas las provincias en gris claro
provincias.plot(ax=ax, color='lightgray', edgecolor='black', linewidth=0.5)

# Personalizar el mapa
ax.set_title('Mapa de España por provincias', fontsize=16)
ax.set_axis_off()  # Ocultar ejes

# Función para colorear una provincia específica
def colorear_provincia(codigo, color, ax):
    provincia = provincias[provincias['cod_prov'] == str(codigo)]
    provincia.plot(ax=ax, color=color, edgecolor='black', linewidth=0.5)

def applyColors(colores):
    for codigo, color in colores.items():
        colorear_provincia(codigo, color, ax)

diccionario_colores = {
    '08': 'red',
    '28': 'blue'
}

applyColors(diccionario_colores)

# Guardar el mapa
plt.savefig("../images/mapa.png", dpi=300, bbox_inches='tight')