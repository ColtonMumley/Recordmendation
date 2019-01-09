import React, { Component } from "react";
import { Select } from "antd";
import SpotifyWebApi from "spotify-web-api-js";

import "../css/Search.css";

const spotifyApi = new SpotifyWebApi();

class SearchTracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [], // Search results
      input: null // Default input for serach bar
    };
  }

  val = ""; // Value of search term

  fetchTrack(e) {
    this.setState({ input: e });
    this.val = e;
    spotifyApi.searchTracks(this.val).then(res =>
      this.setState({
        results: res.tracks.items
      })
    );
  }

  showOptions() {
    return this.state.results.map((track, i) => {
      return (
        <Select.Option key={i} value={track.id}>
          {track.name} by {track.artists[0].name}
        </Select.Option>
      );
    });
  }

  render() {
    return (
      <div>
        <Select
          allowClear={true}
          showArrow={false}
          className="searchbar"
          filterOption={false}
          placeholder="Search Tracks..."
          showSearch={true}
          notFoundContent={null}
          onSearch={e => this.fetchTrack(e)}
          onSelect={value => this.props.handleSelect(value)}
        >
          {this.showOptions()}
        </Select>
      </div>
    );
  }
}

export default SearchTracks;
