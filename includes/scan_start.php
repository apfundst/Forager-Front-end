<?php
$con = mysqli_connect("localhost","root","forageme","db_forager");
if (mysqli_connect_errno()){
  echo "Failed to connect to server.....can you be cool just once! Just once be cool!: " . mysqli_connect_error();
  exit;
}

$user_id  = $_POST["userId"];
$start_time  = date('Y-m-d H:i:s'); 
$scan_name = "report_".$start_time;

$scan_running_sql ="
 		SELECT *
 		FROM `scan`
 		WHERE is_running = 1 OR is_started = 1;
";
$result = mysqli_store_result($con);
$row = mysqli_fetch_row($result);
if( !is_null($row) ){ 
    // Needs to handle front end message somehow
    exit;
}

//IF max is not set then insert null...
$new_report_sql ="
		INSERT INTO `scan`(`scan_name`,`started_by`,`start_time`)
		VALUES('$scan_name','$user_id','$start_time')
"; 
$result = mysqli_query($con,$new_report_sql);
// Then begin the threading adventure...
// Will need the actual ****.cs file name
exec("CSHARP_MAIN_CRAWLER.exe");
?>