<?
include('get_report.php');

//post variables for two reports
$post_id1 = $POST('cpreport1');
$post_id2 = $POST('cpreport2');

session_start();
$con = mysqli_connect("localhost","root","forageme","forager");
if (mysqli_connect_errno()){
  echo "Failed to connect to server.....can you be cool just once! Just once be cool!: " . mysqli_connect_error();
  exit;
}

$post_id1= mysqli_real_escape_string($con,$post_id1);
$post_id2  = mysqli_real_escape_string($con,$post_id2);

//use functions from get_report
get_report_data($post_id1);
get_report_data($post_id2);

?>