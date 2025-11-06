import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  // Removed unused restaurantInfo state since it's not being used in the component

  return (
    <div className="home">
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url('/images/Home - Cafe Fausse.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-content">
          <h1>Welcome to Café Fausse</h1>
          <p>
            Experience the timeless charm of authentic French bistro dining. We
            welcome you to our table for an unforgettable culinary journey.
          </p>
          <div className="hero-buttons">
            <Link to="/reservations" className="btn btn-large">
              Book Your Table
            </Link>
            <Link to="/menu" className="btn btn-secondary btn-large">
              View Our Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Bienvenue au Café Fausse</h2>
            <p>
              Step off the bustling street and into a timeless Parisian moment.
              Café Fausse is a love letter to the classic bistros of Paris, a
              place where authentic French cuisine, warm hospitality, and
              elegant ambiance come together.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Pillars Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            <div className="card">
              <div className="card-body text-center">
                <div className="pillar-icon">👨‍🍳</div>
                <h3>La Cuisine Authentique</h3>
                <p>
                  Our kitchen is rooted in tradition. We source the finest local
                  and seasonal ingredients to craft classic French dishes, from
                  a perfectly executed Confit de Canard to a rich Bœuf
                  Bourguignon.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body text-center">
                <div className="pillar-icon">🍷</div>
                <h3>L'Ambiance Parfaite</h3>
                <p>
                  With plush velvet seating, antique mirrors, and the soft glow
                  of candlelight, our dining room is designed for connection and
                  conversation. It's your escape to the 6th arrondissement.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body text-center">
                <div className="pillar-icon">📅</div>
                <h3>Un Moment Pour Vous</h3>
                <p>
                  Join us for our weekly $1 oyster happy hour, our decadent
                  weekend brunch, or our exclusive wine-tasting dinners. There
                  is always a new memory to be made at Café Fausse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="section">
        <div className="container">
          <div className="testimonial">
            <blockquote>
              "An absolute gem. It felt like I was back in Paris. The French
              Onion Soup is a must-try. We will be back, again and again."
            </blockquote>
            <cite>- Jacqueline Richardson</cite>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2>Your Table is Waiting</h2>
          <p>
            Join us for an unforgettable evening. We recommend making a
            reservation, especially for weekend dining.
          </p>
          <Link to="/reservations" className="btn btn-large">
            Make a Reservation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
