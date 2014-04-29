<?php

$con = mysqli_connect("localhost","root","forageme","db_forager");
if (mysqli_connect_errno()){
  echo json_encode("Failed to connect to server.....can you be cool just once! Just once be cool!: " . mysqli_connect_error());
  exit;
}
else{

	$user_id  = $_POST["userId"];

	$rando = mt_rand(0,50);
	$scan_name = "report_".$user_id;

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

	//IF max is not set then insert null...
	$new_report_sql ="
			INSERT INTO `scan` (`scan_name`, `started_by`,`start_time`)
			VALUES ('$scan_name','$user_id', CURRENT_TIMESTAMP );
	"; 
	$result = mysqli_query($con, $new_report_sql);
	if($result == TRUE){
		echo json_encode("Success");
		shell_exec('start C:/inetpub/wwwroot/forager/includes/CSHARP_MAIN_CRAWLER.exe');
	}else{
	// Then begin the threading adventure...
	// Will need the actual ****.cs file name
	echo json_encode($result);
}
}
?>