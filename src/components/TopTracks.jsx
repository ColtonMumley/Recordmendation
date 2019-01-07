import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";

import TextBox from "./TextBox";

const spotifyApi = new SpotifyWebApi();

class TopTracks extends Component {
  constructor() {
    super();
    this.state = {
      trackList: [],
      num: 20
    };
  }

  componentDidMount() {
    spotifyApi.getMyTopTracks({ limit: this.state.num }).then(response => {
      this.setState({
        trackList: response.items.map(item => {
          return {
            track: item.name,
            artist: item.artists[0]
          };
        })
      });
    });
  }

  showTracks() {
    return (
      <div>
        {this.state.trackList.map((name, index) => {
          return (
            <li className="list-group-item" key={index}>
              {name.track} by {name.artist.name}
            </li>
          );
        })}
      </div>
    );
  }

  handleChange(e) {
    this.setState({ num: e.target.value });
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-dark"
          onClick={() => this.componentDidMount()}
        >
          Check Top Tracks
        </button>
        <TextBox onChangeValue={this.handleChange.bind(this)} />
        {this.showTracks()}
      </div>
    );
  }
}

export default TopTracks;
