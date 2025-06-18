// src/pages/Home.js
import React, { useEffect } from 'react';
import '../style.css';
import '../pages.css';
import Navbar from '../components/Navbar';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper from 'swiper/bundle';

function Home() {
  useEffect(() => {
    new Swiper('.swiper', {
      loop: true,
      autoplay: {
        delay: 3000,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }, []);

  return (
    <>
      <Navbar />

      {/* Swiper Slider */}
      <div className="swiper">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <img src="https://dummyimage.com/1200x400/ccc/000&text=Slide+1" alt="Slide 1" />
          </div>
          <div className="swiper-slide">
            <img src="https://dummyimage.com/1200x400/ddd/000&text=Slide+2" alt="Slide 2" />
          </div>
          <div className="swiper-slide">
            <img src="https://dummyimage.com/1200x400/eee/000&text=Slide+3" alt="Slide 3" />
          </div>
        </div>

        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>

      {/* Info Banner */}
      <section className="info-banner">
        <div className="container info-content">
          <div className="info-text">
            <h2>Good Night</h2>
            <p>30% off select pajamas for a limited time</p>
            <button className="btn">Shop Now</button>
          </div>
          <div className="info-image">
            <img src="https://dummyimage.com/500x300/ccc/000&text=Promo+Image" alt="Promo" />
          </div>
        </div>
      </section>

      {/* Recommendation Section */}
      <div className="container">
        <h3 className="section-title-inline">We Think You Will Love These</h3>
        <div className="row">
          {[...Array(8)].map((_, index) => (
            <div className="col" key={index}>
              <div className="card h-100">
                <img src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="Product" />
                <div className="card-body text-center">
                  <h5 className="card-title">Product</h5>
                  <p>$0.00</p>
                </div>
                <div className="card-footer text-center">
                  <a className="btn" href="#">Add to cart</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
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

export default Home;
