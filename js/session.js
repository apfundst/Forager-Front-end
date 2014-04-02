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
    	$.post("login_request.php",{un: usn, password: pass})

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
        if(checker.name === null){
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

    if (!value) {return;}

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
        $post("get_report.php",{id: curReport.id})
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
        url: "start_scan.php",
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
            url: "stop_scan.php",
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
                url: "get_reports.php",
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
            .replace( /\{\{date\}\}/, data[i].date )
            .replace( /\{\{numErr\}\}/, data[i].number_errors )
            .replace( /\{\{numPages\}\}/, data[i].pages_scanned );
            //.replace( /\{\{date\}\}/, data[i].date ) 
        }
        result.innerHTML = inner;

    },
    renderReportDetails: function(data, template, result){
        var inner = "";
        var i = 0;
        for ( ; i < data.length; i++ ) {
            inner += template
            .replace( /\{\{name\}\}/, data[i].scan_name )
            .replace( /\{\{id\}\}/, data[i].scan_id )
            .replace( /\{\{date\}\}/, data[i].date )
            .replace( /\{\{errors\}\}/, data[i].number_errors )
            .replace( /\{\{numPages\}\}/, data[i].pages_scanned );
            //.replace( /\{\{date\}\}/, data[i].date ) 
        }
        result.innerHTML = inner;

    },
    renderReportErrors: function(data, template, result){
        var inner = "";
        var i = 0;
        for ( ; i < data.length; i++ ) {
            inner += template
            .replace( /\{\{url\}\}/, data[i].source + data[i].link )
            .replace( /\{\{type\}\}/, data[i].type)
            //.replace( /\{\{date\}\}/, data[i].date )
            //.replace( /\{\{numErr\}\}/, data[i].number_errors ) 
            //.replace( /\{\{numPages\}\}/, data[i].pages_scanned );
            //.replace( /\{\{date\}\}/, data[i].date ) 
        }
        result.innerHTML = inner;

    }
}

var reportViewer = {
    getData: function(id){
        $.ajax ({
                dataType: "json",
                type: "POST",
                url: "scan_data.php",
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
                url: "scan_start.php",
                data: {userId: Session.userId},
                success: function(data) {
                    
                        console.log("success");
                        console.log(data);
                        return true;
                        

                        //Render.renderExistingReports(data, template,result);

                       
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log("fail");
                    return false;

                    
                }
            });
    },

    stop: function(){
        $.ajax ({
                dataType: "json",
                type: "POST",
                url: "scan_stop.php",
                data: {userId: Session.userId},
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


    
