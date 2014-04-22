<?php
	$scan_id1 = $_POST["rp1"];
	$scan_id2 = $_POST["rp2"];

	$con = mysqli_connect("localhost","root","forageme","db_forager");
	if (mysqli_connect_errno()){
	  echo "Failed to connect to server" . mysqli_connect_error();
	  exit;
	}

	$table1 = "url" . $scan_id1;
	$table2 = "url" . $scan_id2;

	// NEW QUERY
	// select * 
	//	from `url1` 
	//	where url not in (SELECT url FROM `url2` WHERE state = 0) 
	//	AND state = 0
	// ONLY NEED errors in scan 1 not in scan 2 and vice versa
	// 


	$sql = "
		SELECT  url, domain, status_code_type
		FROM `$table1`
		WHERE url not in (SELECT url FROM `$table2` WHERE state = 0) 
		AND state = 0 
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