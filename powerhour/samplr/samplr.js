var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var player = models.player;

exports.init = init;

function init() {
var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');

var toplist = new models.Toplist();
toplist.toplistType = models.TOPLISTTYPE.REGION;
toplist.matchType = models.TOPLISTMATCHES.TRACKS;
toplist.region = "GB";

var myAwesomePlaylist = new models.Playlist("My Awesome Playlist");

toplist.observe(models.EVENT.CHANGE, function() {    	
	var i;
	for (i=0;i<6;i++)
	{	
		add_li("bands", i + 1 + " :" + toplist.results[i]);		
		myAwesomePlaylist.add(toplist.results[i]);
	}
});

toplist.run();
var songPlay = new models.Play();
songPlay.play(toplist.results[0])
}

function add_li(list, text) {
var list = document.getElementById(list);
var li = document.createElement("li");
li.innerHTML = text;
list.appendChild(li);
}
