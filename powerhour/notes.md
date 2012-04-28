# Power Hour Spotify App



Class: player

Properties:
----------

player.playing          (bool) - set or get if player is playing
player.position         (number) get or set the current position (or null) - perhaps in miliseconds?
player.canPlayNext      (bool) read-only

Methods:
-------

player.next             Skip to next track
player.play             Params: (track | context | index)
                                track: Link | Track | string
                                context: Album | playlist | Link | String

===========================

Class playlist:

new playlist (string name)

Properties: 
----------

length                  (number) tracks in playlist
name                    (string)
tracks                  (tracks) all the tracks - (discouraged for performance reasons)

Methods:
-------

add(track)
remove(track)