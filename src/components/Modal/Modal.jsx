import Modal from 'react-modal';
import React from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { CloseBtn, ModalPicture } from './Modal.styled';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1300,
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: '1200',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '65vw',
    height: '650px',
    boxShadow: '2px 2px 2px #0f0f0f',
    border: 'none',
  },
};

Modal.setAppElement('#root');

export const ImageModal = ({ isOpen, image, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Inline Styles Modal Example"
      style={customStyles}
    >
      <CloseBtn onClick={onClose}>
        <MdOutlineClose />
      </CloseBtn>
      <ModalPicture src={image} alt="photo" width="640" />
    </Modal>
  );
};
