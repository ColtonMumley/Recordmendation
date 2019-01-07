import React, { Component } from "react";
import { Row } from "antd";

import "../css/PlaylistWidget.css";

class PlaylistWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      loading: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props && nextProps !== undefined) {
      this.setState({
        tracks: nextProps.tracks
      });
    }
  }

  showTracks() {
    return this.state.tracks.map((uri, index) => {
      return (
        <Row key={index} className="widget-row">
          <div className="embed-container">
            <iframe
              src={"https://embed.spotify.com/?uri=" + uri}
              frameBorder="0"
              allow="encrypted-media"
              title="Song"
            />
          </div>
        </Row>
      );
    });
  }

  render() {
    return (
      <div>
        <h4>Your Recommendations</h4>
        <ul className="scrollbox">{this.showTracks()}</ul>
      </div>
    );
  }
}

export default PlaylistWidget;
