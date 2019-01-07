import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";

import "./css/NowPlaying.css";

const spotifyApi = new SpotifyWebApi();

class NowPlaying extends Component {
  constructor() {
    super();
    this.state = {
      name: "Nothing",
      artist: "None",
      image: "https://www.tunefind.com/i/album-art-empty.png",
      popularity: 0,
      id: "",
      audioFeatures: {}
    };
  }

  componentDidMount() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      if (response.item === undefined) {
        window.alert("Play somethin fool");
      } else {
        this.setState({
          name: response.item.name,
          artist: response.item.artists[0].name,
          image: response.item.album.images[0].url,
          popularity: response.item.popularity,
          id: response.item.id
        });
      }

      this.getTrackFeatures();
    });
  }

  getSongInfo() {
    var song = this.state.name;
    var artist = this.state.artist;
    return song + " by " + artist;
  }

  getTrackFeatures() {
    return spotifyApi.getAudioFeaturesForTrack(this.state.id).then(response =>
      this.setState({
        audioFeatures: response
      })
    );
  }

  render() {
    return (
      <div className="center">
        <button
          className="btn btn-dark"
          onClick={() => this.componentDidMount()}
        >
          Check Now Playing
        </button>
        <br />
        <div>
          <p>Now Playing: {this.getSongInfo()}</p>
        </div>
        <div>
          <img
            src={this.state.image}
            style={{ height: 150 }}
            alt="album cover"
          />
        </div>
        <p>Popularity: {this.state.popularity}</p>
        <p>Danceability: {this.state.audioFeatures.danceability * 100}</p>
        <p>Energy: {this.state.audioFeatures.energy * 100}</p>
        {/* {console.log(this.state.audioFeatures)} */}
      </div>
    );
  }
}

export default NowPlaying;
