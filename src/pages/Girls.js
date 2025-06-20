// src/pages/Girls.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import '../pages.css';
import Navbar from '../components/Navbar';

function Girls() {
  const products = [
    {
      src: '/images/BlendTieredDress.webp',
      title: 'Blue Leaf Tiered Dress',
      price: '$17.99',
    },
    {
      src: '/images/GirlsLaceUpLeggings.webp',
      title: 'Lace-Up Mint Leggings',
      price: '$11.49',
    },
    {
      src: '/images/GirlsFlowerSlides.webp',
      title: 'Pink Flower Slides',
      price: '$13.99',
    },
    {
      src: '/images/GirlsFauxPearlCardigan.webp',
      title: 'Faux Pearl Cardigan',
      price: '$18.99',
    },
    {
      src: '/images/GirlsCherryRuffleDress.webp',
      title: 'Cherry Ruffle Dress',
      price: '$16.49',
    },
    {
      src: '/images/GirlsCherryHeartBag.webp',
      title: 'Cherry Heart Purse',
      price: '$10.99',
    },
  ];

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
        <p>Stylish and comfy clothing for girls of all ages.</p>

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

export default Girls;
