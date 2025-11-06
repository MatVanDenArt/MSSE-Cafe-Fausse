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
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url('/images/Home - Cafe Fausse.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-content">
          <p>Amaing & delicious French cuisine</p>
          <h1>Welcome to Café Fausse</h1>
          <div>
            <img
              src="/images/separator.svg"
              alt="separator"
              className="separator"
            />
          </div>
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.8",
              color: "#c8c8c8",
              fontWeight: 300,
            }}
          >
            Experience the timeless charm of authentic French bistro dining. We
            welcome you to our table for an unforgettable culinary journey.
          </p>
          <div className="hero-buttons">
            <Link to="/reservations" className="btn btn-large">
              Book Your Table
            </Link>
            <Link to="/menu" className="btn btn-secondary">
              View Our Menu
            </Link>
          </div>
        </div>
      </section>

      <div
        className="home-content-background"
        style={{
          backgroundImage: `url('/images/bg-5.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Welcome Section */}
        <section className="section">
          <div className="container">
            <div className="section-title">
              <p>welcome</p>
              <h3>Bienvenue au Café Fausse</h3>
              <img
                src="/images/separator.svg"
                alt="separator"
                className="separator"
              />
              <p className="description">
                Step off the bustling street and into a timeless Parisian
                moment. Café Fausse is a love letter to the classic bistros of
                Paris, a place where authentic French cuisine, warm hospitality,
                and elegant ambiance come together.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Pillars Section */}
        <section className="section">
          <div className="container">
            <div className="grid grid-3">
              <div className="card">
                <div className="pillar-image">
                  <img
                    src="/images/Gallery - Chef.webp"
                    alt="Chef"
                    className="pillar-img"
                  />
                </div>
                <div className="card-body text-center">
                  <h3>La Cuisine Authentique</h3>
                  <p>
                    Our kitchen is rooted in tradition. We source the finest
                    local and seasonal ingredients to craft classic French
                    dishes, from a perfectly executed Confit de Canard to a rich
                    Bœuf Bourguignon.
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="pillar-image">
                  <img
                    src="/images/Gallery - Dining Area.webp"
                    alt="Dining Area"
                    className="pillar-img"
                  />
                </div>
                <div className="card-body text-center">
                  <h3>L'Ambiance Parfaite</h3>
                  <p>
                    With plush velvet seating, antique mirrors, and the soft
                    glow of candlelight, our dining room is designed for
                    connection and conversation. It's your escape to the 6th
                    arrondissement.
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="pillar-image">
                  <img
                    src="/images/Gallery - Table.webp"
                    alt="Table Setting"
                    className="pillar-img"
                  />
                </div>
                <div className="card-body text-center">
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
              <div className="testimonial-quote-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 21C3 17.4 5.4 15 9 15C12.6 15 15 17.4 15 21V21H3V21Z" fill="#C19B66" opacity="0.2"/>
                  <path d="M6.5 7C6.5 5.07 8.07 3.5 10 3.5C11.93 3.5 13.5 5.07 13.5 7C13.5 8.93 11.93 10.5 10 10.5C9.74 10.5 9.49 10.47 9.25 10.41C8.99 10.35 8.76 10.25 8.55 10.13C8.34 10.01 8.16 9.86 8.01 9.68C7.86 9.5 7.74 9.29 7.65 9.05C7.56 8.81 7.5 8.55 7.5 8.25V7H6.5Z" fill="#C19B66"/>
                  <path d="M14.5 7C14.5 5.07 16.07 3.5 18 3.5C19.93 3.5 21.5 5.07 21.5 7C21.5 8.93 19.93 10.5 18 10.5C17.74 10.5 17.49 10.47 17.25 10.41C16.99 10.35 16.76 10.25 16.55 10.13C16.34 10.01 16.16 9.86 16.01 9.68C15.86 9.5 15.74 9.29 15.65 9.05C15.56 8.81 15.5 8.55 15.5 8.25V7H14.5Z" fill="#C19B66"/>
                </svg>
              </div>
              <div className="testimonial-content">
                <div className="testimonial-stars">
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <blockquote>
                  "An absolute gem. It felt like I was back in Paris. The French
                  Onion Soup is a must-try. We will be back, again and again."
                </blockquote>
                <div className="testimonial-author">
                  <div className="testimonial-author-info">
                    <cite className="testimonial-name">Jacqueline Richardson</cite>
                    <span className="testimonial-location">Regular Guest</span>
                  </div>
                </div>
              </div>
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
    </div>
  );
};

export default Home;
