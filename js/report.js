var reportJS = {
    
    getSimilarErrors: function(rep1, rep2, template, result){
        $.ajax ({
                dataType: "json",
                type: "POST",
                url: "includes/similar_errors.php",
                data: {rp1: rep1, rp2:rep2},
                success: function(data) {
                    
                        console.log("success");
                        console.log(data);
                        
                        compareJS.renderSimilarErrors(data, template, result);
                       
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log("fail");

                }
            });
    },
    getNewErrors: function(template, result){
        $.ajax ({
                dataType: "json",
                type: "POST",
                url: "includes/new_errors.php",
                data: {rp1: rep1, rp2:rep2},
                success: function(data) {
                    
                        console.log("success");
                        console.log(data);
                        

                        compareJS.renderNewErrors(ExistingReports()data, template,result);
   
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log("fail");
  
                }
            });
    },
    renderSimilarErrors: function(data, template, result){
        var inner = "";
        var i = 0;
        for ( ; i < data.length; i++ ) {
            inner += template
            .replace( /\{\{name\}\}/, data[i].scan_name )
            .replace( /\{\{id\}\}/, data[i].scan_id );
            //.replace( /\{\{date\}\}/, data[i].date )
            //.replace( /\{\{numErr\}\}/, data[i].number_errors )
            //.replace( /\{\{numPages\}\}/, data[i].pages_scanned );
            //.replace( /\{\{date\}\}/, data[i].date ) 
        }
        $("#table-loading").hide();
        result.innerHTML = inner;
    },
    renderNewErrors: function(data, template, result){
        var inner = "";
        var i = 0;
        for ( ; i < data.length; i++ ) {
            inner += template
            .replace( /\{\{name\}\}/, data[i].scan_name )
            .replace( /\{\{id\}\}/, data[i].scan_id );
            //.replace( /\{\{date\}\}/, data[i].date )
            //.replace( /\{\{numErr\}\}/, data[i].number_errors )
            //.replace( /\{\{numPages\}\}/, data[i].pages_scanned );
            //.replace( /\{\{date\}\}/, data[i].date ) 
        }
        $("#table-loading").hide();
        result.innerHTML = inner;
    }
}