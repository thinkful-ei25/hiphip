import React from 'react';
import { Link } from 'react-router-dom';

import './LandingPage.css';
import Carousel from '../Carousel';

export default function LandingPage() {
  const getStartedButton = (
    <Link to="/login" className="button">
      Get started
    </Link>
  );

  return (
    <div className="LandingPage">
      <header>
        <h1>GoCery</h1>
      </header>{' '}
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
              {getStartedButton}
            </div>
          </section>
          <section className="hero">
            <img
              src="/landing/in-store.png"
              alt="A shopping cart asking which aisle ice cream was in"
            />
            <div className="hero-titles">
              <h2>Take GoCery with you</h2>
              <p>Update aisle information as you shop</p>
              {getStartedButton}
            </div>
          </section>
          <section className="hero">
            <img
              src="/landing/crowdsourced.png"
              alt="A cluster of shopping carts sharing aisle information"
            />
            <div className="hero-titles">
              <h2>Leverage fellow shoppers</h2>
              <p>Other user's aisle updates help you too</p>
              {getStartedButton}
            </div>
          </section>
        </Carousel>
      </main>
    </div>
  );
}
