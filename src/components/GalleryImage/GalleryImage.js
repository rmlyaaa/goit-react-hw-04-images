import { ModalImage } from 'components/ModalImage/ModalImage';
import { useState } from 'react';
import { Image } from './GalleryImage.styled';

export const GalleryImage = ({ image }) => {
  const [isOpen, setIsOpen] = useState(false);

  const modalClose = () => {
    setIsOpen(false);
  };

  const modalOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Image onClick={modalOpen} src={image.webformatURL} alt={image.tags} />
      <ModalImage
        isModalOpen={isOpen}
        modalClose={modalClose}
        largeImageURL={image.largeImageURL}
        tags={image.tags}
      />
    </>
  );
};
