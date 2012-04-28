package gigity.controller

class GigsController {

    def lastFMService

    def twitterService

    def index = {
        if(params.artist){


            def content
            def artistDetails
            def tweets

            def locationContent

            String artist = URLEncoder.encode(params.artist)

            try{
                locationContent = lastFMService.getEventsForPlaceName(artist)

                tweets = twitterService.getHashTagTweets(artist)


                if (locationContent.size() > 0){
                    log.info("Found location results")
                    render(view: "place", model: [place:artist, content: locationContent,tweets: tweets])
                    return
                }
                else{
                    log.info("Not found location results, searching artists")
                    content = lastFMService.getArtistsEvents(artist)
                    artistDetails = lastFMService.getArtistInfo(artist)
                }

                println content.size()

                if(content.size() < 1){
                    log.info("Artist not found")
                    render(view: "noResults", model: [query:artist])
                }


                log.info("got content ${content.size()}")
            }
            catch(Exception ex){
                ex.printStackTrace()
                log.error(ex.getMessage())
                render "Error"
            }


            return [artist: params.artist, content: content, artistDetail: artistDetails, tweets: tweets]
        }
        else{
            render "No artist specified"
        }
    }

    def latlong = {

        try{
            def content = lastFMService.getEventsForLatLong(params.lat, params.lon)

            if(content.size() < 1){
                    log.info("No results in area")
                    render(view: "noResults", model: [query:"your area"])
                }

            return [content: content, lat: params.lat, lon: params.lon]
        }
        catch(Exception ex){
            ex.printStackTrace()
            log.error(ex.getMessage())
            render "Error"
        }
    }

    def points = {
        if(params.artist){


            def content
            try{
                content = lastFMService.getArtistsEvents(params.artist)

                log.info("got content ${content.size()}")
            }
            catch(Exception ex){
                ex.printStackTrace()
                log.error(ex.getMessage())
                render "Error"
            }


            return [artist: params.artist, content: content]
        }
        else{
            render "No artist specified"
        }
    }
}
