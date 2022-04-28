import { Modal } from 'components/Modal/Modal';
import { useEffect, useState } from 'react';
import {
  ImageGalleryCard,
  ImageGalleryCardImg,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webImage, modalImage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    function handleKeyEsc(evt) {
      if (evt.code === 'Escape') setIsModalOpen(false);
    }
    window.document.addEventListener('keydown', handleKeyEsc);
    return function cleanup() {
      window.document.removeEventListener('keydown', handleKeyEsc);
    };
  });

  const handleOverlayClick = evt => {
    if (evt.target === evt.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <ImageGalleryCard>
      <ImageGalleryCardImg
        src={webImage}
        alt="name"
        onClick={() => {
          setIsModalOpen(true);
        }}
      />
      {isModalOpen && (
        <Modal image={modalImage} handleOverlayClick={handleOverlayClick} />
      )}
    </ImageGalleryCard>
  );
};

ImageGalleryItem.propTypes = {
  webImage: PropTypes.string.isRequired,
  modalImage: PropTypes.string.isRequired,
};
