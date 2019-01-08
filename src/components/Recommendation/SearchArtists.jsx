import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class SearchArtists extends Component {
  searchType() {
    spotifyApi.searchArtists("elton john").then(res => console.log(res));
  }

  render() {
    return <div>{this.searchType()}</div>;
  }
}

export default SearchArtists;
