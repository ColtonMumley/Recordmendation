import React, { Component } from "react";
import { Input } from "antd";

class TextBox extends Component {
  render() {
    return (
      <div>
        <p style={{ display: "inline", margin: "15px" }}>
          Enter the number of songs:
        </p>
        <Input
          style={{ display: "inline", width: "100px" }}
          type="number"
          min="1"
          max="50"
          placeholder="(Max 50)"
          onChange={this.props.onChangeValue}
        />
      </div>
    );
  }
}

export default TextBox;
