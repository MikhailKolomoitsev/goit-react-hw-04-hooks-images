import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ImageGalleryItem extends Component {
  static propTypes = {
    src: PropTypes.string,
    toggleModal: PropTypes.func,
  };

  state = {};

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("click", this.handleClosing);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.toggleModal();
    }
  };

  handleClosing = (e) => {
     const overlay=document.querySelector('.Overlay')
    if (e.target===overlay) {
      this.props.toggleModal();
    }
  };

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("click", this.handleClosing);
  }

  render() {
    return (
      <div className="Overlay">
        <div className="Modal">
          <img src={this.props.src} alt="" />
        </div>
      </div>
    );
  }
}
