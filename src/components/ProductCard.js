// src/components/ProductCard.js
import React from 'react';

function ProductCard({ image, title, price, buttonText, buttonLink }) {
  return (
    <div className="card h-100">
      <img
        src={image || "https://dummyimage.com/450x300/dee2e6/6c757d.jpg"}
        alt={title || "Product"}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{title || "Product"}</h5>
        <p className="price">${Number(price).toFixed(2)}</p>
      </div>
      <div className="card-footer text-center">
        <a className="btn btn-primary" href={buttonLink || "#"}>
          {buttonText || "View"}
        </a>
      </div>
    </div>
  );
}

export default ProductCard;