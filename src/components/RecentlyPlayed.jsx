import React, { Component } from "react";
import TextBox from "./TextBox";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class RecentlyPlayed extends Component {
  constructor() {
    super();
    this.state = {
      nameList: [],
      num: 20
    };
  }

  componentDidMount() {
    spotifyApi
      .getMyRecentlyPlayedTracks({ limit: this.state.num })
      .then(response => {
        this.setState({
          nameList: response.items.map(item => {
            return {
              name: item.track.name,
              artist: item.track.artists[0]
            };
          })
        });
      });
  }

  showTracks() {
    return (
      <div>
        {this.state.nameList.map((name, index) => {
          return (
            <li className="list-group-item" key={index}>
              {name.name} by {name.artist.name}
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
          Check Recent Tracks
        </button>
        <TextBox onChangeValue={this.handleChange.bind(this)} />
        {this.showTracks()}
      </div>
    );
  }
}

export default RecentlyPlayed;
