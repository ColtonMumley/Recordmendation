import React, { Component } from "react";
import { Slider } from "antd";

class CustomSlider extends Component {
  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <Slider
          disabled={this.props.disabled}
          style={{ width: "300px" }}
          onAfterChange={this.props.onChangeValue}
          defaultValue={50}
        />
      </div>
    );
  }
}

export default CustomSlider;
