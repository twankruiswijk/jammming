import React, {Component} from 'react';
import Spotify from '../../util/Spotify';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

Spotify.getAccessToken();

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
    }

    this.search = this.search.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  search(searchTerm) {
    Spotify.search(searchTerm)
      .then(searchResults => this.setState({
        searchResults: searchResults,
      }));
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name,
    });
  }

  addTrack(track) {
    const listedTracks = this.state.playlistTracks;
    
    if (!listedTracks.find(listedTrack => listedTrack.id === track.id)) {
      this.setState({
        playlistTracks: listedTracks.concat(track),
      });
    }
  }

  removeTrack(track) {
    const listedTracks = this.state.playlistTracks;
    const filteredState = listedTracks.filter(listedTrack => listedTrack.id !== track.id);

    this.setState({
      playlistTracks: filteredState,
    });
  }

  savePlaylist() {
    const {playlistTracks, playlistName} = this.state;

    const trackURIs = playlistTracks.map(track => track.uri); 
    Spotify.savePlaylist(playlistName, trackURIs);

    this.setState({
      playlistName: 'New Playlist',
      searchResults: [],
      playlistTracks: [],
    })
  }

  render() {
    const {searchResults, playlistName, playlistTracks} = this.state;

    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>

        <div className="App">
          <SearchBar onSearch={this.search}/>

          <div className="App-playlist">
            <SearchResults songs={searchResults} onAdd={this.addTrack}/>
            
            <Playlist
              name={playlistName} 
              songs={playlistTracks} 
              onNameChange={this.updatePlaylistName} 
              onRemove={this.removeTrack}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
