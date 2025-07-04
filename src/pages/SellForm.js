import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getFirestore, collection, addDoc, doc, updateDoc } from 'firebase/firestore';
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
  const [uploading, setUploading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Get initial data (edit mode) or default empty
  const initialData = location.state || {
    id: null,
    title: '',
    description: '',
    price: '',
    image: '',
    category: ''
  };

  // Normalize category: if array, use second item, else use string or empty
  const initialCategory = Array.isArray(initialData.category)
    ? (initialData.category[1] || '')
    : (initialData.category || '');

  // Clean price: remove all but digits and dot, convert to string
  const cleanedPrice = initialData.price
    ? initialData.price.toString().replace(/[^0-9.]/g, '')
    : '';

  // Set states with normalized initial values
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [price, setPrice] = useState(cleanedPrice);
  const [image, setImage] = useState(initialData.image || '');
  const [category, setCategory] = useState(initialCategory);

  const isEdit = !!initialData.id;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        navigate('/login', { state: { fromSell: true } });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

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

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (!currentUser) return;

    // Validate all fields, trim category and title to avoid false positives on whitespace
    if (
      !title.trim() ||
      !description.trim() ||
      !price ||
      !image ||
      !category.trim()
    ) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    // Parse price as float and check NaN
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      alert('Please enter a valid price.');
      return;
    }

    setSubmitting(true);

    try {
      if (isEdit) {
        // Update existing listing
        const docRef = doc(db, 'products', initialData.id);
        await updateDoc(docRef, {
          title,
          description,
          price: numericPrice,
          image,
          category: ['New Arrivals', category]
        });
        alert('Listing updated successfully!');
      } else {
        // Add new listing
        const docRef = await addDoc(collection(db, 'products'), {
          title,
          description,
          price: numericPrice,
          image,
          category: ['New Arrivals', category],
          sellerId: currentUser.uid,
          createdAt: new Date()
        });

        const newProductId = docRef.id;
        await updateDoc(docRef, { id: newProductId });

        alert('Listing created successfully!');
      }

      navigate('/sell-preview', {
        state: { title, description, price: numericPrice, image, category }
      });
    } catch (err) {
      console.error('Error saving listing:', err);
      alert('Failed to submit listing. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container sell-page">
        <div className="welcome-message">
          <h1>{isEdit ? 'Edit Your Listing' : 'Welcome to MiniCloset'}</h1>
          {!isEdit && (
            <p>
              Give your children’s clothes a new story by selling them through MiniCloset. We make it
              easy for parents to list items, find buyers, and give clothes a second life.
            </p>
          )}
        </div>

        <form className="sell-form" onSubmit={handleSubmit}>
          <h2>{isEdit ? 'Update Product Details' : 'List Your Product'}</h2>

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
            required={!image}
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

          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="" disabled>Select Category</option>
            <option value="Baby">Baby</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
            <option value="Pajamas">Pajamas</option>
            <option value="Swim">Swim</option>
          </select>

          <ConfirmButton
            className="btn btn-primary"
            message={isEdit ? 'Save changes to this listing?' : 'Are you sure you want to submit?'}
            onConfirm={handleSubmit}
          >
            {isEdit ? 'Update Listing' : 'Submit Listing'}
          </ConfirmButton>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default SellForm;
