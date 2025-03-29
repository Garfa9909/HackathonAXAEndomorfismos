<?php
  $servername = "localhost";
  $username = "admin";
  $password = "admin123";
  $dbname = "municipiosDB";

  $conn = new mysqli($servername, $username, $password, $dbname);

  $search = $_POST["search"];

  $query = "SELECT NOMBRE FROM municipios WHERE NOMBRE LIKE '%" + $search + "%' LIMIT 5;";
  
  $result = $conn->query($query);

  $query_result = [];

  if($result->numrows > 0)
  {
    while($row = $result->fetch_assoc())
    {
      $query_result[] = $row;
    }
  }

  $response = 
  [
    "num_registros" => $result->numrows
    "result" => $query_result
  ];

  echo json_encode($query_result);

  

  
?>