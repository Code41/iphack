<% response.contentType = "text/plain" %>point	title	description	icon
10,20	my orange title	my orange description
2,4	my aqua title	my aqua description
<g:each in="${content}" var="event">${event?.venue?.latitude},${event?.venue?.longitude}  ${event?.eventName} ${event?.venue.name} ${event?.venue.city} ${event?.venue.country}
</g:each>