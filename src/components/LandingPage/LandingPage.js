import React from 'react';

import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <header>
        <h1>GoCery</h1>
      </header>
      <main>
        <section className="hero">
          <img
            src="/landing/aisles.png"
            alt="Diagram of simplifying path through a store"
          />
          <div className="hero-titles">
            <h2>Breeze through the store</h2>
            <p>Sort your list by aisle</p>
            <a href="/login" className="button">
              Get started
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
