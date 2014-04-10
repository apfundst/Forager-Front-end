//post to a php page
var Compare = {
	Submit: function(rp1, rp2)
	{
	    	$.post("includes/get_compare_reports.php",{cpreport1: rp1, cpreport2: rp2});
	    	window.location = "compare_report.html";
	}
}