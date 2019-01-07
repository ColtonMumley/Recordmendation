import React, { Component } from "react";

class Friend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverData: ""
    };
  }

  componentDidMount() {
    return fetch("https://api.spotify.com/v1/users/coltronm12/playlists", {
      headers: { Authorization: "Bearer " + this.props.token }
    })
      .then(response => response.json())
      .then(data => console.log(data));
  }

  render() {
    return <div />;
  }
}

export default Friend;
