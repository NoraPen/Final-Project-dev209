// src/pages/NewArrivals.js
import React from 'react';
import '../style.css';
import '../pages.css';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

function NewArrivals() {
  const products = [
    {
      src: '/images/EyeletRuffleRomper.webp',
      title: 'Eyelet Ruffle Romper',
      price: '$14.99',
    },
    {
      src: '/images/toddlerdenim.webp',
      title: 'Toddler Denim Overalls',
      price: '$18.99',
    },
    {
      src: '/images/BoysSwimTrunks.webp',
      title: 'Boys Swim Trunks',
      price: '$12.49',
    },
    {
      src: '/images/pinkdress.webp',
      title: 'Pink Tiered Dress',
      price: '$15.99',
    },
    {
      src: '/images/GirlsQuickDry.webp',
      title: 'Girls Quick-Dry Top',
      price: '$9.99',
    },
    {
      src: '/images/BoysQuickDry.webp',
      title: 'Boys Quick-Dry Shorts',
      price: '$10.99',
    },
  ];

  return (
    <>
      <Navbar />

      {/* Section Menu */}
      <div className="category-links">
        <Link to="/new-arrivals">NEW ARRIVALS</Link> |
        <Link to="/boys">BOYS</Link> |
        <Link to="/girls">GIRLS</Link> |
        <Link to="/baby">BABY</Link> |
        <Link to="/swim">SWIM</Link> |
        <Link to="/pajamas">PAJAMAS</Link>
      </div>

      <main className="container py-5">
        <p>Be the first to shop the latest and greatest in children's clothing!</p>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-4">
          {products.map((product, index) => (
            <div className="col" key={index}>
              <div className="card h-100">
                <img src={product.src} alt={product.title} />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.title}</h5>
                  <p>{product.price}</p>
                </div>
                <div className="card-footer text-center">
                  <a className="btn btn-primary" href="#">Add to cart</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

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

export default NewArrivals;
