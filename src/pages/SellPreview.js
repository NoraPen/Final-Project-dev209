import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../pages.css';

function SellPreview() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialData = location.state || {
    title: '',
    description: '',
    price: '',
    image: '',
    category: ''
  };

  const [title] = useState(initialData.title);
  const [description] = useState(initialData.description);
  const [price] = useState(initialData.price);
  const [image] = useState(initialData.image);
  const [category] = useState(initialData.category);

  const handleEdit = () => {
    navigate('/sell', {
      state: { title, description, price, image, category }
    });
  };

  const handleSubmit = () => {
    alert('Your listing is now live!');
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
          <p><em>Category: {category}</em></p>
          <p>{description}</p>
          <p><strong>${price}</strong></p>
        </div>

        <div className="button-group">
          <button onClick={handleEdit} className="btn">See Listing</button>
          <button onClick={handleSubmit} className="btn submit-btn">Sell Another Item</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SellPreview;
