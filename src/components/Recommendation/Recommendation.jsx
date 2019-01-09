import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-js";
import { Checkbox } from "antd";

import CustomSlider from "./CustomSlider";
import TextBox from "../TextBox";
import SeedGenres from "./SeedGenres";
import PlaylistWidget from "./PlaylistWidget";
import SearchArtists from "./SearchArtists";
import SearchTracks from "./SearchTracks";

import "../css/Recommendation.css";
import * as targetFeatures from "./targetFeatures.json";

const spotifyApi = new SpotifyWebApi();

class Recommendation extends Component {
  constructor() {
    super();
    this.state = {
      trackList: [], // Array of recommended tracks
      genres: [{ value: "pop", label: "Pop" }], //Array of seed_genres
      sliderDisabled: [true, true, true, true, true, true, true], // All sliders are disabled initially
      popularity: 50, // Initial target_popularity
      energy: 0.5, // Initial target_energy
      danceability: 0.5, // Initial target_danceability
      valence: 0.5, // Initial target_valence
      acousticness: 0.5, // Initial target_acousticness
      instrumentalness: 0.5, // Initial target_instrumentalness
      liveness: 0.5 // Initial target_liveness
    };

    // Initialized options to be passed to getRecommendations()
    this.options = {
      limit: 20, // Number of tracks to be displayed
      seed_artists: "", // Inital seed_artist
      seed_genres: "", // Initial seed_genre
      seed_tracks: "" // Initial seed_track
    };
  }

  // Gets recommended tracks
  componentDidMount() {
    this.checkForEmptySeeds();
    spotifyApi
      .getRecommendations(this.options)
      .then(res => {
        this.setState({
          // Maps each track to get name and artist
          trackList: res.tracks.map(track => {
            return {
              name: track.name,
              artist: track.artists[0].name,
              uri: track.uri
            };
          })
        });
      })
      .catch(error => console.log(error));
  }

  checkForEmptySeeds() {
    if (
      this.options.seed_tracks === undefined &&
      this.options.seed_genres === undefined &&
      this.options.seed_tracks === undefined
    ) {
      alert("Please select a genre, artist, and/or song");
    }
    if (this.options.seed_artists === "") {
      delete this.options.seed_artists;
    }
    if (this.options.seed_genres === "") {
      delete this.options.seed_genres;
    }
    if (this.options.seed_tracks === "") {
      delete this.options.seed_tracks;
    }
  }

  //--------------------- Show functions -------------------------------

  // Shows sliders with checkboxes
  showSliders() {
    return targetFeatures.targets.map((target, id) => {
      return (
        <Row key={id}>
          <Checkbox
            onChange={e => this.handleCheckbox(e, "target_" + target.value, id)}
          />
          <CustomSlider
            disabled={this.state.sliderDisabled[id]}
            label={target.label}
            onChangeValue={e =>
              this.handleSlider(e, target.value, target.isDecimal)
            }
          />
        </Row>
      );
    });
  }

  //----------------------- End show functions --------------------------

  //----------------------- Handler functions ---------------------------

  // Handles new number of songs to be shown
  handleNumberOfSongs(e) {
    this.options.limit = e.target.value;
  }

  // Handles new seed_genre
  handleGenres(e) {
    if (e == null) {
      this.options.seed_genres = "";
    } else {
      this.options.seed_genres = e.value;
    }
  }

  // Handles new seed_artist
  handleArtist(value) {
    this.options.seed_artists = value;
  }

  // Handles new seed_track
  handleTrack(value) {
    this.options.seed_tracks = value;
  }

  // Handles any slider dynamically
  handleSlider(e, name, isDecimal) {
    // If the slider should be from 0.0-1.0, divide the value by 100
    if (isDecimal) {
      e /= 100;
    }
    this.options["target_" + name] = e;
    this.setState({ [name]: e });
  }

  // Handles any disable button dynamically
  handleCheckbox(e, property, id) {
    // ie. property = target_energy, split_property = energy
    let splitProperty = property.split("_")[1];
    let newArray = [...this.state.sliderDisabled];
    // if e.target.checked, slider is enabled
    if (e.target.checked) {
      this.options[property] = this.state[splitProperty];
      newArray[id] = false;
    } else {
      delete this.options[property];
      newArray[id] = true;
    }

    this.setState({ sliderDisabled: newArray });
  }
  //----------------------- End handler functions -----------------------

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
                Get Recordmendations
              </button>
              <TextBox onChangeValue={e => this.handleNumberOfSongs(e)} />
              <p />
              <SeedGenres onChangeValue={e => this.handleGenres(e)} />
              <SearchArtists handleSelect={value => this.handleArtist(value)} />
              <SearchTracks handleSelect={value => this.handleTrack(value)} />
              <div style={{ marginTop: "40px", paddingLeft: "0px" }}>
                {this.showSliders()}
              </div>
            </Col>
            <Col md={12} lg={4}>
              <PlaylistWidget
                tracks={this.state.trackList.map(track => track.uri)}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Recommendation;
