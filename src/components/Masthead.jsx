import React, { Component } from "react";

import "./css/Masthead.css";
import logo from "../img/logo.png";

class Masthead extends Component {
  render() {
    return (
      <div className="head">
        <img style={{ display: "inline" }} src={logo} />
      </div>
    );
  }
}

export default Masthead;
