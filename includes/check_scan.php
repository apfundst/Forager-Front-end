<?php

$con = mysqli_connect("localhost","root","forageme","db_forager");
if (mysqli_connect_errno()){
  echo json_encode("Failed to connect to server.....can you be cool just once! Just once be cool!: " . mysqli_connect_error());
  exit;
}
else{

	$user_id  = $_POST["userId"];

	$rando = mt_rand(0,50);
	$scan_name = "report_".$user_id."_".$rando;

	$scan_running_sql ="
	 		SELECT *
	 		FROM `scan`
	 		WHERE is_running = 1 OR is_started = 1;
	";
		$result = mysqli_query($con,$scan_running_sql);
		$row = mysqli_fetch_assoc($result);
	if( !is_null($row) ){ 
	    // Needs to handle front end message somehow
	    echo json_encode("Already Running");
	    exit;
	}
}
?>