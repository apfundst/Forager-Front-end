//post to a php page
var Compare = {
Submit: function(rp1, rp2){
    	$.post("includes/get_compare_reports.php",{report1: rp1, report2: rp2})
}