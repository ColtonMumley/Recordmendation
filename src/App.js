import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";

import Layout from "./components/Layout";
import "antd/dist/antd.css";
import "./App.css";

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.token = params.access_token;
    this.state = {
      loggedIn: this.token ? true : false
    };
    if (this.token) {
      spotifyApi.setAccessToken(this.token);
    }
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  showLogin() {
    if (this.state.loggedIn) {
      return "none";
    }
    return "";
  }

  render() {
    return (
      <div className="App">
        <a href="http://localhost:8888" style={{ display: this.showLogin() }}>
          <button className="btn-light btn-lg login-btn">
            Login With Spotify
          </button>
        </a>
        <Layout token={this.token} />
        {/* <Friend token={this.token} /> */}
      </div>
    );
  }
}

export default App;
