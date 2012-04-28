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
      <style type="text/css">
      html { height: 100% }
      body { height: 100%; margin: 0; padding: 0 }
      #map_canvas { height: 100% }
    </style>
    <script type="text/javascript"
      src="http://maps.googleapis.com/maps/api/js?key=AIzaSyCQoIh8fKyKRkjZMF0RmXFEpNM2eP11Ugo&sensor=true">
    </script>
    <script type="text/javascript">
      function initialize() {
        var myOptions = {
          center: new google.maps.LatLng(53.0, 1.5),
          zoom: 4,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            myOptions);

            var marker
            var myLatlng


       <g:each in="${content}" var="event">

       <g:if test="${event?.venue?.latitude}">

         myLatlng = new google.maps.LatLng(${event?.venue?.latitude}, ${event?.venue?.longitude});

        marker = new google.maps.Marker({
      
        position: myLatlng,
        map: map,
        title:"${event?.eventName}"
        });
        </g:if>
      </g:each>

      }


     
    </script>
  </head>
  <body onload="initialize()">
    <div id="header">
    <h1>Gigity: ${artistDetail.name}</h1>
    </div>


    <div id="artistDetail">
      <img src="${artistDetail.imgUrl}" id="artistImg" height="150" />
      <p>${artistDetail.description}</p>

    </div>

    <div style="clear:both; border-bottom: 1px solid white;">&nbsp;</div>

    <div id="rightBar">
    <div id="map_canvas"></div>

    <div id="tweets">
      <h2>Tweets</h2>
      <g:each in="${tweets}" var="tweet">
        <ul>
          <li>
            <ul>
              <li><a href="${tweet.authorUrl}">${tweet.author}</a></li>
               <li>${tweet.content}</li>
            </ul>
          </li>
        </ul>
      </g:each>
    </div>
    </div>


    <div id="gigs">
      <h2>Gigs</h2>

      <ul id="gigsList">
        <g:each in="${content}" var="event">
          <div>
            <img src="${event?.imageUrl}" class="eventImg" height="100"/>${event?.eventName}
            <ul>

              <g:if test="${event?.venue?.website}">
                <li>Venue: <a href="${event?.venue?.website}">${event?.venue.name}</a></li>
              </g:if>
              <g:else>
                <li>Venue: ${event?.venue.name}</li>
              </g:else>
              <li>Date: ${event.startDate}</li>
              <li>City: ${event?.venue.city}</li>
              <li>Country: ${event?.venue.country}</li>
              <li> <a href="http://www.ents24.com/web/search.html?phrase=${event?.eventName}&searchany=GO">Buy Tickets</a></li>
            </ul>
          </div>
           <div style="clear:left;">&nbsp;</div>

        </g:each>
      </ul>


    </div>
  </body>
</html>
