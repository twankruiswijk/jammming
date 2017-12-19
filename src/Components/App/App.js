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
      playlistTracks: staticSongs,
    }
  }

  render() {
    const {searchResults, playlistName, playlistTracks} = this.state;

    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>

          <div className="App-playlist">
            <SearchResults songs={searchResults}/>
            
            <Playlist name={playlistName} songs={playlistTracks}/>
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