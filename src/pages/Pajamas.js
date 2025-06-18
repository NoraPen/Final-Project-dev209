// src/pages/Pajamas.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import '../pages.css';
import Navbar from '../components/Navbar';

function Pajamas() {
  return (
    <>
      <Navbar />

      {/* Section Menu START */}
        <div className="category-links">
      <Link to="/new-arrivals">NEW ARRIVALS</Link> |
      <Link to="/boys">BOYS</Link> |
      <Link to="/girls">GIRLS</Link> |
      <Link to="/baby">BABY</Link> |
      <Link to="/swim">SWIM</Link> |
      <Link to="/pajamas">PAJAMAS</Link>
    </div>
    
      {/* Section Menu END */}

      <main className="container py-5">
        <h1 className="section-title-inline">Pajamas</h1>
        <p>Cozy and cute pajamas for sweet dreams and comfy nights.</p>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-4">
          {[...Array(6)].map((_, index) => (
            <div className="col" key={index}>
              <div className="card h-100">
                <img src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="Product" />
                <div className="card-body text-center">
                  <h5 className="card-title">Product</h5>
                  <p>$0.00</p>
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

export default Pajamas;
