import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ProductCard from '../components/ProductCard';
import { getAuth } from 'firebase/auth';

function SellPreview() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  

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

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        title,
        description,
        price: Number(price),
        image,
        category,
        createdAt: new Date(),
        sellerId: currentUser.uid,
      });

      await addDoc(collection(db, 'userSales'), {
      productId: docRef.id,
      sellerId: currentUser.uid,
      title,
      price: Number(price),
      createdAt: new Date(),
      soldAt: null,
    });
      alert('Listing submitted!');
      navigate('/new-arrivals'); // Redirect to buy page after submit
    } catch (err) {
      alert('Error submitting listing: ' + err.message);
    }
  };

  //only show if logged in
   if (!currentUser) {
    return (
      <>
        <Navbar />
        <div className="container-sell-page">
          <h2>Please log in to preview your listing.</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container-sell-page">
        <h2>Sell Product</h2>
        <h3>Preview</h3> 

        <div className="sell-preview-row">
          <div className="sell-preview-col card-col">
            <ProductCard
              image={image}
              title={title}
              price={price}
              buttonText="Edit Listing"
              buttonLink="#"
            />
          </div>
          <div className="sell-preview-col text-col">
            <p><strong>Title:</strong> {title}</p>
            <p><em>Category:</em> {category}</p>
            <p>Description: {description}</p>
            <p>Price: ${Number(price).toFixed(2)}</p>
          </div>
        </div>

        <button onClick={handleEdit} className="btn">Edit Listing</button>
        <button onClick={handleSubmit} className="btn submit-btn">Submit Listing</button>
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

export default SellPreview;