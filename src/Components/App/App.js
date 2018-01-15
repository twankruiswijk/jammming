import React, {Component} from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchResults: staticSongs,
      playlistName: 'New Playlist',
      playlistTracks: staticSongs2,
    }

    this.search = this.search.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  search(searchTerm) {
    console.log(searchTerm);
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

    const trackURIs = playlistTracks.map(track => track.name); 
    console.log(`Saved ${playlistName}`, trackURIs)
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

const staticSongs = [
  {
    id: 1,
    name: 'Looking up',
    artist: 'Surfing Allowed',
    album: 'Looking up',
  },
  {
    id: 2,
    name: 'Hardwired',
    artist: 'Metallica',
    album: 'Hardwired',
  },
  {
    id: 3,
    name: 'Run',
    artist: 'Foo Fighters', 
    album: 'Concrete gold',
  },
]

const staticSongs2 = [
  {
    id: 4,
    name: 'Looking up 2',
    artist: 'Surfing Allowed',
    album: 'Looking up',
  },
  {
    id: 5,
    name: 'Hardwired 2',
    artist: 'Metallica',
    album: 'Hardwired',
  },
  {
    id: 6,
    name: 'Run 2',
    artist: 'Foo Fighters', 
    album: 'Concrete gold',
  },
]