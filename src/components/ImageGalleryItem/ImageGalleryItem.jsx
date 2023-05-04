// id - унікальний ідентифікатор
// webformatURL - посилання на маленьке зображення для списку карток
// largeImageURL - посилання на велике зображення для модального вікна

import { ImageModal } from 'components/Modal/Modal';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({image}) => {
  const [selectedImg, setSelectedImg] = useState(null);

  const closeModal = () => {
    setSelectedImg(null);
  };

  const setModalImg = () => {
    setSelectedImg(image.largeImageURL);
  };

  return (
    <>
      <li className="ImageGalleryItem">
        <img
          onClick={setModalImg}
          src={image.webformatURL}
          alt={image.tag}
          className="ImageGalleryItem-image"
        />
      </li>
      <ImageModal
        isOpen={selectedImg !== null}
        onClose={closeModal}
        image={selectedImg}
      />{' '}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};
