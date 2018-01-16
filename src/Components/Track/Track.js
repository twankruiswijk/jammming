import React, {Component} from 'react';
import './Track.css';

class Track extends Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    const {onAdd} = this.props;

    if (onAdd) {
      return <a className="Track-action" onClick={this.addTrack}>+</a>;
    }

    return <a className="Track-action" onClick={this.removeTrack}>-</a>;
  }

  addTrack() {
    const {track, onAdd} = this.props;

    onAdd(track);
  }

  removeTrack() {
    const {track, onRemove} = this.props;

    onRemove(track);
  }

  renderPreview() {
    const {track: {previewURL}} = this.props;

    if (previewURL === null) {
      return <p className="previewMessage">There is no preview available</p>
    }
    
    return (
      <audio controls preload="none">
        <source src={previewURL} type="audio/mpeg"/>
      </audio>
    );
  }

  render() {
    const {track: {name, artist, album}} = this.props;
    const trackAction = this.renderAction();
    const audioPreview = this.renderPreview();

    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{name}</h3>
          <p>{artist} | {album}</p>

          {audioPreview}
        </div>

        {trackAction}
      </div>
    );
  }
}

export default Track;
