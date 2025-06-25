//src/components/ProductCard.js
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import React, { useState } from 'react';
import ConfirmButton from "../components/ConfirmButton";

function ProductCard({ product, onDelete }) {
  const user = auth.currentUser;
  const [isBuying, setIsBuying] = useState(false);

  const handleBuyNow = async () => {
    if (!user) {
      alert('Please log in to buy.'); //Prevents User from Selling before Login
      return;
    }
    if (product.sellerId === user.uid) {
      alert("This product belongs to your account."); //Prevents User from buying product they listed
      return;
    }

    try {
      setIsBuying(true); // Start loading
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
      setIsBuying(false); // End loading
    }
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
          {onDelete ? (
            //Button Text on User Account page to allow deleting products instead of buying
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
          ) : 
          // Button Text for Products listed by Current User
          isOwnProduct ? (
            <button className="btn btn-secondary" onClick={handleBuyNow}>
              Your Product
            </button> 
          ) :
          //Default Button text 
          (
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