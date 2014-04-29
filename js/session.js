var Session = {
    userId: 1,
    userName: null,
    name: null,
    setInfo: function (result) {//takes a json object, intended to come from server
    	Session.name = result.name;
    	Session.userId = result.userId;
        Session.userName = result.userName;

    	//console.log(result);
        
    },
    login: function(usn, pass){
    	console.log(usn);
    	console.log(pass);
    	$.post("includes/login_request.php",{un: usn, password: pass})

    	.done(function(result) {
    		if(result != 400){
                Session.userName = usn;
        		var data = JSON.parse(result);
        		Session.name = data['name'];
        		Session.userId = data.user_id;
        		console.log(data);
        		dataStore.set("user", Session);
        		//Session.setInfo(result);
        		//console.log(Session);
        		
      			window.location = "dashboard.html";
        }else{
            $('#error_tag').html("Login Failed");
        }
		})
		  
		  .fail(function() {
		    $('#error_tag').html("Login Failed");
		  });

    },
    check: function(){
        var checker = dataStore.get("user");
        if(checker === -1 ){
            window.location = "login.html";
        }else if(checker.name === null){
            window.location = "login.html";
        }else{
            Session.setInfo(checker);
            console.log(Session);

        }
        
    },
    logout: function(){
        Session.name = null;
        Session.userName = null;
        Session.userId = null;
        dataStore.set("user", Session);
        window.location = "login.html";
    },
    checkStarted: function(){
        $.ajax ({
                dataType: "json",
                type: "POST",
                url: "includes/check_scan.php",
                data: {userId: Session.userName},
                success: function(data) {
                    console.log(data);
                    if(data === "Already Running"){
                        console.log(data);
                        timeDiv.innerHTML = "Scan Not Started, Scan Already Running.";
                        $("#start_scan").hide();
                        $("#stop_scan").show();
                    }
                    else if(data === "Success"){
                        //scan is running
                        console.log("it returned success...");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {      
                    var timeDiv = document.getElementById('scan_timer');
                    console.log("fail");
                    console.log(errorThrown);
                }
            });
    }
}

var dataStore = {
  set: function(key, value) {
    if (!key || !value) {return;}

    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  },
  get: function(key) {
    var value = localStorage.getItem(key);

    if (!value) {return -1;}

    // assume it is an object that has been stringified
    if (value[0] === "{") {
      value = JSON.parse(value);
    }

    return value;
  }
}

var scanTime = {
    startTime: 0,
    endTime: 0,
    total: 0,
    timer: 0,
    start: function(){
            scanTime.startTime = new Date();
            dataStore.set("scanTimer", scanTime);
            
        
        //else already started so do nothing.
    },
    stop: function(){
        scanTime.endTime = new Date();
        scanTime.total = scanTime.endTime - scanTime.startTime;
        dataStore.set("scanTimer", scanTime);
    },
    getElapsed: function(){
        console.log(dataStore.get("scanTimer"));
        var now = new Date();
        var elapsed = now - scanTime.startTime
        scanTime.total = elapsed;
        dataStore.set("scanTimer", scanTime);
        var value = dataStore.get("scanTimer");

        return value.total;
    }
}

var curReport = {
    id: 0,
    name: 0,
    creator: 0,
    dateCreated: 0,
    totalPagesScanned: 0,
    totalErrors: 0,
    totalTime: 0,
    getFromServer: function(){
        $post("includes/get_report.php",{id: curReport.id})
        .done(function(){

        })
        .fail(function(){

        });
    }

}

var scan = {
    id: 0,
    name: 0,
    creator: 0,
    dateCreated: 0,
    totalPagesScanned: 0,
    totalErrors: 0,
    totalTime: 0,
    start: function(){
        $.ajax ({
        dataType: "json",
        type: "POST",
        url: "includes/start_scan.php",
        data: scan,
        success: function(data) {
            window.location = "dashboard.html";

            
        },
        error: function (xhr, textStatus, errorThrown) {
            //uh oh

            
        }
    });

    },
    stop: function(){
        $.ajax ({
            dataType: "json",
            type: "POST",
            url: "includes/stop_scan.php",
            data: scan,
            success: function(data) {
                 window.location = "dashboard.html";

                
            },
            error: function (xhr, textStatus, errorThrown) {
                //uh oh

                
            }
        });
    }
}


var allReports = {
    get: function(template, result){
        $.ajax ({
                dataType: "json",
                type: "POST",
                url: "includes/get_reports.php",
                data: {userId: Session.userId},
                success: function(data) {
                    
                        console.log("success");
                        console.log(data);
                        
                        Render.renderExistingReports(data, template,result);       
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log("fail"); 
                }
            });
    },
    getReportsList: function(result){
        $.ajax ({
                dataType: "json",
                type: "POST",
                url: "includes/get_reports.php",
                data: {userId: Session.userId},
                success: function(data) {
                    
                        console.log("success");
                        console.log(data);
                        
                        Render.renderReportsList(data,result);       
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log("fail"); 
                }
            });
    },
    getCompare: function(template, result){
        $.ajax ({
                dataType: "json",
                type: "POST",
                url: "includes/get_reports.php",
                data: {userId: Session.userId},
                success: function(data) {
                    
                        console.log("success");
                        console.log(data);
                        
                        Render.renderCompareDropdown(data, template,result);

                       
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log("fail");

                    
                }
            });
    },
    //
    showReportDetails: function(template, result, id){
        $.ajax ({
                dataType: "json",
                type: "POST",
                url: "includes/get_report.php",
                data: {scanId: id, funcId: 1},
                success: function(data) {
                    //returns
                    // $scan_name, $start_time,$stop_time, $elapsed_time, 
                    //$pages_scanned, $number_errors, $avg_errors_per_page);

                        console.log("success");
                        console.log(data);
                        
                        Render.renderReportDetails(data, template, result);

                       
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log("fail");
                    console.log(errorThrown);

                    
                }
            });
    },
    showReportErrors: function(template, result, id){
        $.ajax ({
                dataType: "json",
                type: "POST",
                url: "includes/get_report.php",
                data: {scanId: id, funcId: 2},
                success: function(data) {
                    //returns list of scan errors
                    

                        console.log("success");
                        console.log(data);
                        
                        Render.renderReportErrors(data, template, result);

                       
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log("fail");

                    
                }
            });
    },
    getDomains: function(template, result, id){
        $.ajax ({
                dataType: "json",
                type: "POST",
                url: "includes/get_domains.php",
                data: {scanId: id},
                success: function(data) {
                    
                        console.log("success");
                        console.log(data);
                        
                        renderDomains(dats, template, result);
                        

                       
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log("fail");

                    
                }
            });
    },
    getPages: function(domainName){
        $.ajax ({
                dataType: "json",
                type: "POST",
                url: "includes/get_pages.php",
                data: {domain: domainName},
                success: function(data) {
                    
                        console.log("success");
                        console.log(data);
                        
                        return data;
                        

                       
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log("fail");
  
                }
            });
    }
}
var Render = {
    renderExistingReports: function(data, template, result){
        var inner = "";
        var i = 0;
        for ( ; i < data.length; i++ ) {
            inner += template
            .replace( /\{\{name\}\}/, data[i].scan_name )
            .replace( /\{\{id\}\}/, data[i].scan_id )
            .replace( /\{\{date\}\}/, data[i].start_time )
            .replace( /\{\{time\}\}/, data[i].stop_time )
            .replace( /\{\{numErr\}\}/, data[i].number_errors )
            .replace( /\{\{numPages\}\}/, data[i].pages_scanned );
        }
        $("#table-loading").hide();
        result.innerHTML = inner;

    },
    //Peter
    renderCompareDropdown: function(data, template, result){
        var inner = "";
        var i = 0;
        for ( ; i < data.length; i++ ) {
            inner += template
            .replace( /\{\{name\}\}/, data[i].scan_name )
            .replace( /\{\{id\}\}/, data[i].scan_id );
        }
        $("#table-loading").hide();
        result.innerHTML = inner;
    },//
    renderReportDetails: function(data, template, result){
        var inner = "";
        //var i = 0;
        //for ( ; i < data.length; i++ ) {
            inner += template
            .replace( /\{\{name\}\}/, data.scan_name)
            .replace( /\{\{startTime\}\}/, data.start_time)
            .replace( /\{\{time\}\}/, data.stop_time)
            .replace( /\{\{errors\}\}/, data.number_errors )
            .replace( /\{\{avgErr\}\}/, data.number_errors / data.pages_scanned )
            .replace( /\{\{pages\}\}/, data.pages_scanned );
        //}
        result.innerHTML = inner;

    },
    renderReportErrors: function(data, template, result){
        var inner = "";
        var i = 0;
        for ( ; i < data.length; i++ ) {
            inner += template
            .replace( /\{\{url\}\}/, data[i].url)
            .replace( /\{\{url\}\}/, data[i].url)
            .replace( /\{\{type\}\}/, data[i].status_code)
            .replace( /\{\{source\}\}/, data[i].source)
            .replace( /\{\{source\}\}/, data[i].source)
            .replace( /\{\{message\}\}/, data[i].status_code_type )
            .replace( /\{\{domain\}\}/, data[i].domain == "htt" ? "External" : data[i].domain);
        }
        $("#table-loading").hide();
        result.innerHTML = inner;
        //window.location.search += '#item1';

    },
    renderDomains: function(data, template, result){
        var inner = "";
        var innerTemp = "<li><h2><a href=\"{{url}}\">{{url}}</a> {{numErr}}</h2></li>";
        var i = 0;
        var j = 0;
        for ( ; i < data.length; i++ ) {
            var domainPages = "";
            var domainData = allReports.getPages(data[i].domain);
            j = 0;
            for( ; j < domainData.length; j++){
                domainPages += innerTemp
                .replace( /\{\{url\}\}/, domainData[i].url)
                .replace(/\{\{numErr\}\}/, domainData[i].number_errors);

            }
            inner += template
            .replace( /\{\{domain\}\}/, data[i].domain == "htt" ? "External" : data[i].domain)
            .replace( /\{\{numpages\}\}/, data[i].number_pages)
            .replace( /\{\{#errors\}\}/, data[i].number_errors)
            //.replace( /\{\{%errors\}\}/, data[i].domain)
            .replace( /\{\{pages_content\}\}/, domainPages );

        }
        $("#table-loading").hide();
        result.innerHTML = inner;
        //window.location.search += '#item1';

    },
    renderReportsList: function(data, result){
        var inner = "";
        var innerTemp = "<li class=\"tab\"> <a href=\"report.html?id={{id}}#item1\">{{report}}</a></li>";
        var i = 0;
        for ( ; i < data.length; i++ ) {
            inner += innerTemp
            .replace( /\{\{id\}\}/, data[i].scan_id)
            .replace( /\{\{report\}\}/, data[i].scan_name);
        }
        $("#yolo-table-loading").hide();
        result.innerHTML = inner;
        //window.location.search += '#item1';

    }


}

var reportViewer = {
    getData: function(id){
        $.ajax ({
                dataType: "json",
                type: "POST",
                url: "includes/scan_data.php",
                data: {scanId: id},
                success: function(data) {
                    
                        console.log("success");
                        console.log(data);
                        return data;
                        

                        //Render.renderExistingReports(data, template,result);

                       
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log("fail");

                    
                }
            });
    }
}
var report = {
    start: function(){
        $.ajax ({
                dataType: "json",
                type: "POST",
                url: "includes/scan_start.php",
                data: {userId: Session.userName},
                success: function(data) {
                       console.log(data);
                    if(data === "Already Running"){
                        console.log(data);
                        var timeDiv = document.getElementById('scan_timer');
                        
                    timeDiv.innerHTML = "Scan Not Started, Scan Already Running.";
                    $("#start_scan").hide();
                            $("#stop_scan").show();
                    }
                    else if(data === "Success"){
                        var timeDiv = document.getElementById('scan_timer');
                        scanTime.start();
    
                            console.log(Session);
                            
                            //$(this).prop('disabled', true);
                            $("#start_scan").hide();
                            $("#stop_scan").show();
                            
                            var reportDiv = document.getElementById('data_echo');
                            scanTime.timer = setInterval(function () {
                              timeDiv.innerHTML = "Seconds since the start: " + (scanTime.getElapsed()/1000) + "   Pages Scanned " + report.pageCount();
                              //reportDiv.innerhtml = reportViewer.getData();
                            }, 1000);

                        //return true;
                        

                        //Render.renderExistingReports(data, template,result);

                       }
                },
                error: function (xhr, textStatus, errorThrown) {

                            
                    var timeDiv = document.getElementById('scan_timer');
                    console.log("fail");
                    console.log(errorThrown);
                    timeDiv.innerHTML = "Scan Not Started, Try turing it off and on again. And please ensure your computer is plugged in.";
                    
                }
            });
    },
    stop: function(){
        $.ajax ({
                dataType: "json",
                type: "POST",
                url: "includes/scan_stop.php",
                data: {userId: Session.userId},
                success: function(data) {
                    
                        console.log("success");
                        console.log(data);
                        $("#start_scan").show();
                        $("#stop_scan").hide();
                        var timeDiv = document.getElementById('scan_timer');
                        timeDiv.innerHTML = "";
                        return data;
                        

                        //Render.renderExistingReports(data, template,result);

                       
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log("fail");

                    
                }
            });
    },

    pageCount: function(){
        $.ajax ({
                dataType: "json",
                type: "POST",
                url: "includes/get_page_count.php",
                data: {userId: Session.userId},
                success: function(data) {
                    
                        console.log(data);
                        return data;
                        

                        //Render.renderExistingReports(data, template,result);

                       
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log("fail");

                    
                }
            });
    }
}

   function getFromUrl(VarSearch){
    var SearchString = window.location.search.substring(1);
    var VarArray = SearchString.split('&');
    for(var i = 0; i < VarArray.length; i++){
        var KeyValPair = VarArray[i].split('=');
        if(KeyValPair[0] == VarSearch){
            return KeyValPair[1];
        }
    }
} 

/*var call = {
    ajax: function(data, type, url, ){

    }
}*/
function listFilter(list, input) {
  $(input).change( function () {
    var filter = $(this).val();
    if (filter) {
      $(list).find("h2:not(:contains(" + filter + "))").parent().slideUp();
      $(list).find("h2:contains(" + filter + ")").parent().slideDown();
    } else {
      $(list).find("li").slideDown();
    }
  }).keyup( function () {
    $(this).change();
  });
}
//takes a table and a form respectivly
function tableFilter(list, input) {
  $(input).find("#clear").hide();
  $(input).on("submit", function (e) {
     e.preventDefault();
    var filter = $(".search_bar").val();
      $(list).find("a:not(:contains(" + filter + "))").parent().parent().slideUp();
      $(list).find("a:contains(" + filter + ")").parent().parent().slideDown();
    $(input).find('input[type="submit"]').hide();
     $(input).find("#clear").show();
  });
 $(input).find("#clear").click(function(){
  $("table").find("tr").slideDown();
  $("#clear").hide();
  });
}
