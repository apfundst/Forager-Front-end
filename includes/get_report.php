<?php
$post_id = $POST('pid');
//interact with the database

session_start();
$con = mysqli_connect("localhost","root","forageme","forager");
if (mysqli_connect_errno()){
  echo "Failed to connect to server.....can you be cool just once! Just once be cool!: " . mysqli_connect_error();
  exit;
}

//query database for this data
//domains
//subdomains
//errors

//graph data
//number of total errors
//scan time
//good links
//total links scanned

?>