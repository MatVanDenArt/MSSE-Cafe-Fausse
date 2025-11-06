import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="section-title">
          <h1>About Café Fausse</h1>
          <h2>Our Story</h2>
          <p>
            Café Fausse is more than a restaurant; it's a journey through the heart of French cuisine, 
            a place where tradition meets innovation, and where every meal is a celebration of life's 
            simple pleasures.
          </p>
        </div>

        {/* History Section */}
        <section className="about-section">
          <div className="about-content">
            <div className="about-text">
              <h3>Our History</h3>
              <p>
                Founded in 2018 by Chef Pierre Dubois, Café Fausse was born from a simple dream: 
                to bring the authentic flavors and warm hospitality of a traditional French bistro 
                to the heart of Washington, DC. Chef Pierre, who trained in the kitchens of Lyon 
                and Paris, wanted to create a space where guests could experience the true essence 
                of French dining culture.
              </p>
              <p>
                What started as a small 12-table establishment has grown into a beloved neighborhood 
                institution, now seating 30 guests in an elegant yet comfortable setting. Our 
                commitment to quality, authenticity, and exceptional service has remained unchanged 
                since day one.
              </p>
            </div>
            <div className="about-image">
              <img 
                src="/images/About - History.webp" 
                alt="Café Fausse History"
                className="img-responsive img-rounded"
              />
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="about-section section-light">
          <div className="about-content reverse">
            <div className="about-text">
              <h3>Our Mission</h3>
              <p>
                At Café Fausse, we believe that great food brings people together. Our mission is 
                to create memorable dining experiences through authentic French cuisine, warm 
                hospitality, and an atmosphere that feels like home.
              </p>
              <p>
                We are committed to using the finest ingredients, many sourced locally, while 
                staying true to traditional French cooking techniques. Every dish tells a story, 
                and every meal is an opportunity to create lasting memories.
              </p>
            </div>
            <div className="about-image">
              <img 
                src="/images/About - Family.webp" 
                alt="Café Fausse Family"
                className="img-responsive img-rounded"
              />
            </div>
          </div>
        </section>

        {/* Chef Section */}
        <section className="about-section">
          <div className="chef-profile">
            <div className="chef-image">
              <img 
                src="/images/Gallery - Chef.webp" 
                alt="Chef Pierre Dubois"
                className="img-responsive img-rounded"
              />
            </div>
            <div className="chef-info">
              <h3>Chef Pierre Dubois</h3>
              <h4>Founder & Executive Chef</h4>
              <p>
                Chef Pierre Dubois brings over 20 years of culinary expertise to Café Fausse. 
                Trained in the prestigious kitchens of Lyon and Paris, Chef Pierre has worked 
                alongside some of France's most celebrated chefs.
              </p>
              <p>
                His philosophy is simple: respect the ingredients, honor the traditions, and 
                always cook with passion. Under his guidance, Café Fausse has become a destination 
                for those seeking authentic French cuisine in the nation's capital.
              </p>
              <div className="chef-quote">
                <blockquote>
                  "Cooking is an art, but it's also a way to bring people together. 
                  At Café Fausse, we don't just serve food; we create experiences that 
                  nourish both body and soul."
                </blockquote>
                <cite>- Chef Pierre Dubois</cite>
              </div>
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="about-section section-light">
          <div className="container">
            <div className="section-title">
              <h3>Recognition & Awards</h3>
              <p>We are honored to have received recognition for our commitment to excellence</p>
            </div>
            <div className="awards-grid">
              <div className="award-card">
                <img 
                  src="../../Docs/Images/Award - Cœur de France Gastronomie.webp" 
                  alt="Cœur de France Gastronomie Award"
                  className="award-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <h4>Cœur de France Gastronomie</h4>
                <p>2023 - Excellence in French Cuisine</p>
              </div>
              <div className="award-card">
                <img 
                  src="../../Docs/Images/Award - Culinary Innovation.webp" 
                  alt="Culinary Innovation Award"
                  className="award-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <h4>Culinary Innovation Award</h4>
                <p>2022 - Washington DC Restaurant Association</p>
              </div>
              <div className="award-card">
                <img 
                  src="../../Docs/Images/Award - Etoile du Chef Distinction.webp" 
                  alt="Etoile du Chef Distinction"
                  className="award-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <h4>Étoile du Chef Distinction</h4>
                <p>2021 - French Culinary Institute</p>
              </div>
              <div className="award-card">
                <img 
                  src="../../Docs/Images/Award - Golden Spoon.webp" 
                  alt="Golden Spoon Award"
                  className="award-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <h4>Golden Spoon Award</h4>
                <p>2020 - Best New Restaurant</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="about-section">
          <div className="container">
            <div className="section-title">
              <h3>Our Values</h3>
              <p>The principles that guide everything we do</p>
            </div>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">🥘</div>
                <h4>Authenticity</h4>
                <p>We stay true to traditional French cooking methods and flavors, ensuring every dish is authentic and memorable.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">🌱</div>
                <h4>Sustainability</h4>
                <p>We source ingredients responsibly, supporting local farmers and sustainable practices whenever possible.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">❤️</div>
                <h4>Hospitality</h4>
                <p>Every guest is treated like family, with warm service that makes you feel at home from the moment you arrive.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">🎨</div>
                <h4>Excellence</h4>
                <p>We strive for perfection in every detail, from the quality of our ingredients to the presentation of each dish.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
