<?php
$con = mysqli_connect("localhost","root","forageme","db_forager");
if (mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
 }

// Get errors from a scan
function()
$scan_id = $_POST[" "];

$sql = "
	SELECT 
	FROM `scan`
	WHERE scan_id = '$scan_id'
";


// Update scan table is_running goes to zero



$arr = array();
$result = mysqli_query($con,$sql);
if( !is_null($result) ){
	while($temp = mysqli_fetch_assoc($result) ){
		$arr[] = $temp;
	}
	echo json_encode((array)$arr);
}
else{
	echo "400";
}

?>