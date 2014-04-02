<?php
session_start();
$con = mysqli_connect("localhost","root","forageme","forager");
if (mysqli_connect_errno()){
  echo "Failed to connect to server.....can you be cool just once! Just once be cool!: " . mysqli_connect_error();
  exit;
}

$user_id  = $_POST["userId"];
$start_time  = date('H:i:s');
$scan_name = "report_".$user_id."_".$start_time;

$scan_running_sql ="
 		SELECT *
 		FROM `scan`
 		WHERE is_running = 1;
";
$result = mysqli_store_result($con);
$row = mysqli_fetch_row($result);
if( !is_null($row) ){ 
    exit;
}

//IF max is not set then insert null...
$new_report_sql ="
		INSERT INTO `scan`(`scan_name`,`started_by`,`start_time`,`is_running`)
		VALUES('$scan_name','$user_id','$start_time','1')
"; 
$result = mysqli_query($con,$new_report_sql);
$last_report_id = mysqli_insert_id($con);
$_SESSION['current_id'] = $last_report_id;

// Creates a new url table for the scan
$new_url_table_name      = "url_".$last_report_id;
$new_link_rel_table_name = "link_rel_".$last_report_id;

$new_url_table_sql ="
		CREATE TABLE IF NOT EXISTS `'$new_url_table_name'` (
  		`url_id` int(11) NOT NULL AUTO_INCREMENT,
  		`link` varchar(1000) NOT NULL,
  		`source` varchar(1000) NOT NULL,
  		`type` varchar(1000) NOT NULL,
  		`state` tinyint(1) NOT NULL,
  		PRIMARY KEY (`url_id`)
		) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

		CREATE TABLE IF NOT EXISTS `'$new_link_rel_table_name'` (
  		`url_id` int(11) NOT NULL,
  		`dest_id` int(11) NOT NULL,
		) ENGINE=InnoDB DEFAULT CHARSET=latin1;
";
$result = mysqli_query($con,$new_url_table_sql);
// Then begin the threading adventure...
exec("php execute_test.php");

?>