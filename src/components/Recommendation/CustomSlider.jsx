import React, { Component } from "react";
import { Slider } from "antd";

import "../css/CustomSlider.css";

class CustomSlider extends Component {
  render() {
    return (
      <div className="wrapper">
        <p>{this.props.label}</p>
        <Slider
          disabled={this.props.disabled}
          style={{ width: "90%" }}
          onAfterChange={this.props.onChangeValue}
          defaultValue={50}
        />
      </div>
    );
  }
}

export default CustomSlider;
