import React, {Component} from 'react';
import './TrackList.css';

import Track from '../Track/Track';

class TrackList extends Component {
  render() {
    const {songs} = this.props;
    
    const tracks = songs.map((song, index) => {
      const {onAdd, onRemove} = this.props;
      
      return <Track key={`song-${song.id}`} track={song} onAdd={onAdd} onRemove={onRemove}/>;
    })

    return (
      <div className="TrackList">
        {tracks}
      </div>
    );
  }
}

export default TrackList;
