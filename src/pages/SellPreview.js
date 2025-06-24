// src/pages/SellPreview.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../pages.css';

function SellPreview() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    title = '',
    description = '',
    price = '',
    image = '',
    category = ''
  } = location.state || {};

  const handleSeeHistory = () => {
    navigate('/account');
  };

  const handleSubmitAnother = () => {
    navigate('/sell');
  };

  return (
    <>
      <Navbar />
      <div className="container sell-preview-container">
        <div className="confirmation-message">
          <h1>🎉 Congratulations!</h1>
          <p>Your listing is now live on MiniCloset.</p>
          <p>We’ll notify you once someone is interested or the item is sold.</p>
        </div>

        <div className="preview-card">
          {image && <img src={image} alt="Preview" className="preview-image" />}
          <h2>{title}</h2>
          <p><em>Category: {Array.isArray(category) ? category.join(', ') : category}</em></p>
          <p>{description}</p>
          <p><strong>${parseFloat(price).toFixed(2)}</strong></p>
        </div>

        <div className="button-group">
          <button onClick={handleSeeHistory} className="btn">See History</button>
          <button onClick={handleSubmitAnother} className="btn submit-btn">Sell Another Item</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SellPreview;