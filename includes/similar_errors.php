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

	$sql = "
		SELECT *
		FROM `$table1`
		INNER JOIN `$table2`
		ON ".$table1.".url = ".$table2.".url
		WHERE ".$table1.".state = 0 AND ".$table2.".state = 0
		GROUP BY ".$table1.".domain ORDER BY ".$table1.".url DESC;
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