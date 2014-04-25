<?php
	$scan_id1 = $_POST["rp1"];

	$con = mysqli_connect("localhost","root","forageme","db_forager");
	if (mysqli_connect_errno()){
	  echo "Failed to connect to server" . mysqli_connect_error();
	  exit;
	}

	$table1 = "url" . $scan_id1;

	$sql = "
		SELECT DISTINCT domain FROM `$table1` WHERE domain LIKE '%spsu%' AND state = 0 
	";
		
	$arr = array();
	$result = mysqli_query($con,$sql);	
	if(!is_null($result))
	{
		while($temp = mysqli_fetch_assoc($result))
		{
			$arr[] = $temp;
		}
		echo json_encode((array)$arr);
	}
	else
	{
		echo "NO DIFFERENCES";
	}	
?>