import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-js";

import CustomSlider from "./CustomSlider";
import TextBox from "../TextBox";
import SeedGenres from "./SeedGenres";
import "../css/Recommendation.css";

const spotifyApi = new SpotifyWebApi();

class Recommendation extends Component {
  constructor() {
    super();
    this.state = {
      trackList: [], // Array of recommended tracks
      num: 10, // Number of tracks to be displayed
      genres: [{ value: "pop", label: "Pop" }], //Array of seed_genres
      popularity: 50,
      danceability: 50
    };

    this.options = {
      limit: this.state.num,
      seed_genres: this.state.genres.map(genre => genre.value),
      target_popularity: this.state.popularity,
      target_danceability: this.state.danceability
    };
  }

  // Gets recommended tracks
  componentDidMount() {
    spotifyApi
      .getRecommendations(this.options)
      .then(res => {
        this.setState({
          // Maps each track to get name and artist
          trackList: res.tracks.map(track => {
            return {
              name: track.name,
              artist: track.artists[0].name
            };
          })
        });
      })
      .catch(error => console.log(error));
  }

  // Displays a list of recommended tracks
  showTracks() {
    return (
      <div>
        {this.state.trackList.map((track, index) => {
          return (
            <li className="list-group-item" key={index}>
              {track.name} by {track.artist}
            </li>
          );
        })}
      </div>
    );
  }

  // Handles new number of songs to be shown
  handleNumberOfSongs(e) {
    this.setState({ num: e.target.value });
    // this.options.limit = e.target.value;
  }

  // Handles new seed_genre
  handleGenres(e) {
    // this.options.seed_genres = e.map(genre => genre);
    if (e.length <= 5) {
      this.setState({ genres: e.map(genre => genre) });
    }
  }

  handleSlider(e, name, isDecimal) {
    if (isDecimal) {
      e /= 100;
    }
    this.setState({
      [name]: e
    });
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={12} lg={4}>
              <button
                className="btn btn-dark"
                onClick={() => this.componentDidMount()}
              >
                Get Recommendations{" "}
              </button>
              <TextBox onChangeValue={e => this.handleNumberOfSongs(e)} />
              <p>Select Genres</p>
              <SeedGenres onChangeValue={e => this.handleGenres(e)} />
            </Col>
            <Col md={12} lg={4}>
              <CustomSlider
                label="Popularity"
                onChangeValue={e => this.handleSlider(e, "popularity", false)}
              />
              <CustomSlider
                label="Danceability"
                onChangeValue={e => this.handleSlider(e, "danceability", true)}
              />
            </Col>
          </Row>
          <Row>
            <ul style={{ marginTop: "40px", paddingLeft: "0px" }}>
              {this.showTracks()}
            </ul>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Recommendation;
