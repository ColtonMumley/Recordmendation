import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { Row, Modal, Button } from "antd";

import "../css/PlaylistWidget.css";

const spotifyApi = new SpotifyWebApi();

class PlaylistWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [], // List of recommended track uris
      modalIsVisible: false, // Determines of modal is visible
      modalInput: "Recordmendations", // Default playlist name
      playlistId: "" // id of newly created playlist
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props && nextProps !== undefined) {
      this.setState({
        tracks: nextProps.tracks
      });
    }
  }

  //----------------------- Show functions --------------------------
  showTracks() {
    return this.state.tracks.map((uri, index) => {
      return (
        <Row key={index} className="widget-row">
          <div className="embed-container">
            <iframe
              src={"https://embed.spotify.com/?uri=" + uri}
              frameBorder="0"
              allow="encrypted-media"
              title="Song"
            />
          </div>
        </Row>
      );
    });
  }

  showModal() {
    this.setState({ modalIsVisible: true });
  }

  //----------------------- End show functions --------------------------

  //----------------------- Handler functions --------------------------

  // Hides modals then calls createPlaylist()
  handleOk() {
    this.setState({
      modalIsVisible: false
    });
    this.createPlaylist();
  }

  // Hides modal and sets modalInput back to default
  handleCancel() {
    this.setState({
      modalIsVisible: false,
      modalInput: "Recordmendations"
    });
  }

  // Sets modalInput to value of input in the modal
  handleInput(e) {
    this.setState({ modalInput: e.target.value });
  }

  //----------------------- End handler functions -----------------------

  // Creates an empty playlist and sets playlistId to the id of the new playlist
  createPlaylist() {
    spotifyApi
      .createPlaylist({ name: this.state.modalInput })
      .then(res => this.setState({ playlistId: res.id }));
    // Wait three seconds to addTracks() while setting state
    setTimeout(() => this.addTracks(), 3000);
  }

  // Adds recommended tracks to playlist
  addTracks() {
    let { playlistId, tracks } = this.state;
    spotifyApi.addTracksToPlaylist(playlistId, tracks);
  }

  render() {
    return (
      <div>
        <h4>Your Recommendations</h4>
        <ul className="scrollbox">{this.showTracks()}</ul>
        <button className="btn btn-dark" onClick={() => this.showModal()}>
          Add These Songs To A Playlist
        </button>
        <Modal
          title="What will you call this playlist?"
          visible={this.state.modalIsVisible}
          onOk={() => this.handleOk()}
          onCancel={() => this.handleCancel()}
        >
          <input
            type="text"
            placeholder="Enter playlist name..."
            onChange={e => this.handleInput(e)}
          />
        </Modal>
      </div>
    );
  }
}

export default PlaylistWidget;
