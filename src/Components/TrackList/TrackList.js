import React, {Component} from 'react';
import './TrackList.css';

import Track from '../Track/Track';

class TrackList extends Component {
  render() {
    const {songs} = this.props;
    
    const tracks = songs.map((song, index) => {
      return <Track key={`song-${song.id}`} songMeta={song}/>;
    })

    return (
      <div className="TrackList">
        {tracks}
      </div>
    );
  }
}

export default TrackList;
