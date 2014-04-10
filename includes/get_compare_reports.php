<?
include('get_report.php');

//post variables for two reports
$post_id1 = $POST('cpreport1');
$post_id2 = $POST('cpreport2');
$post_id1 = "url" . $post_id1;
$post_id2 = "url" . $post_id2;

session_start();
$con = mysqli_connect("localhost","root","forageme","forager");
if (mysqli_connect_errno()){
  echo "Failed to connect to server.....can you be cool just once! Just once be cool!: " . mysqli_connect_error();
  exit;
}

//use functions from get_report
get_report_data($post_id1);
get_report_data($post_id2);

?>