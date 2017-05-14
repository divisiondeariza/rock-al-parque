import spotipy

spotify = spotipy.Spotify()

def getTopTracksFromArtistByName(name):
	uri = getArtistURIByName(name)
	try:
		response = spotify.artist_top_tracks(uri)
		return [getTrackInfo(track) for track in response["tracks"]]
	except spotipy.SpotifyException:
		print "not found"
		return []


def getTrackInfo(track):
	return {"track":track['name'], 
		"audio":track['preview_url'], 
		"cover":track['album']['images'][0]['url']} 



def getArtistURIByName(name):
	return 'spotify:artist:' + getArtistIDByName(name)


def getArtistIDByName(name):
	response = spotify.search(q=name, type='artist')
	if response["artists"]["items"] == []:
		return ""
	return response["artists"]["items"][0]["id"]

