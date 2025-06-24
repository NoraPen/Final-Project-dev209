// src/components/ConfirmButton.js
import React from 'react';

function ConfirmButton({ onConfirm, message = 'Are you sure?', children, className }) {
  const handleClick = () => {
    if (window.confirm(message)) {
      onConfirm();
    }
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
export default ConfirmButton;