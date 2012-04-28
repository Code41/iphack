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

var currentcountdown;
currentcountdown = 60;
var countnum = document.getElementById('countnum');
var nowplaying = document.getElementById('nowplaying');
var currentTrackUri;
var currentTrack;

// update playlist with top 60 tracks
toplist.observe(models.EVENT.CHANGE, function() {    	
	var i;
	currentTrack = toplist.results[0].name;
	currentTrackUri = toplist.results[0].uri;
	console.log(currentTrackUri);	
    
	for (i=0;i<10;i++)  // go to 60 tracks
	{	
		add_li("bands", i + 1 + ". " + toplist.results[i]);	
		console.log(currentcountdown);
		currentcountdown = currentcountdown - 1;
		countnum.innerHTML = currentcountdown;	
		update_nowplaying(toplist.results[i])
	}		
	playTrack(toplist.results[i]);	
});

toplist.run(); //execute the toplist
}

function update_nowplaying(song) {
nowplaying.innerHTML = song;
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
