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
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Left quotation mark */}
                  <path
                    d="M20 30C20 25 22 20 25 20C28 20 30 22 30 25C30 28 28 30 25 30C24 30 23 29.5 22 29C21 28.5 20.5 27.5 20.5 26.5C20.5 25.5 20.5 24.5 20.5 23.5V20H20V30Z"
                    fill="#c19b66"
                    opacity="0.15"
                  />
                  <path
                    d="M20 30C20 25 22 20 25 20C28 20 30 22 30 25C30 28 28 30 25 30C24 30 23 29.5 22 29C21 28.5 20.5 27.5 20.5 26.5C20.5 25.5 20.5 24.5 20.5 23.5V20H20V30Z"
                    fill="none"
                    stroke="#c19b66"
                    strokeWidth="2"
                    strokeOpacity="0.15"
                  />
                  {/* Right quotation mark */}
                  <path
                    d="M60 30C60 25 62 20 65 20C68 20 70 22 70 25C70 28 68 30 65 30C64 30 63 29.5 62 29C61 28.5 60.5 27.5 60.5 26.5C60.5 25.5 60.5 24.5 60.5 23.5V20H60V30Z"
                    fill="#c19b66"
                    opacity="0.15"
                  />
                  <path
                    d="M60 30C60 25 62 20 65 20C68 20 70 22 70 25C70 28 68 30 65 30C64 30 63 29.5 62 29C61 28.5 60.5 27.5 60.5 26.5C60.5 25.5 60.5 24.5 60.5 23.5V20H60V30Z"
                    fill="none"
                    stroke="#c19b66"
                    strokeWidth="2"
                    strokeOpacity="0.15"
                  />
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
                    <cite className="testimonial-name">
                      Jacqueline Richardson
                    </cite>
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
