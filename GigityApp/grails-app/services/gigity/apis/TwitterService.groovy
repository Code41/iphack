package gigity.apis

import gigity.twitter.Tweet

class TwitterService {

    static transactional = false

    def getHashTagTweets(String hashtag) {

        log.info("Getting tweets")

        List tweets = []

        def addr = "http://search.twitter.com/search.atom?q=%23${hashtag}"
        def feed = new XmlSlurper().parse(addr)
        feed.entry.each{
            println it.author.name
            println it.published
            println it.title
            println "-"*20

            Tweet tweet = new Tweet(content: it.title, author: it.author.name, authorUrl: it.author.uri)

            tweets << tweet
        }

        log.info("Got ${feed.entry.size()} tweets")

        return tweets
    }
}
