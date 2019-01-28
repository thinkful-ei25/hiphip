import React from 'react';

import './LandingPage.css';
import Carousel from '../Carousel';

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <header>
        <h1>GoCery</h1>
      </header>
      <main>
        <Carousel>
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
          <section className="hero">
            <img
              src="/landing/in-store.png"
              alt="Diagram of simplifying path through a store"
            />
            <div className="hero-titles">
              <h2>Take GoCery with you</h2>
              <p>Update aisle information as you shop</p>
              <a href="/login" className="button">
                Get started
              </a>
            </div>
          </section>
          <section className="hero">
            <img
              src="/landing/crowdsourced.png"
              alt="Diagram of simplifying path through a store"
            />
            <div className="hero-titles">
              <h2>Leverage fellow shoppers</h2>
              <p>Other user's aisle updates help you too</p>
              <a href="/login" className="button">
                Get started
              </a>
            </div>
          </section>
        </Carousel>
      </main>
    </div>
  );
}
