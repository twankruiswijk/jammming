import React, {Component} from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
  constructor() {
    super();

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    // Even when it's one prop I want to stay consistent with the destrucetring of props/state
    const {onNameChange} = this.props;

    onNameChange(event.target.value);
  }

  render() {
    const {name, songs, onRemove, onSave} = this.props;

    return (
      <div className="Playlist">
        <input defaultValue={name} onChange={this.handleNameChange}/>
        
        <TrackList songs={songs} onRemove={onRemove}/>

        <a className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
