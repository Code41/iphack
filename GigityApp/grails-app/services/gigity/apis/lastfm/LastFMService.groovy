package gigity.apis.lastfm

import gigity.Venue
import gigity.Artist
import gigity.Event

class LastFMService {

    static transactional = true

    /**
     * Gets the events for the passed in artist
     */
    def getArtistsEvents(String artist) {

        log.info("Getting artist events")

        //http://ws.audioscrobbler.com/2.0/?method=artist.getevents&artist=Kasabian&api_key=9f37555b8a6281942d742327fba9075e
        //def result = new URL("http://ws.audioscrobbler.com/2.0/?method=artist.getevents&artist=${artist}&api_key=9f37555b8a6281942d742327fba9075e").text

        String url = "http://ws.audioscrobbler.com/2.0/?method=artist.getevents&artist=${artist}&api_key=9f37555b8a6281942d742327fba9075e"

        //         //parse xml
        //
        //        def xml = new XmlSlurper().parseText(result)
        //
        //
        //        List eventsList = []
        //
        //        xml.events.event.each{
        //
        //            //imageUrl
        //            String img
        //            it?.image.each{ imgUrl ->
        //                img = imgUrl
        //            }
        //
        //            Venue v = new Venue(name: it?.venue.name,
        //                                city: it?.venue?.location?.city,
        //                                country: it?.venue?.location?.country,
        //                                latitude: it?.venue?.location?."point"?."lat",
        //                                longitude: it?.venue?.location?."point"?."long",
        //                                website: it?.venue?.website,
        //                                )
        //            List artists = []
        //            xml.events.event.artists.each{
        //                Artist a = new Artist(name: it.artist)
        //                artists << a
        //            }
        //
        //
        //            Event e = new Event(eventName: it.title, venue: v, artists: artists, imageUrl: img, startDate: it.startDate, endDate: it.endDate)
        //            eventsList << e
        //        }
        //
        //
        //        log.info("got ${eventsList.size()} artist events")
        //
        //        return eventsList

        def eventsList = parseEvents(url)

        log.info("got ${eventsList.size()} artist events")

        return eventsList
    }

    def getArtistInfo(String artistName){

        try{

        String url = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=9f37555b8a6281942d742327fba9075e"
        def result = new URL(url).text

        def xml = new XmlSlurper().parseText(result)

        String img
        xml?.artist?.image.each{
            img = it
        }

        Artist artist = new Artist(name: xml?.artist?.name,description: xml?.artist?.bio?.summary, imgUrl: img)

        return artist
        }
        catch(Exception ex){
            return null
        }
    }

    //Gets the events for a place. Returns empty list if cannot be found.
    def getEventsForPlaceName(String place){
        String url = "http://ws.audioscrobbler.com/2.0/?method=geo.getevents&location=${place}&api_key=9f37555b8a6281942d742327fba9075e"

        return parseEvents(url)

    }

    //Gets the events for a place. Returns empty list if cannot be found.
    def getEventsForLatLong(String lat, String lon){
        String url = "http://ws.audioscrobbler.com/2.0/?method=geo.getevents&long=${lon}&lat=${lat}&api_key=9f37555b8a6281942d742327fba9075e"

        return parseEvents(url)

    }


    def parseEvents(String url){

        try{
            def result = new URL(url).text

            //parse xml

            def xml = new XmlSlurper().parseText(result)


            List eventsList = []

            xml.events.event.each{

                //imageUrl
                String img
                it?.image.each{ imgUrl ->
                    img = imgUrl
                }

                Venue v = new Venue(name: it?.venue.name,
                    city: it?.venue?.location?.city,
                    country: it?.venue?.location?.country,
                    latitude: it?.venue?.location?."point"?."lat",
                    longitude: it?.venue?.location?."point"?."long",
                    website: it?.venue?.website,
                )
                List artists = []
                xml.events.event.artists.each{
                    Artist a = new Artist(name: it.artist)
                    artists << a
                }


                Event e = new Event(eventName: it.title, venue: v, artists: artists, imageUrl: img, startDate: it.startDate, endDate: it.endDate)
                eventsList << e
            }

            return eventsList
        }
        catch(Exception ex){
            log.error(ex.getMessage())
            return []
        }
    }
}
