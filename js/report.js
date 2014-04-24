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
                        
                        reportJS.renderSimilarErrors(data, template, result);
                       
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log("fail");
                    console.log(errorThrown);

                }
            });
    },
    getNewErrors: function(rep1, rep2, template, result){
        $.ajax ({
                dataType: "json",
                type: "POST",
                url: "includes/new_errors.php",
                data: {rp1: rep1, rp2:rep2},
                success: function(data) {
                    
                        console.log("success");
                        console.log(data);
                        

                        reportJS.renderTableErrors(data, template,result);
   
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log("fail");
                    console.log(errorThrown);
  
                }
            });
    },
    getResolvedErrors: function(rep1, rep2, template, result){
        $.ajax ({
                dataType: "json",
                type: "POST",
                url: "includes/new_errors.php",
                data: {rp1: rep2, rp2:rep1},
                success: function(data) {
                    
                        console.log("success");
                        console.log(data);
                        
                        reportJS.renderTableErrors(data, template,result);
   
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log("fail");
                    console.log(errorThrown);
                }
            });
    },
    renderSimilarErrors: function(data, template, result){
        var inner = "";
        var i = 0;
        for ( ; i < data.length; i++ ) {
            inner += template
            .replace(/\{\{url\}\}/, data[i].url)
            .replace( /\{\{domain\}\}/, data[i].domain)
            .replace(/\{\{type\}\}/, data[i].status_code);
        }
        $("#table-loading-s").hide();
        result.innerHTML = inner;
    },
    renderTableErrors: function(data, template, result){
        var inner = "";
        var i = 0;
        for ( ; i < data.length; i++ ) {
            inner += template
            .replace( /\{\{url\}\}/, data[i].url)
            .replace( /\{\{domain\}\}/, data[i].domain)
            .replace( /\{\{type\}\}/, data[i].status_code_type);
        }
        $("#table-loading-n").hide();
        $("#table-loading-r").hide();
        result.innerHTML = inner;
    }
}