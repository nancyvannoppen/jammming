import React, { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (!this.state.playlistTracks.includes(track.id)) {
      this.setState({playlistTracks: [].push(track.id)})
    }
  }

  removeTrack(track) {
    this.setState({playlistTracks: [].filter(track.id)})
    // this.state.playlistTracks = this.state.playlistTracks.filter(track.id);
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
  }

  setSearchTerm(term) {
    this.setState({
      searchTerm: term,
    });
  }

  search() {
    Spotify.search(this.state.searchTerm).then(
      (result) => {
        this.setState({
          searchTerm: '',
          searchResults: result,
        });
        if (result.length === 0) {
          this.setMessage('No matching tracks found.');
        }
      },
    ).catch(
      (error) => {
        this.setMessage(`${error}`);
      },
    );
  }
/*
  search(searchTerm) {
    console.log(searchTerm);
    this.Spotify.search(searchTerm).then(searchResults => {
      this.setState({
        searchResults: searchResults
      });
    });
  }*/

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar term={this.state.searchTerm} onTermChange={this.setSearchTerm} onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;