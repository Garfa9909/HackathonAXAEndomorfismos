import MySQLdb
import requests
from pprint import pprint

# Configuración de la base de datos
DB_HOST = 'localhost'
DB_USER = 'admin'
DB_PASS = 'admin123'
DB_NAME = 'municipiosDB'

def get_municipios(query=''):
    try:
        connection = MySQLdb.connect(
            host=DB_HOST,
            user=DB_USER,
            passwd=DB_PASS,
            db=DB_NAME
        )
        cursor = connection.cursor()
        cursor.execute(query)

        if query.upper().startswith('SELECT'):
            data = cursor.fetchall()
        else:
            connection.commit()
            data = None
        
        cursor.close()
        connection.close()
        return data

    except MySQLdb.Error as e:
        print(f"Error de MySQL: {e}")
        return None

def get_weather_data(codigo_municipio):
    api_key = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYWZhYmFyYWZhQGdtYWlsLmNvbSIsImp0aSI6ImIwMWEzMDk1LTBmZmQtNDk3NC1hNDk1LTgyNmQ4N2Y1NTRmMyIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNzQzMjQyMzc3LCJ1c2VySWQiOiJiMDFhMzA5NS0wZmZkLTQ5NzQtYTQ5NS04MjZkODdmNTU0ZjMiLCJyb2xlIjoiIn0.5nNTwVQaDRyTJTJg-n1Giuvmw8rUQF38Qb_KmPwJkzs"
    headers = {"api_key": api_key}
    url = f"https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/{codigo_municipio}"

    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()  # Lanza excepción para códigos 4XX/5XX
        
        # Verificamos la estructura de la respuesta
        response_data = response.json()
        if 'datos' not in response_data:
            print(f"Respuesta inesperada para municipio {codigo_municipio}:")
            pprint(response_data)
            return None
            
        data_url = response_data['datos']
        data_response = requests.get(data_url, timeout=10)
        data_response.raise_for_status()
        
        return data_response.json()

    except requests.exceptions.RequestException as e:
        print(f"Error en la petición para municipio {codigo_municipio}: {e}")
        return None

def mostrar_municipios():
    query = "SELECT codigo_completo FROM vista_municipios"
    municipios = get_municipios(query)
    
    if not municipios:
        print("No se obtuvieron municipios de la base de datos")
        return
    
    for m in municipios[:5]:  # Limitar a 5 municipios para prueba
        codigo = m[0]  # Extraemos el primer elemento de la tupla
        print(f"\nConsultando datos para municipio: {codigo}")
        
        weather_data = get_weather_data(codigo)
        if weather_data:
            print("Datos meteorológicos:")
            pprint(weather_data)
        else:
            print("No se pudieron obtener datos meteorológicos")

if __name__ == "__main__":
    mostrar_municipios()