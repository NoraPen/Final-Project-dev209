import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../style.css';
import '../pages.css';

function SellForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state || {
      title: '',
      description: '',
      price: '',
      image: '',
      category: ''
    };
  
 
  const handlePreview = (e) => {
    e.preventDefault();
    navigate('/sell-preview', { state: formData }); // Pass formData to preview
  };
  // Define all state first
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [price, setPrice] = useState(initialData.price);
  const [image, setImage] = useState(initialData.image);
  const [category, setCategory] = useState(initialData.category);

  // Now use those values safely
  const formData = {
    title,
    price,
    image
  };
  const handleNext = (e) => {
    e.preventDefault();
    navigate('/sell-preview', {
      state: { title, description, price, image, category }
    });
  };

  return (
    <>
      <Navbar />
      <div className="container-sell-form">
        <h2>Sell Product</h2>
        
        <p>Give your children’s clothes a new story by selling them through MiniCloset!</p>
        <form onSubmit={handleNext} className="sell-form">
          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price ($)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select Category</option>
            <option value="Baby">Baby</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
            <option value="NewArrivals">New Arrivals</option>
            <option value="Pajamas">Pajamas</option>
            <option value="Swim">Swim</option>
          </select>

          <button type="submit">Show Preview</button>
        </form>
      </div>
      <footer className="footer-custom">
  <div className="footer-content">
    <p>📍 123 Sunshine St, Seattle, WA</p>
    <p>📞 (123) 456-7890</p>
    <p>📧 contact@minicloset.com</p>
    <p>📸 Instagram: @minicloset_app</p>
  </div>
  <div className="footer-bottom">
    <p>© 2025 Mini Closet. All rights reserved.</p>
  </div>
</footer>
    </>
  );
}

export default SellForm;