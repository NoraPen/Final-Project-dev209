import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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

  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [price, setPrice] = useState(initialData.price);
  const [image, setImage] = useState(initialData.image);
  const [category, setCategory] = useState(initialData.category);

  const handleEdit = () => {
    navigate('/sell', {
      state: { title, description, price, image, category }
    });
  };

  const handleSubmit = () => {
    alert('Listing submitted!');
  };

  return (
    <>
      <Navbar />
      <div className="container sell-page">
        <h2>Sell a Product - Preview</h2>

        <div className="product-preview">
          {image && <img src={image} alt="Preview" className="preview-image" />}
          <h3>{title}</h3>
          <p><em>Category: {category}</em></p>
          <p>{description}</p>
          <p><strong>${price}</strong></p>
        </div>

        <button onClick={handleEdit} className="btn">Edit Listing</button>
        <button onClick={handleSubmit} className="btn submit-btn">Submit Listing</button>
      </div>

<Footer />
    </>
  );
}

export default SellPreview;