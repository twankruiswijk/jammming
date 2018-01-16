const clientId = '41e968a2cb2547e1bcbacf16a35de26a';
const redirectURI = 'http://localhost:3000/'
const spotifyURL = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectURI}`;

let accessToken, expiresIn;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      expiresIn = urlExpiresIn[1];
      
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    }
      
    return window.location = spotifyURL;
  },

  search(searchTerm) {
    const searchURL = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
    const headers = {Authorization: `Bearer ${accessToken}`};

    return fetch(searchURL, {headers: headers})
      .then(response => response.json())
        .then(jsonResponse => {
          if (!jsonResponse.tracks) {
            return [];
          }

          return jsonResponse.tracks.items.map(track => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
            }
          });
        });
  },

  savePlaylist(playlistName, trackURIs) {    
    if(!playlistName || trackURIs.length === 0 || !trackURIs) {
      return;
    }

    const headers = {Authorization: `Bearer ${accessToken}`};
    let userID, playlistID;

    fetch('https://api.spotify.com/v1/me', {headers: headers})
      .then(response => response.json())
      .then(jsonResponse => userID = jsonResponse.id)
      .then(() => {
        fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({name: playlistName})
          })
          .then(response => response.json())
          .then(jsonResponse => playlistID = jsonResponse.id)
          .then(() => {
            fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify({uris: trackURIs})
            });
          })
    })
  }
};

export default Spotify;