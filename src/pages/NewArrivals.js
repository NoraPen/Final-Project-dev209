// src/pages/NewArrivals.js
import React from 'react';
import '../style.css';
import '../pages.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';


function NewArrivals() {
  const products = [
    {
      image: '/images/EyeletRuffleRomper.webp',
      title: 'Eyelet Ruffle Romper',
      price: '$14.99',
      category: ['New-Arrivals']
    },
    {
      image: '/images/toddlerdenim.webp',
      title: 'Toddler Denim Overalls',
      price: '$18.99',
      category: ['New-Arrivals']
    },
    {
      image: '/images/BoysSwimTrunks.webp',
      title: 'Boys Swim Trunks',
      price: '$12.49',
      category: ['New-Arrivals']
    },
    {
      image: '/images/pinkdress.webp',
      title: 'Pink Tiered Dress',
      price: '$15.99',
      category: ['New-Arrivals']
    },
    {
      image: '/images/GirlsQuickDry.webp',
      title: 'Girls Quick-Dry Top',
      price: '$9.99',
      category: ['New-Arrivals']
    },
    {
      image: '/images/BoysQuickDry.webp',
      title: 'Boys Quick-Dry Shorts',
      price: '$10.99',
      category: ['New-Arrivals']
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
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </main>

     <Footer /> 
    </>
  );
}

export default NewArrivals;
