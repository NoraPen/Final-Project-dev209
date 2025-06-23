// src/pages/Swim.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import '../pages.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';


function Swim() {
  const swimProducts = [
    {
      image: '/images/GirlsFloralBow.webp',
      title: 'Girls Floral Bow Swimsuit',
      price: '$16.99',
      category: ['Swim']
    },
    {
      image: '/images/GirlsVacationOneShoulder.webp',
      title: 'Girls Vacation One-Shoulder',
      price: '$17.99',
      category: ['Swim']
    },
    {
      image: '/images/GirlsStrawberryOne.webp',
      title: 'Girls Strawberry Swimsuit',
      price: '$18.50',
      category: ['Swim']
    },
    {
      image: '/images/BoysSharkRashguard.webp',
      title: 'Boys Shark Rashguard',
      price: '$14.99',
      category: ['Swim']
    },
    {
      image: '/images/BoysFlamingoSwim.webp',
      title: 'Boys Flamingo Swim Trunks',
      price: '$16.99',
      category: ['Swim']
    },
    {
      image: '/images/BoysStripedZip.webp',
      title: 'Boys Striped Zip Rashguard',
      price: '$15.50',
      category: ['Swim']
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
          {swimProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </main>

   
    <Footer />
    </>
  );
}

export default Swim;
