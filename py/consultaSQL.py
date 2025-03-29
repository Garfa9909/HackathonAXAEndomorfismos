import MySQLdb

DB_HOST = 'localhost'
DB_USER = 'admin'
DB_PASS = 'admin123'
DB_NAME = 'municipiosDB'

def get_municipios(query=''):
    datos = [DB_HOST, DB_USER, DB_PASS, DB_NAME]
    connection = MySQLdb.connect(*datos)
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

query = "SELECT codigo_completo FROM vista_municipios"
municipios = get_municipios(query)

import requests
def mostrar_municipio(codigo_municipio):
    api_key = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYWZhYmFyYWZhQGdtYWlsLmNvbSIsImp0aSI6ImIwMWEzMDk1LTBmZmQtNDk3NC1hNDk1LTgyNmQ4N2Y1NTRmMyIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNzQzMjQyMzc3LCJ1c2VySWQiOiJiMDFhMzA5NS0wZmZkLTQ5NzQtYTQ5NS04MjZkODdmNTU0ZjMiLCJyb2xlIjoiIn0.5nNTwVQaDRyTJTJg-n1Giuvmw8rUQF38Qb_KmPwJkzs"
    headers = {"api_key": api_key}
    url = f"https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/{codigo_municipio}"  # 28079 es Madrid

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data_url = response.json()['datos']  # Extrae la URL con los datos
        data_response = requests.get(data_url)
        print(data_response.json())  # Muestra los datos meteorológicos
    else:
        print("Error:", response.status_code, response.text)

def mostrar_municipios():
    for m in municipios[:1]:
        mostrar_municipio(m)

mostrar_municipios()