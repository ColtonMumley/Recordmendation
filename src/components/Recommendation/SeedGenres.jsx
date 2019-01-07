import React, { Component } from "react";
import Select from "react-select";

import * as data from "./genres.json";

class SeedGenres extends Component {
  // Values and labels for dropdown selections
  options = data.genres.map(genre => {
    return {
      value: genre,
      label: this.capitalize(genre)
    };
  });

  // Capitalizes the first letter of a string
  capitalize(s) {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  render() {
    return (
      <div>
        <Select
          isMulti
          defaultValue={{ value: "pop", label: "Pop" }}
          placeholder="Select Genres... (Max 5)"
          options={this.options}
          onChange={this.props.onChangeValue}
        />
      </div>
    );
  }
}

export default SeedGenres;
