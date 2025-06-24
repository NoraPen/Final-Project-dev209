import React from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

function ProductCard({ product, onDelete }) {
  const user = auth.currentUser;

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
    }
  };

  const isOwnProduct = user && product.sellerId === user.uid;

  return (
    <div className="col">
      <div className="card h-100">
        <img src={product.image} alt={product.title} className="card-img-top" />
        <div className="card-body text-center">
          <h5 className="card-title">{product.title}</h5>
          <p>
            ${product.price ? parseFloat(String(product.price).replace('$', '')).toFixed(2) : '0.00'}
          </p>
        </div>
        <div className="card-footer text-center">
          {onDelete ? (
            <button className="btn btn-danger" onClick={onDelete}>
              Delete from History
            </button>
          ) : isOwnProduct ? (
            <button className="btn btn-secondary" onClick={handleBuyNow}>
              Your Product
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleBuyNow}>
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;