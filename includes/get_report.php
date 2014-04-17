<?php
$scan_id = $_POST('id');

$con = mysqli_connect("localhost","root","forageme","forager");
if (mysqli_connect_errno()){
  echo "Failed to connect to server.....can you be cool just once! Just once be cool!: " . mysqli_connect_error();
  exit;
}

//query database for scan data
function get_report_data($scan_id)
{
	$table = "url" . $post_id;


	$sql = "
		SELECT start_time, stop_time, pages_scanned, number_errors
		FROM `scan`
		WHERE scan_id = '$scan_id';
	";
	
	$result = mysqli_query($con,$sql);
	$row = mysqli_fetch_array($result, MYSQLI_BOTH);
	
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
	$pages_with_errors = $pages_scanned/$number_errors)

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