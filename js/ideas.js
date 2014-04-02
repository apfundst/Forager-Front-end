//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//
//       If we want to rapidly/visually generate report
//
//+++++++++++++++++++++++++++++++++++++++++++++++++++++

setInterval(function(){
    // inside here, set any data that you need to send to the server
    var some_serialized_data = jQuery('form.my_form').serialize();

    // then fire off an ajax call
    jQuery.ajax({
        url: '/yourPhpScriptForUpdatingData.php',
        success: function(response){
            // put some javascript here to do something with the 
            // data that is returned with a successful ajax response,
            // as available in the 'response' param available, 
            // inside this function, for example:
            $('#my_html_element').html(response);
        },
        data: some_serialized_data
    });
}, 1000); 
// the '1000' above is the number of milliseconds to wait before running 
// the callback again: thus this script will call your server and update 
// the page every second.

//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//
//       Tree Idea Code
//
//+++++++++++++++++++++++++++++++++++++++++++++++++++++

//html
<ul class="tree">
    <li>
        <a>domain</a>
        <ul>
            <li><a>pages</a>
        <ul>
            <li>errors</li>  
            <li>errors</li>  
            <li>Aerr</li>  
            <li>error</li>            
        </ul>   </li>  
            <li>errors</li>  
            <li>errors</li>  
            <li>errors</li>            
        </ul>                
    </li>
    
    <li>
        <a>domain</a>
        <ul>
            <li>page</li>  
            <li>page</li>      
        </ul>                
    </li>
</ul>
//end html

//css 
ul.tree, ul.tree ul {
     list-style-type: none;
     
     margin: 0;
     padding: 0;
   }
   
   ul.tree ul {
     margin-left: 10px;
   }

   ul.tree li {
     margin: 0;
     padding: 0 12px;
   }
ul.tree li:before{
    content:"+";
}
a{
    color:blue;
    text-decoration:underline;
    
}
//end css
//javascript
$('.tree > li a').click(function() {
    $(this).parent().find('ul').toggle();
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//
//       Template engine attempt Code
//
//+++++++++++++++++++++++++++++++++++++++++++++++++++++

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<body>
 
  <h1>yolo</h1>
  <div class="result"></div>
   
  <script type="template" id="template">
    <h2> 
      <a href="{href}">
        {title}
      </a>
    </h2>
    <img src="{imgSrc}" alt="{title}">
  </script>
  
</body>
</html>

function Get_Tags(tmpl){
    var re = /\{([^}]*)\}/;
  var elements = [];
  var i = 0;
  
    while((elements[i] = re.exec(tmpl))!= null){
      var temp = re.exec(tmpl);
      elements[i]=  temp[1];
    }
  
    console.log(elements);
    return elements;
    
  };

;(function(){

  // simulates AJAX request
  var data = [
    {
      title: "Create a Sticky Note Effect in 5 Easy Steps with CSS3 and HTML5",
      href: "http://net.tutsplus.com/tutorials/html-css-techniques/create-a-sticky-note-effect-in-5-easy-steps-with-css3-and-html5/",
      imgSrc: "https://d2o0t5hpnwv4c1.cloudfront.net/771_sticky/sticky_notes.jpg"
    },
    {
      title: "Nettuts+ Quiz #8",
      href: "http://net.tutsplus.com/articles/quizzes/nettuts-quiz-8-abbreviations-darth-sidious-edition/",
      imgSrc: "https://d2o0t5hpnwv4c1.cloudfront.net/989_quiz2jquerybasics/quiz.jpg"
    },
    {
      title: "WordPress Plugin Development Essentials",
      href: "http://net.tutsplus.com/tutorials/wordpress/wordpress-plugin-development-essentials/",
      imgSrc: "https://d2o0t5hpnwv4c1.cloudfront.net/1101_wpPlugins/wpplugincourse.png"
    }    
  ],
      template = document.querySelector('#template').innerHTML,
      result = document.querySelector('.result'),
      i = 0, j = 0, len = data.length, inner ='';
  
  
  
  var els = Get_Tags(template);
  var els_len = els.length;
  
  for(;i<len; i++){
    for(; j<els_len; j++){
      var regex = new RegExp("/\{\{" + els[j] + "\}\}/");
      inner += template.replace(regex, data[i].href);
    }
  }
  for ( ; i < len; i++ ) {
    inner += template
      .replace( /\{\{title\}\}/, data[i].title )
      .replace( /\{\{href\}\}/, data[i].href )
      .replace( /\{\{imgSrc\}\}/, data[i].imgSrc );  
  }
  result.innerHTML = inner;
}());

//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//
//       to change dom css where errors exist
//
//+++++++++++++++++++++++++++++++++++++++++++++++++++++

$("#result").addClass('msg_error');
OR
x = querySelector(stuffs);
x.addClass()?? idk how this works syntacticly
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//
//       to change dom css where errors exist
//
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>contains demo</title>
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
</head>
<body>
 
<div>John Resig</div>
<div>George Martin</div>
<div>Malcom John Sinclair</div>
<div>J. Ohn</div>
 
<script>
$( "div:contains('John')" ).css( "text-decoration", "underline" );
</script>
 
</body>
</html>