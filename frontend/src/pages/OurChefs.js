import React from "react";
import { Link } from "react-router-dom";
import "./OurChefs.css";

const OurChefs = () => {
  const featuredChef = {
    name: "Pierre Dubois",
    title: "Executive Chef",
    subtitle: "35 year of experience",
    description:
      "Chef Pierre Dubois brings over 35 years of culinary expertise to Café Fausse. Trained in the prestigious kitchens of Lyon and Paris, Chef Pierre has worked alongside some of France's most celebrated chefs. His philosophy is simple: respect the ingredients, honor the traditions, and always cook with passion.",
    image: "/images/Chef - Pierre Dubois.webp",
  };

  const chefs = [
    {
      id: 1,
      name: "Marie Dubois",
      title: "Master Chef",
      description:
        "Chef Marie brings over 20 years of pastry expertise, specializing in classic French desserts and modern interpretations.",
      image: "/images/Chef - Marie Dubois.webp",
    },
    {
      id: 2,
      name: "Jean-Luc Martin",
      title: "Sous Chef",
      description:
        "Chef Jean-Luc is our expert in traditional French techniques, ensuring every dish meets the highest standards of authenticity.",
      image: "/images/Chef - Jean-Luc Martin.webp",
    },
    {
      id: 3,
      name: "Sophie Laurent",
      title: "Sous Chef",
      description:
        "Chef Sophie specializes in seasonal French cuisine, bringing fresh, local ingredients to life with creative flair.",
      image: "/images/Chef - Sophie Laurent.webp",
    },
  ];

  return (
    <div
      className="our-chefs"
      style={{
        backgroundImage: `url('/images/bg-5.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container">
        {/* Hero Section */}
        <section className="chefs-hero">
          <div className="section-title">
            <p className="chefs-subtitle">our team</p>
            <h1>Meet Our Chef</h1>
            <p className="chefs-experience">{featuredChef.subtitle}</p>
          </div>
        </section>

        {/* Featured Chef Section */}
        <section className="featured-chef-section">
          <div className="featured-chef-content">
            <div className="featured-chef-image">
              <img
                src={featuredChef.image}
                alt={featuredChef.name}
                className="img-responsive"
              />
            </div>
            <div className="featured-chef-text">
              <p className="featured-chef-label">Award Winning Chef</p>
              <h2>{featuredChef.name}</h2>
              <h3>{featuredChef.title}</h3>
              <p className="featured-chef-description">
                {featuredChef.description}
              </p>
            </div>
          </div>
        </section>

        {/* Chef Team Section */}
        <section className="chef-team-section">
          <div className="section-title">
            <p className="chefs-subtitle">experienced team</p>
            <h2>Meet Our Chef</h2>
          </div>
          <div className="chefs-grid">
            {chefs.map((chef) => (
              <div key={chef.id} className="chef-card">
                <div className="chef-card-image">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="img-responsive"
                  />
                </div>
                <div className="chef-card-content">
                  <h3>{chef.name}</h3>
                  <p className="chef-card-title">{chef.title}</p>
                  <p className="chef-card-description">{chef.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reservation CTA Section */}
        <section className="section" style={{ paddingBottom: "4rem", paddingTop: "2rem" }}>
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

export default OurChefs;
