<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
    <head>
        <title>Gigity</title>
        <meta name="layout" content="main" />

    </head>
    <body>

      <div id="mainPageMainContent">
      <h1 id="mainPage">:-(
      </h1>
        <p>Sorry, we couldn't find anything gigs for ${query.decodeURL()}. Try another band or place?</p>
        <form action="index" method="get" id="mainInputForm" enctype="application/x-www-form-urlencoded">
          <input type="text"  name="artist" />
          <input type="submit" value="Search" />
        </form>
      </div>
    </body>
</html>
