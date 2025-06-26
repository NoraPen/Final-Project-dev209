//src/components/ConfirmButton.js
import React, { useState } from 'react';

function ConfirmButton({ onConfirm, message = 'Are you sure?', children, className }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (window.confirm(message)) {
      try {
        setLoading(true);
        await onConfirm();
      } catch (error) {
        
        console.error('ConfirmButton error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? 'Processing...' : children}
    </button>
  );
}

export default ConfirmButton;