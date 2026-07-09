import React from 'react';
export default function About() {
  return (
    <>
      <section className="banner" style={{ backgroundImage: "url('/images/banners/about-banner.png')" }}><h1 data-aos="zoom-in">About NammaFresh</h1></section>
      <main className="page">
        <section className="info rich" data-aos="fade-up">
          <h2>Rooted in Tamil Nadu Freshness</h2>
          <p>NammaFresh is built for families who want fresh, affordable and healthy groceries online. We connect local farms, trusted grocery makers and everyday customers through a simple shopping experience.</p>
          <p>Our catalogue includes vegetables, fruits, millets, spices, honey, ghee and healthy snacks. Every product has clear pricing, weight, stock, rating, wishlist and cart support.</p>
        </section>
        <div className="featureGrid" data-aos="fade-up">
          <div className="info"><h3>Our Story</h3><p>Inspired by Tamil Nadu farmers, NammaFresh brings traditional and modern grocery shopping together in one website.</p></div>
          <div className="info"><h3>Our Promise</h3><p>Fresh sourcing, quality checks, neat packing, secure checkout and order history for a complete customer journey.</p></div>
          <div className="info"><h3>Technology</h3><p>React frontend, Django REST backend, XAMPP MySQL database and Razorpay test payment integration.</p></div>
          <div className="info"><h3>Responsive Design</h3><p>Optimized for 330px mobile, 770px tablet and desktop screens with smooth AOS animations.</p></div>
        </div>
      </main>
    </>
  );
}
