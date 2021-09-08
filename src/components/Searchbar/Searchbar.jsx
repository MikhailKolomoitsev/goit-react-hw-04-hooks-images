import React, { Component } from "react";
// import PropTypes from "prop-types";

export default class Searchbar extends Component {
  // static propTypes = {
  //   onSubmit: PropTypes.func.isRequired,
  // };

  state = {
    imageName:''
  }
  
  handleInputeChange = e => {
    this.setState({imageName:e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(
      this.state.imageName
    )
    e.target.reset()
  }

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            onChange={this.handleInputeChange}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
