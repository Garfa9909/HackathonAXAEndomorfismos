async function mostrarResultados()
{
  search = sessionStorage.getItem("search")
  data = new FormData()
  data.append("search", search);

  const result = await fetch("php/busquedaMunicipios.php", 
  {
    method: "POST",
    body: data,
  });

  data = await result.json();

  if(data.num_registros > 0)
  {
    for(i = 0; i < data.num_registros; i++)
    {
      document.getElementById("resultados").innerHTML += "<p class = 'celda_resultado'>" + data.result[i]["NOMBRE"] + "</p>";
    }
  }

  else
  {
    document.getElementById("resultados").innerHTML = "No hay resultados para ";
  }
}