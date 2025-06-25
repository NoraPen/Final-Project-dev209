// src/pages/SellForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConfirmButton from '../components/ConfirmButton';
import '../pages.css';

function SellForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const db = getFirestore();
  const [submitting, setSubmitting] = useState(false);

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
  const [currentUser, setCurrentUser] = useState(null);

  // Ensure User in logged in when listing a product
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        navigate('/login', {
          state: { fromSell: true }
        });
      }
      }
    );
    return () => unsubscribe();
  }, [navigate]);

    // Image Upload using Cloudinary API
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

  // Submit product into Firestore database
  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!currentUser) return;

    setSubmitting(true); // Start loading

    try {
      await addDoc(collection(db, 'products'), {
        title,
        description,
        price: parseFloat(price),
        image,
        category: ['New Arrivals', category],
        sellerId: currentUser.uid,
        createdAt: new Date()
      });

      // Navigate to SellPreview page with preview of submitted products
      navigate('/sell-preview', {
        state: { title, description, price, image, category }
      });
    } catch (err) {
      console.error('Error submitting listing:', err);
      alert('Failed to submit listing. Please try again.');
    } finally {
      setSubmitting(false); // End loading
    }
  };
      
 
  return (
    <>
      <Navbar />
      <div className="container sell-page">
        <div className="welcome-message">
          <h1>Welcome to MiniCloset</h1>
          <p>Give your children’s clothes a new story by selling them through MiniCloset. We make it easy for parents to list items, find buyers, and give clothes a second life.</p>
        </div>

        <form onSubmit={handleSubmit} className="sell-form">
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
            <option value="Pajamas">Pajamas</option>
            <option value="Swim">Swim</option>
          </select>

          <ConfirmButton className="btn btn-primary" message="Are you sure you want to submit?" onConfirm={handleSubmit}>Submit Listing</ConfirmButton>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default SellForm;

