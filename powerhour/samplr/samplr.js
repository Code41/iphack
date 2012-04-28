var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var views = sp.require("sp://import/scripts/api/views");
var player = models.player;
exports.init = init;
var allTracks = new Array();

function init() {

var toplist = new models.Toplist();
toplist.toplistType = models.TOPLISTTYPE.REGION;
toplist.matchType = models.TOPLISTMATCHES.TRACKS;  //Choose tracks
toplist.region = "GB";  // use GB region

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
    
	for (i=0;i<60;i++)  // go to 60 tracks
	{	
		add_li("bands", i + 1 + ". " + toplist.results[i]);	
		allTracks[i] = toplist.results[i];	
	}		
	playTrack(toplist.results[i]);	
});

	toplist.run();
	console.log(toplist);

	var n = 60;
	doNextPlay(n,n);	//play next in T sec
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
     //console.log("Debug: Playing track " + uri);
	 sp.trackPlayer.playTrackFromUri(uri, {
        onSuccess: function() { console.log("success");} ,
        onFailure: function () { console.log("failure");},
        onComplete: function () { console.log("complete"); }
    });
	
}

// recursive function to keep playing tracks until n==0
function doNextPlay(n, max) 
{
	console.log("Debug: doNextPlay(" + n + "," + max + ")");
	n--;
	console.log("N decremented:" + n);
	
	if (n > 0) //if n==0, then skip and exit
	{		
		playTrack(getTopTrackNUri(n));	//start playing track		
		var t=setTimeout(function() { doNextPlay(n,max) },5000); // get and play next track in 60s			
	}
}

function getTopTrackNUri(n) // get the n'th top track
{
	console.log("Debug: GetTopTrack(" + n + ")");
	
	console.log(allTracks);
	console.log(allTracks[0]);
	console.log(allTracks[0].uri);
	
	console.log("ST1:" + allTracks.results[59].uri);
	
	startTrack=toplist.results[n].uri;	
	
	console.log("ST2:" + startTrack);
	
	
	//return n;
	return startTrack;
}

