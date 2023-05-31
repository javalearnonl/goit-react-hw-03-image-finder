import React from 'react';

const Modal = ({ image, onClose }) => {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal">
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default Modal;
