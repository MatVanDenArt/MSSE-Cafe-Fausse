import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail("");
      } else {
        const error = await response.json();
        console.error("Newsletter signup error:", error);
      }
    } catch (error) {
      console.error("Newsletter signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Café Fausse</h3>
            <p>
              Experience the timeless charm of authentic French bistro dining.
              We welcome you to our table for an unforgettable culinary journey.
            </p>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <p>
              <strong>Address:</strong><br />
              1234 Culinary Ave, Suite 100<br />
              Washington, DC 20002
            </p>
            <p>
              <strong>Phone:</strong><br />
              (202) 555-4567
            </p>
          </div>

          <div className="footer-section">
            <h3>Hours</h3>
            <p>
              <strong>Monday – Saturday:</strong><br />
              5:00 PM – 11:00 PM
            </p>
            <p>
              <strong>Sunday:</strong><br />
              5:00 PM – 9:00 PM
            </p>
          </div>

          <div className="footer-section">
            <h3>Newsletter</h3>
            <p>Subscribe to our newsletter for updates and special offers.</p>
            {isSubscribed ? (
              <div className="newsletter-success">
                <p>Thank you for subscribing!</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="newsletter-input"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-secondary newsletter-btn"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Café Fausse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
