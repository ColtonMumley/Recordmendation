import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class Me extends Component {
  constructor() {
    super();
    this.state = {
      name: "no name",
      id: "",
      image:
        "https://winkeyecare.com/wp-content/uploads/2013/03/Empty-Profile-Picture-450x450.jpg"
    };
  }

  componentDidMount() {
    spotifyApi.getMe().then(response => {
      this.setState({
        name: response.display_name,
        id: response.id,
        image: response.images[0].url
      });
    });
  }

  render() {
    return (
      <div>
        <p>Username: {this.state.name}</p>
        <p>Id: {this.state.id}</p>
        <img src={this.state.image} style={{ width: 150 }} alt="profile" />
      </div>
    );
  }
}

export default Me;
