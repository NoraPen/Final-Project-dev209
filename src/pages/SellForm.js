import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

function SellForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // Pre-fill on back from preview
  const initialData = location.state || {
    title: '',
    description: '',
    price: '',
    image: '',
    category: ''
  };

  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [price, setPrice] = useState(initialData.price);
  const [image, setImage] = useState(initialData.image);
  const [category, setCategory] = useState(initialData.category);

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/sell-preview', {
      state: { title, description, price, image, category }
    });
  };

  return (
    <>
      <Navbar />
      <div className="container sell-page">
        <h2>Sell a Product - Form</h2>
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

          <button type="submit">Preview Listing</button>
        </form>
      </div>
    </>
  );
}

export default SellForm;