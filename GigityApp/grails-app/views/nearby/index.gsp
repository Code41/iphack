<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="layout" content="main">

    <title>Gigity</title>
    <script src="../js/geo-min.js" type="text/javascript" charset="utf-8"></script>
  </head>
  <body><div id="mainPageMainContent">
      <h1 id="mainPage">Gigity</h1>
        <p>Searching for location...<img src="../images/ajax-loader.gif" /></p>
      </div>

    <script>
		if(geo_position_js.init()){
			geo_position_js.getCurrentPosition(success_callback,error_callback,{enableHighAccuracy:true});
		}
		else{
			alert("Functionality not available");
		}

		function success_callback(p)
		{
			//alert('lat='+p.coords.latitude.toFixed(2)+';lon='+p.coords.longitude.toFixed(2));
                        window.location.href = "../gigs/latlong?lat="+p.coords.latitude.toFixed(2)+"&lon="+p.coords.longitude.toFixed(2);

		}

		function error_callback(p)
		{
			alert('error='+p.message);
		}
	</script>
  </body>
</html>
