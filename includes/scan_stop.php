<?php
$con = mysqli_connect("localhost","root","forageme","db_forager");
if (mysqli_connect_errno()){
  echo "Failed to connect to server.....can you be cool just once! Just once be cool!: " . mysqli_connect_error();
  exit;
}

$scan_stop_sql ="
 		UPDATE `scan`
 		SET is_started = 0; 
";
$result = mysqli_query($con,$scan_stop_sql);
?>