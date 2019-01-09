import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
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
      limit: 20 // Number of tracks to be displayed
    };
  }

  // Gets recommended tracks
  getRecTracks() {
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
      this.options.seed_artists === undefined
    ) {
      alert("Please select a genre, artist, and/or song");
    }
  }

  //--------------------- Show functions -------------------------------

  // Shows sliders with checkboxes
  showSliders() {
    return targetFeatures.targets.map((target, id) => {
      return (
        <Row key={id}>
          <Checkbox
            style={{ display: "inline" }}
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
      delete this.options.seed_genres;
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

  // Handles when search artist is cleared
  handleClearArtist(e) {
    if (e === undefined) {
      delete this.options.seed_artists;
    }
  }

  // Handles when search track is cleared
  handleClearTrack(e) {
    if (e === undefined) {
      delete this.options.seed_tracks;
    }
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
      <div className="container-fluid">
        <Row>
          <Col lg={5}>
            <TextBox onChangeValue={e => this.handleNumberOfSongs(e)} />
            <div class="search-bars">
              <SeedGenres onChangeValue={e => this.handleGenres(e)} />
              <SearchArtists
                handleClear={e => this.handleClearArtist(e)}
                handleSelect={value => this.handleArtist(value)}
              />
              <SearchTracks
                handleClear={e => this.handleClearTrack(e)}
                handleSelect={value => this.handleTrack(value)}
              />
            </div>
            <div style={{ marginTop: "40px", paddingLeft: "0px" }}>
              {this.showSliders()}
            </div>
            <button
              className="btn btn-dark"
              onClick={() => this.getRecTracks()}
            >
              Get Recordmendations
            </button>
          </Col>
          <Col lg={7}>
            <PlaylistWidget
              tracks={this.state.trackList.map(track => track.uri)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Recommendation;
