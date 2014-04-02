<?php
session_start();
$con = mysqli_connect("localhost","root","forageme","forager");
if (mysqli_connect_errno()){
  echo "Failed to connect to server.....can you be cool just once! Just once be cool!: " . mysqli_connect_error();
  exit;
}

// return url_id from url_ table
function do_check_url($source, $link){
	$url_table = "url_".$_SESSION["current_id"];
	$sql ="
		SELECT url_id
		FROM `'$url_table'`
		WHERE source = '$source' AND
			  link = '$link'
	";
	$result = mysqli_query($con,$sql);
	$row = mysqli_fetch_row($result);
	if( !is_null($row) ){
		return $row[0];
	}
	else{
		return NULL;
	}
}

// insert into url_ table AND link_rel table
function do_insert_url($source, $link, $type, $state){
	$url_table = "url_".$_SESSION["current_id"]; 
	$sql ="
		INSERT INTO `'$url_table'`(`link`,`source`,`type`,`state`)
		VALUES('$link','$source','$type','$state')
	";
	$result = mysqli_query($con,$sql);
	$last_insert = mysqli_insert_id($con);
	return $last_insert;
}


// insert into link_rel table only
function do_insert_link_rel($url_id, $dest_id){
	$link_rel_table = "link_rel_".$_SESSION["current_id"]; 
	$sql ="
		INSERT INTO `'$link_rel_table'`(`url_id`,`dest_id`)
		VALUES('$url_id','$dest_id')
	";
	$result = mysqli_query($con,$sql);
}


// checks scan table to see if any scan is running
function do_check_running(){
	$sql ="
		SELECT *
		FROM `scan`
		WHERE is_running = 1
	";
	$result = mysqli_query($con,$sql);
	$row = mysqli_fetch_row($result);
	if( is_null($row) ){
		return 0;
	}
	else{
		return 1;
	}
}	

?>