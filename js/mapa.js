const key = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYWZhYmFyYWZhQGdtYWlsLmNvbSIsImp0aSI6ImIwMWEzMDk1LTBmZmQtNDk3NC1hNDk1LTgyNmQ4N2Y1NTRmMyIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNzQzMjQyMzc3LCJ1c2VySWQiOiJiMDFhMzA5NS0wZmZkLTQ5NzQtYTQ5NS04MjZkODdmNTU0ZjMiLCJyb2xlIjoiIn0.5nNTwVQaDRyTJTJg-n1Giuvmw8rUQF38Qb_KmPwJkzs";
document.getElementById("barra").addEventListener("input", obtenerResultados);

document.getElementById("barra").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {  
      buscar();  
  }})

async function obtenerResultados()
{
  if(document.getElementById("barra").value != "")
  {
    data = new FormData()
    data.append("search", document.getElementById("barra").value);

    const result = await fetch("php/consultaMunicipios.php", 
    {
      method: "POST",
      body: data,
    });

    data = await result.json();

    document.getElementById("resultados_busqueda").innerHTML = "";

    for(i = 0; i < data.num_registros; i++)
    {
      document.getElementById("resultados_busqueda").innerHTML += "<p class = 'celda_resultado' onclick = 'infoMunicipio(" + data.result[i]["codigo_completo"] +`, "`+data.result[i]["NOMBRE"] + `")'>` + data.result[i]["NOMBRE"] + "</p>";
    }
  }

  else
  {
    document.getElementById("resultados_busqueda").innerHTML = "";
  }
  
}

function buscar()
{
  search = document.getElementById("barra").value;
  if(search != "")
  {
    sessionStorage.setItem("search", search);
    location.replace("html/busqueda.html");
  }
}

function infoMunicipio(id, nombre)
{
  sessionStorage.setItem("id", id);
  sessionStorage.setItem("municipio", nombre);
  location.replace("html/infoMunicipio.html");
}