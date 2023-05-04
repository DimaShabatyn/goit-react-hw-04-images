// id - унікальний ідентифікатор
// webformatURL - посилання на маленьке зображення для списку карток
// largeImageURL - посилання на велике зображення для модального вікна

import { ImageModal } from 'components/Modal/Modal';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    selectedImg: null,
  };

  setSelectedImg = () => {
    console.log(this.props);
    this.setState({ selectedImg: this.props.image.largeImageURL });
  };

  closeModal = () => {
    this.setState({ selectedImg: null });
  };

  render() {
    const { image } = this.props;
    // console.log(image);
    const { selectedImg } = this.state;
    return (
      <>
        <li className="ImageGalleryItem">
          <img
            onClick={this.setSelectedImg}
            src={image.webformatURL}
            alt={image.tag}
            className="ImageGalleryItem-image"
          />
        </li>
        <ImageModal
          isOpen={selectedImg !== null}
          onClose={this.closeModal}
          image={selectedImg}
        />
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};