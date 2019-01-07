import React, { Component } from "react";

class TextBox extends Component {
  render() {
    return (
      <div>
        <p style={{ display: "inline-block", margin: "15px" }}>
          Enter the number of songs:
        </p>
        <input
          type="number"
          min="1"
          max="50"
          defaultValue="10"
          onChange={this.props.onChangeValue}
        />
      </div>
    );
  }
}

export default TextBox;
