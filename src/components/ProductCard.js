// src/pages/SellForm.js
import { getFirestore, collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmButton from "../components/ConfirmButton";
import { serverTimestamp } from 'firebase/firestore';

function ProductCard({ product, onDelete }) {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [isBuying, setIsBuying] = useState(false);

  const handleBuyNow = async () => {
    if (!user) {
      alert('Please log in to buy.');
      return;
    }
    if (product.sellerId === user.uid) {
      alert("This product belongs to your account.");
      return;
    }

    try {
      setIsBuying(true);
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        productName: product.title,
        productPrice: product.price,
        productImage: product.image,
        timestamp: serverTimestamp(),
        productCategory: product.category,
      });
      alert('Purchase successful!');
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Failed to complete purchase.');
    } finally {
      setIsBuying(false);
    }
  };

  const handleEdit = () => {
    navigate('/sell', {
      state: {
        ...product,
        id: product.id, // pass id for editing
      },
    });
  };

  const isOwnProduct = user && product.sellerId === user.uid;

  return (
    <div className="col">
      <div className="card h-100">
        <img src={product.image} alt={product.title} className="card-img-top" />
        <div className="card-footer text-center">
          <h5 className="card-title">{product.title}</h5>
          <p>
            ${product.price ? parseFloat(String(product.price).replace('$', '')).toFixed(2) : '0.00'}
          </p>

          {isOwnProduct && (
            <button className="btn btn-outline-primary mb-2" onClick={handleEdit}>
              Edit Listing
            </button>
          )}

          {onDelete ? (
            <ConfirmButton 
              className="btn btn-danger"
              message={
                product.deleteScope === 'site' 
                  ? "This will permanently remove the product from the marketplace. Continue?"
                  : "Are you sure you want to remove this item from your history?"
              }
              onConfirm={onDelete}
            >
              {product.deleteScope === 'site' ? "Permanently Remove Listing" : "Remove from My History"}
            </ConfirmButton>
          ) : !isOwnProduct ? (
            <button className="btn btn-primary" onClick={handleBuyNow}>
              Buy Now
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
