<?php
	$scan_id1 = $_POST["rp1"];
	$scan_id2 = $_POST["rp2"];

	session_start();
	$con = mysqli_connect("localhost","root","forageme","forager");
	if (mysqli_connect_errno()){
	  echo "Failed to connect to server" . mysqli_connect_error();
	  exit;
	}

	//query database for ALL scan data
	$scan_id1 = mysqli_real_escape_string($con,$scan_id1);
	$scan_id2 = mysqli_real_escape_string($con,$scan_id2);

	$table1 = "url" . $scan_id1;
	$table2 = "url" . $scan_id2;

	$sql = "
		SELECT *
		FROM `'$table1'`
		INNER JOIN `'$table2'`
		ON '$table1'.url = '$table2'.url
		GROUP BY '$table1'.domain ORDER BY '$table1'.url DESC;
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
		
	}	
?>