import React from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

function ProductCard({ product }) {
  const handleBuyNow = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('Please log in to buy.');
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

  return (
    <div className="col">
      <div className="card">
        <img src={product.image} alt={product.title} />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p>{product.price}</p>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;