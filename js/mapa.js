const key = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYWZhYmFyYWZhQGdtYWlsLmNvbSIsImp0aSI6ImIwMWEzMDk1LTBmZmQtNDk3NC1hNDk1LTgyNmQ4N2Y1NTRmMyIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNzQzMjQyMzc3LCJ1c2VySWQiOiJiMDFhMzA5NS0wZmZkLTQ5NzQtYTQ5NS04MjZkODdmNTU0ZjMiLCJyb2xlIjoiIn0.5nNTwVQaDRyTJTJg-n1Giuvmw8rUQF38Qb_KmPwJkzs";

async function obtenerResultados()
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
    document.getElementById("resultados_busqueda").innerHTML += "<p>" + data.result[i]["NOMBRE"] + "</p>";
  }

  

}