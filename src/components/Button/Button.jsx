import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  };

  render() {
    return (
      <button
        className="Button"
        type="button"
        onClick={this.props.onClick}
      >
        Load More
      </button>
    );
  }
}
