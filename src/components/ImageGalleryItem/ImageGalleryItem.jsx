import React from 'react';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className="gallery-item">
      <img
        className="photo-small"
        src={image.webformatURL}
        alt=""
        onClick={onClick}
      />
    </li>
  );
};

export default ImageGalleryItem;
