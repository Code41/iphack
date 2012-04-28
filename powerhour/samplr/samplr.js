var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var player = models.player;

exports.init = init;

function init() {
var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');

// Create a toplist of the to 60 tracks
var toplist = new models.Toplist();
toplist.toplistType = models.TOPLISTTYPE.REGION;
toplist.matchType = models.TOPLISTMATCHES.TRACKS;  //Choose tracks
toplist.region = "GB";  // use GB region

// Create a playlist to put the top 60 into
var myAwesomePlaylist = new models.Playlist("Power Hour Playlist");

// update playlist with top 60 tracks
toplist.observe(models.EVENT.CHANGE, function() {    	
	var i;
	for (i=0;i<6;i++)  // go to 60 tracks
	{	
		add_li("bands", i + 1 + ": " + toplist.results[i]);		
		myAwesomePlaylist.add(toplist.results[i]);  // add track to playlist
	}
});

toplist.run(); //execute the toplist

var songPlay = new models.Play();
songPlay.play(toplist.results[0])
}

function add_li(list, text) {
var list = document.getElementById(list);
var li = document.createElement("li");
li.innerHTML = text;
list.appendChild(li);
}
