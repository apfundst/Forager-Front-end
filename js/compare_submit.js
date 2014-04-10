//post to a php page
var Compare = {
	submit: function(rp1, rp2)
	{
	    	$.post("includes/get_compare_reports.php",{cpreport1: rp1, cpreport2: rp2})
	    	.done(function(result) {console.log("did something");});
	    	window.location = "compare_report.html";
	}
}