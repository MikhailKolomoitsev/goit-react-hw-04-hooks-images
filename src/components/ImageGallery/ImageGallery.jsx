import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'

export default class ImageGalary extends Component {
  static propTypes = {
    pics: PropTypes.array,
    openlargeimage: PropTypes.func,
  }

  state = {}

  render() {
    return (
      <ul className="ImageGallery">
        {this.props.pics.map((pic) => {
          return (
            <ImageGalleryItem
              openlargeimage={this.props.openlargeimage}
              key={pic.id}
              src={pic.webformatURL}
              alt={pic.webformatURL}
              large={pic.largeImageURL}
            />
          )
        })}
      </ul>
    )
  }
}
