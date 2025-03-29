<?php

  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  $servername = "localhost";
  $username = "admin";
  $password = "admin123";
  $dbname = "municipiosDB";

  $conn = new mysqli($servername, $username, $password, $dbname);

  $search = $_POST["search"];

  $query = "SELECT NOMBRE, codigo_completo FROM vista_municipios WHERE NOMBRE LIKE '%" . $search . "%' LIMIT 100;";
  
  $result = $conn->query($query);

  $query_result = [];

  $filas = $result->num_rows;

  if($filas > 0)
  {
    while($row = $result->fetch_assoc())
    {
      $query_result[] = $row;
    }
  }

  $response = [
    "num_registros" => $filas,
    "result" => $query_result
  ];

  echo json_encode($response);

  

  
?>