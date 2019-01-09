import React, { Component } from "react";
import { Select } from "antd";
import SpotifyWebApi from "spotify-web-api-js";

import "../css/Search.css";

const spotifyApi = new SpotifyWebApi();

class SearchArtists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [], // Search results
      input: null // Default input for serach bar
    };
  }

  val = ""; // Value of search term

  fetchArtist(e) {
    this.setState({ input: e });
    this.val = e;
    spotifyApi.searchArtists(this.val).then(res =>
      this.setState({
        results: res.artists.items
      })
    );
  }

  showOptions() {
    return this.state.results.map((artist, i) => {
      return (
        <Select.Option key={i} value={artist.id}>
          {artist.name}
        </Select.Option>
      );
    });
  }

  render() {
    return (
      <div>
        <Select
          onChange={e => this.props.handleClear(e)}
          allowClear={true}
          showArrow={false}
          className="searchbar"
          filterOption={false}
          placeholder="Search Artists..."
          showSearch={true}
          notFoundContent={null}
          onSearch={e => this.fetchArtist(e)}
          onSelect={value => this.props.handleSelect(value)}
        >
          {this.showOptions()}
        </Select>
      </div>
    );
  }
}

export default SearchArtists;
