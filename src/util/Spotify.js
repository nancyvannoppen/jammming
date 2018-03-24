const clientID = 'ccca97649be44be7aaa24c7287025385';
const redirectURI = 'http://localhost:3000/';

let accessToken = '';

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else if (window.location.href.match('/access_token=([^&]*)/', '/expires_in=([^&]*)/')) {
      let expiresIn = 5;
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(searchTerm) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      }
    });
  },

  savePlaylist(playlistName, trackURIs) {
    if (!playlistName && !trackURIs) {
      return;
    } else {
      let accessToken = this.getAccessToken();
      let headers = {
        Authorization: accessToken
      };
      let userId;
      return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(jsonResponse => {
        if (jsonResponse.id) {}
      });
    }
  }

};

export default Spotify;
