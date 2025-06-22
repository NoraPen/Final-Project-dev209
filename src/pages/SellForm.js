import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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

  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [price, setPrice] = useState(initialData.price);
  const [image, setImage] = useState(initialData.image);
  const [category, setCategory] = useState(initialData.category);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'upload_section');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/djqlk6e9h/image/upload',
        formData
      );
      setImage(res.data.secure_url);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
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
      <div className="container sell-page">
        <div className="welcome-message">
          <h1>Welcome to MiniCloset</h1>
          <p>Give your children’s clothes a new story by selling them through MiniCloset. We make it easy for parents to list items, find buyers, and give clothes a second life.</p>
        </div>

        <form onSubmit={handleNext} className="sell-form">
          <h2>List Your Product</h2>

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
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
          {uploading && <p>Uploading image...</p>}

          {image && (
            <div style={{ marginTop: '10px' }}>
              <img
                src={image}
                alt="Uploaded"
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  marginBottom: '5px'
                }}
              />
              <input type="text" value={image} readOnly />
            </div>
          )}

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
      <Footer />
    </>
  );
}

export default SellForm;


