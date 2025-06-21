// src/pages/Buy.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Buy() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/new-arrivals');
  }, [navigate]);

  return null; // No UI shown
}

export default Buy;
