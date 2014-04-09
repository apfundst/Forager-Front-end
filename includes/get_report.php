<?php
$post_id = $POST('report1');

session_start();
$con = mysqli_connect("localhost","root","forageme","forager");
if (mysqli_connect_errno()){
  echo "Failed to connect to server.....can you be cool just once! Just once be cool!: " . mysqli_connect_error();
  exit;
}

$post_id = mysqli_real_escape_string($con,$report);
get_report_data($post_id);
get_graph_data($post_id);

//query database for scan data
function get_report_data($report_id)
{
	$report_id = mysqli_real_escape_string($con,$report_id);

	$sql = "
	SELECT *
	FROM `url`
	WHERE '$report_id' = scan_id
	";
	
	$result = mysqli_query($con,$sql);
	$row = mysqli_fetch_array($result, MYSQLI_BOTH);
	
	if(!is_null($row))
	{
		while($temp = mysqli_fetch_assoc($result))
		{
			$arr[] = $temp;
		}
		echo json_encode((array)$arr)
	}
	else
	{
		echo "400";
	}
}

//graph data
//number of total errors
//scan time
//total links scanned
function get_graph_data()
{
	$report_id = mysqli_real_escape_string($con,$report_id);

	$sql = "
	SELECT number_errors, pages_scanned, start_time, stop_time
	FROM `url`
	WHERE '$report_id' = scan_id
	";
	
	$result = mysqli_query($con,$sql);
	$row = mysqli_fetch_array($result, MYSQLI_BOTH);
	
	if(!is_null($row))
	{
		while($temp = mysqli_fetch_assoc($result))
		{
			$arr[] = $temp;
		}
		echo json_encode((array)$arr)
	}
	else
	{
		echo "400";
	}
}

?>