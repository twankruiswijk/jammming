import React, {Component} from 'react';
import './Track.css';

class Track extends Component {
  renderAction(isRemoval) {
    if (!isRemoval) {
      return '+';
    }

    return '-';
  }

  render() {
    const {songMeta: {name, artist, album}} = this.props;
    const trackAction = this.renderAction(false);

    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{name}</h3>
          <p>{artist} | {album}</p>
        </div>

        <a className="Track-action">{trackAction}</a>
      </div>
    );
  }
}

export default Track;
