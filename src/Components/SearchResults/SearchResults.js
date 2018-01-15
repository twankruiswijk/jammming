import React, {Component} from 'react';
import './SearchResults.css';

import TrackList from '../TrackList/TrackList';

class SearchResults extends Component {
  render() {
    const {songs, onAdd} = this.props;

    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList songs={songs} onAdd={onAdd}/>
      </div>
    );
  }
}

export default SearchResults;
