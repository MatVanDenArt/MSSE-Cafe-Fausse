import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const testimonialsScrollRef = useRef(null);
  const cardsScrollRef = useRef(null);

  const cards = [
    {
      id: 1,
      image: "/images/Gallery - Chef.webp",
      alt: "Chef",
      title: "La Cuisine Authentique",
      description:
        "Our kitchen is rooted in tradition. We source the finest local and seasonal ingredients to craft classic French dishes, from a perfectly executed Confit de Canard to a rich Bœuf Bourguignon.",
    },
    {
      id: 2,
      image: "/images/Gallery - Dining Area.webp",
      alt: "Dining Area",
      title: "L'Ambiance Parfaite",
      description:
        "With plush velvet seating, antique mirrors, and the soft glow of candlelight, our dining room is designed for connection and conversation. It's your escape to the 6th arrondissement.",
    },
    {
      id: 3,
      image: "/images/Gallery - Table.webp",
      alt: "Table Setting",
      title: "Un Moment Pour Vous",
      description:
        "Join us for our weekly $1 oyster happy hour, our decadent weekend brunch, or our exclusive wine-tasting dinners. There is always a new memory to be made at Café Fausse.",
    },
  ];

  const testimonials = [
    {
      id: 1,
      quote:
        "An absolute gem. It felt like I was back in Paris. The French Onion Soup is a must-try. We will be back, again and again.",
      name: "Jacqueline Richardson",
      location: "Regular Guest",
    },
    {
      id: 2,
      quote:
        "The ambiance is unmatched, and the food transports you straight to a Parisian bistro. Every dish was perfection. Truly a memorable dining experience.",
      name: "Michael Chen",
      location: "Food Critic",
    },
  ];

  // Handle scroll to update active testimonial indicator
  useEffect(() => {
    const handleScroll = () => {
      const container = testimonialsScrollRef.current;
      const scrollContainer = container?.querySelector(".testimonials-scroll");
      if (!scrollContainer) return;

      const containerWidth = scrollContainer.offsetWidth;
      const containerCenter = containerWidth / 2;

      // Find which testimonial is closest to center
      const testimonialElements =
        scrollContainer.querySelectorAll(".testimonial");
      let closestIndex = 0;
      let closestDistance = Infinity;

      testimonialElements.forEach((testimonial, index) => {
        const testimonialRect = testimonial.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        const testimonialCenter =
          testimonialRect.left - containerRect.left + testimonialRect.width / 2;
        const distance = Math.abs(testimonialCenter - containerCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (
        closestIndex !== currentTestimonialIndex &&
        closestIndex >= 0 &&
        closestIndex < testimonials.length
      ) {
        setCurrentTestimonialIndex(closestIndex);
      }
    };

    const scrollContainer = testimonialsScrollRef.current?.querySelector(
      ".testimonials-scroll"
    );
    if (scrollContainer && isMobile) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [isMobile, currentTestimonialIndex, testimonials.length]);

  // Handle scroll to update active card indicator
  useEffect(() => {
    const handleScroll = () => {
      const container = cardsScrollRef.current;
      const scrollContainer = container?.querySelector(".cards-scroll");
      if (!scrollContainer) return;

      const containerWidth = scrollContainer.offsetWidth;
      const containerCenter = containerWidth / 2;

      // Find which card is closest to center
      const cardElements = scrollContainer.querySelectorAll(".card");
      let closestIndex = 0;
      let closestDistance = Infinity;

      cardElements.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        const cardCenter =
          cardRect.left - containerRect.left + cardRect.width / 2;
        const distance = Math.abs(cardCenter - containerCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (
        closestIndex !== currentCardIndex &&
        closestIndex >= 0 &&
        closestIndex < cards.length
      ) {
        setCurrentCardIndex(closestIndex);
      }
    };

    const scrollContainer = cardsScrollRef.current?.querySelector(
      ".cards-scroll"
    );
    if (scrollContainer && isMobile) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [isMobile, currentCardIndex]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          <p className="hero-description">
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
            <div
              className={`cards-container ${
                isMobile ? "cards-carousel" : ""
              }`}
              ref={cardsScrollRef}
            >
              <div
                className={isMobile ? "cards-scroll" : "grid grid-3"}
              >
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    className={`card ${
                      index === currentCardIndex ? "active" : ""
                    }`}
                  >
                    <div className="pillar-image">
                      <img
                        src={card.image}
                        alt={card.alt}
                        className="pillar-img"
                      />
                    </div>
                    <div className="card-body text-center">
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              {isMobile && (
                <div className="card-indicators">
                  {cards.map((_, index) => (
                    <div
                      key={index}
                      className={`indicator ${
                        index === currentCardIndex ? "active" : ""
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="section">
          <div className="container">
            <div className="section-title">
              <p>testimonials</p>
              <h3>What Our Guests Say</h3>
              <img
                src="/images/separator.svg"
                alt="separator"
                className="separator"
              />
              <p className="description">
                Hear from our valued customers about their Café Fausse
                experience
              </p>
            </div>
            <div
              className={`testimonials-container ${
                isMobile ? "testimonials-carousel" : ""
              }`}
              ref={testimonialsScrollRef}
            >
              <div
                className={
                  isMobile ? "testimonials-scroll" : "testimonials-grid"
                }
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`testimonial ${
                      index === currentTestimonialIndex ? "active" : ""
                    }`}
                  >
                    <div className="testimonial-quote-icon">
                      <svg
                        width="120"
                        height="80"
                        viewBox="0 0 120 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Left quotation mark */}
                        <path
                          d="M15 25C15 20 18 15 22 15C26 15 29 18 29 22C29 26 26 29 22 29C20 29 18 28 17 27C16 26 15.5 24.5 15.5 23V20H15V25Z"
                          fill="#c19b66"
                          opacity="0.15"
                        />
                        <ellipse
                          cx="22"
                          cy="22"
                          rx="7"
                          ry="7"
                          fill="none"
                          stroke="#c19b66"
                          strokeWidth="2"
                          strokeOpacity="0.2"
                        />
                        {/* Right quotation mark */}
                        <path
                          d="M75 25C75 20 78 15 82 15C86 15 89 18 89 22C89 26 86 29 82 29C80 29 78 28 77 27C76 26 75.5 24.5 75.5 23V20H75V25Z"
                          fill="#c19b66"
                          opacity="0.15"
                        />
                        <ellipse
                          cx="82"
                          cy="22"
                          rx="7"
                          ry="7"
                          fill="none"
                          stroke="#c19b66"
                          strokeWidth="2"
                          strokeOpacity="0.2"
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
                      <blockquote>"{testimonial.quote}"</blockquote>
                      <div className="testimonial-author">
                        <div className="testimonial-author-info">
                          <cite className="testimonial-name">
                            {testimonial.name}
                          </cite>
                          <span className="testimonial-location">
                            {testimonial.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {isMobile && (
                <div className="testimonial-indicators">
                  {testimonials.map((_, index) => (
                    <div
                      key={index}
                      className={`indicator ${
                        index === currentTestimonialIndex ? "active" : ""
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section
          className="section section-dark"
          style={{ paddingBottom: "4rem" }}
        >
          <div className="container">
            <div className="section-title">
              <p>reservation</p>
              <h3>Your Table is Waiting</h3>
              <img
                src="/images/separator.svg"
                alt="separator"
                className="separator"
              />
              <p className="description">
                Join us for an unforgettable evening. We recommend making a
                reservation, especially for weekend dining.
              </p>
              <Link
                to="/reservations"
                className="btn btn-large"
                style={{ marginTop: "2rem" }}
              >
                Make a Reservation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
