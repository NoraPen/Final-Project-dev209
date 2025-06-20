import React from 'react';
import '../style.css';
import '../pages.css';
import Navbar from '../components/Navbar';

function Buy() {
  return (
    <>
      <Navbar />
      <header className="page-header">
  <div className="container">
    <h2 className="category-links">
      <a href="/new-arrivals">NEW ARRIVALS</a> |
      <a href="/boys">BOYS</a> |
      <a href="/girls">GIRLS</a> |
      <a href="/baby">BABY</a> |
      <a href="/swim">SWIM</a> |
      <a href="/pajamas">PAJAMAS</a>
    </h2>
  </div>
</header>

      <main className="container py-5">
        <p>Browse and shop quality clothes from other parents.</p>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-4">
          {[...Array(6)].map((_, index) => (
            <div className="col" key={index}>
              <div className="card h-100">
                <img
                  src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                  alt="Product"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Product</h5>
                  <p>$0.00</p>
                </div>
                <div className="card-footer text-center">
                  <a className="btn btn-primary" href="#">
                    Add to cart
                  </a>
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

export default Buy;
