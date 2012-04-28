var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var views = sp.require("sp://import/scripts/api/views");

var player = models.player;

exports.init = init;

function init() {

// Create a toplist of the to 60 tracks
var toplist = new models.Toplist();
toplist.toplistType = models.TOPLISTTYPE.REGION;
toplist.matchType = models.TOPLISTMATCHES.TRACKS;  //Choose tracks
toplist.region = "GB";  // use GB region

var startTrack 

// update playlist with top 60 tracks
toplist.observe(models.EVENT.CHANGE, function() {    	
	var i;
	startTrack = toplist.results[0].uri;
	console.log(startTrack);
	for (i=0;i<6;i++)  // go to 60 tracks
	{	
		add_li("bands", i + 1 + " :" + toplist.results[i]);		
	}
	playTrack(startTrack);
});

toplist.run(); //execute the toplist
}

function add_li(list, text) {
var list = document.getElementById(list);
var li = document.createElement("li");
li.innerHTML = text;
list.appendChild(li);
}

function playTrack(uri) {
     sp.trackPlayer.playTrackFromUri(uri, {
        onSuccess: function() { console.log("success");} ,
        onFailure: function () { console.log("failure");},
        onComplete: function () { console.log("complete"); }
    });
}
