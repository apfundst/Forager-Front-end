<?php
$scan_id = $_POST['scanId'];
$func_id = $_POST['funcId'];

$con = mysqli_connect("localhost","root","forageme","db_forager");
if (mysqli_connect_errno()){
  echo "Failed to connect to server.....can you be cool just once! Just once be cool!: " . mysqli_connect_error();
  exit;
}

// query database for scan data
// get_report_data
if( $func_id == 1){
	$sql = "
		SELECT scan_name, start_time, stop_time, pages_scanned, number_errors
		FROM `scan`
		WHERE scan_id = '$scan_id';
	";
	
	$result = mysqli_query($con,$sql);
	$row = mysqli_fetch_array($result, MYSQLI_BOTH);
	
	$scan_name = $row["scan_name"];
	$start_time = $row["start_time"];
	$stop_time =  $row["stop_time"];
	$pages_scanned = $row["pages_scanned"];
	$number_errors = $row["number_errors"];

	// Calculate Elapsed Time
	$elapsed_time = date_diff($stop_time, $start_time);
	$elapsed_time->format('%h:%i:%s'); 
	//Calculate AVG errors per page
	$avg_errors_per_page = $number_errors/$pages_scanned;
	//Calculate Percent Pages with Errors
	//$pages_with_errors = $pages_scanned/$number_errors);
	
	$arr = array($scan_name, $start_time,$stop_time, $elapsed_time, $pages_scanned, $number_errors, $avg_errors_per_page);	
	echo json_encode((array)$arr);	
}
// query database for other data
// get_url_data
// url, domain, status_code, status_code_message,
if( $func_id == 2 ){
	$table = "url" . $scan_id;
	$sql = "
		SELECT url, domain, status_code, status_code_type
		FROM `'$table'`
	";
	
	$result = mysqli_query($con,$sql);
	$arr = array();
	while( $row = mysqli_fetch_assoc($result)  ){
		$arr[] = $row;
	}
	echo json_encode((array)$arr);
}
 
?>