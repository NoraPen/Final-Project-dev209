// src/pages/Girls.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import '../pages.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';


function Girls() {
  const products = [
    {
      image: '/images/BlendTieredDress.webp',
      title: 'Blue Leaf Tiered Dress',
      price: '$17.99',
      category: ['Girls']
    },
    {
      image: '/images/GirlsLaceUpLeggings.webp',
      title: 'Lace-Up Mint Leggings',
      price: '$11.49',
      category: ['Girls']
    },
    {
      image: '/images/GirlsFlowerSlides.webp',
      title: 'Pink Flower Slides',
      price: '$13.99',
      category: ['Girls']
    },
    {
      image: '/images/GirlsFauxPearlCardigan.webp',
      title: 'Faux Pearl Cardigan',
      price: '$18.99',
      category: ['Girls']
    },
    {
      image: '/images/GirlsCherryRuffleDress.webp',
      title: 'Cherry Ruffle Dress',
      price: '$16.49',
      category: ['Girls']
    },
    {
      image: '/images/GirlsCherryHeartBag.webp',
      title: 'Cherry Heart Purse',
      price: '$10.99',
      category: ['Girls']
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
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </main>
      
      <Footer /> 
    </>
  );
}

export default Girls;
