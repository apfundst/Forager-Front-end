<?php
	$scan_id1 = $_POST["rp1"];
	$scan_id2 = $_POST["rp2"];
	$con = mysqli_connect("localhost","root","forageme","forager");
	if (mysqli_connect_errno()){
	  echo "Failed to connect to server" . mysqli_connect_error();
	  exit;
	}

	$table1 = "url" . $scan_id1;
	$table2 = "url" . $scan_id2;

	$sql = "
		SELECT  '$table1'.url, '$table1'.domain, '$table1'.status_code_type
		FROM `'$table1'`
		JOIN `'$table2'`
		ON   '$table1'.url = '$table2'.url AND '$table1'.state = 1 AND '$table2'.state = 0; 
	";
		
	$arr = array();
	$result = mysqli_query($con,$sql);
	$row = mysqli_fetch_array($result, MYSQLI_BOTH);
		
	if(!is_null($row))
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