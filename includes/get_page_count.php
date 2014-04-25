<?php

$con = mysqli_connect("localhost","root","forageme","db_forager");
if (mysqli_connect_errno()){
  echo json_encode("Failed to connect to server.....can you be cool just once! Just once be cool!: " . mysqli_connect_error());
  exit;
}
else{

	$sql1 ="
	 		SELECT scan_id
	 		FROM `scan`
	 		WHERE is_running = 1 OR is_started = 1;
	";

		$result = mysqli_query($con,$sql1);
		$row = mysqli_fetch_assoc($result);
		$pid = $row["scan_id"];
		$urlTable = 'url'.$pid;

		$sql2 ="
			SELECT COUNT(*) FROM `$urlTable` WHERE url_type = 1
		";
		$result2 = mysqli_query($con,$sql2);
		$row2 = mysqli_fetch_assoc($result2);
		echo json_encode($row2)
}
?>