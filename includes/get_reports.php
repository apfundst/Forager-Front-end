<?php
$con = mysqli_connect("localhost","root","forageme","db_forager");
if (mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
 }

$sql = "
	SELECT *
	FROM `scan`
	
";

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