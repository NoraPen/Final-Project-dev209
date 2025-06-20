// src/pages/Swim.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import '../pages.css';
import Navbar from '../components/Navbar';

function Swim() {
  const swimProducts = [
    {
      src: '/images/GirlsFloralBow.webp',
      title: 'Girls Floral Bow Swimsuit',
      price: '$16.99',
    },
    {
      src: '/images/GirlsVacationOneShoulder.webp',
      title: 'Girls Vacation One-Shoulder',
      price: '$17.99',
    },
    {
      src: '/images/GirlsStrawberryOne.webp',
      title: 'Girls Strawberry Swimsuit',
      price: '$18.50',
    },
    {
      src: '/images/BoysSharkRashguard.webp',
      title: 'Boys Shark Rashguard',
      price: '$14.99',
    },
    {
      src: '/images/BoysFlamingoSwim.webp',
      title: 'Boys Flamingo Swim Trunks',
      price: '$16.99',
    },
    {
      src: '/images/BoysStripedZip.webp',
      title: 'Boys Striped Zip Rashguard',
      price: '$15.50',
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
        <p>Fun and colorful swimwear for kids of all ages. Dive into the styles!</p>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-4">
          {swimProducts.map((item, index) => (
            <div className="col" key={index}>
              <div className="card h-100">
                <img src={item.src} alt={item.title} className="card-img-top" />
                <div className="card-body text-center">
                  <h5 className="card-title">{item.title}</h5>
                  <p>{item.price}</p>
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

export default Swim;
