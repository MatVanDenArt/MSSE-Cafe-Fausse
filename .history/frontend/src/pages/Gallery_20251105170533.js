import React, { useState } from "react";
import "./Gallery.css";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const galleryImages = [
    {
      id: 1,
      src: "/images/Gallery - Cafe Interior.webp",
      alt: "Café Interior",
      category: "interior",
      title: "Elegant Dining Room",
    },
    {
      id: 2,
      src: "/images/Gallery - Dining Area.webp",
      alt: "Dining Area",
      category: "interior",
      title: "Intimate Dining Space",
    },
    {
      id: 3,
      src: "/images/Gallery - Grand Dining Room.webp",
      alt: "Grand Dining Room",
      category: "interior",
      title: "Grand Dining Room",
    },
    {
      id: 4,
      src: "/images/Gallery - Cosy Corner.webp",
      alt: "Cosy Corner",
      category: "interior",
      title: "Cozy Corner",
    },
    {
      id: 5,
      src: "/images/Gallery - Table.webp",
      alt: "Table Setting",
      category: "interior",
      title: "Elegant Table Setting",
    },
    {
      id: 6,
      src: "/images/Gallery - Kitchen.webp",
      alt: "Kitchen",
      category: "kitchen",
      title: "Professional Kitchen",
    },
    {
      id: 7,
      src: "/images/Chef - Pierre Dubois.webp",
      alt: "Chef Pierre Dubois",
      category: "chef",
      title: "Chef Pierre Dubois - Executive Chef",
    },
    {
      id: 20,
      src: "/images/Chef - Marie Dubois.webp",
      alt: "Chef Marie Dubois",
      category: "chef",
      title: "Chef Marie Dubois - Master Chef",
    },
    {
      id: 21,
      src: "/images/Chef - Jean-Luc Martin.webp",
      alt: "Chef Jean-Luc Martin",
      category: "chef",
      title: "Chef Jean-Luc Martin - Sous Chef",
    },
    {
      id: 22,
      src: "/images/Chef - Sophie Laurent.webp",
      alt: "Chef Sophie Laurent",
      category: "chef",
      title: "Chef Sophie Laurent - Sous Chef",
    },
    {
      id: 8,
      src: "/images/Gallery - Ribeye Steak.webp",
      alt: "Ribeye Steak",
      category: "food",
      title: "Signature Ribeye Steak",
    },
    {
      id: 9,
      src: "/images/Menu - Bruschetta.webp",
      alt: "Bruschetta",
      category: "food",
      title: "Bruschetta",
    },
    {
      id: 10,
      src: "/images/Menu - Ceasar Salad.webp",
      alt: "Caesar Salad",
      category: "food",
      title: "Caesar Salad",
    },
    {
      id: 11,
      src: "/images/Menu - Cheesecake.webp",
      alt: "Cheesecake",
      category: "food",
      title: "Cheesecake",
    },
    {
      id: 12,
      src: "/images/Menu - Craft Beer.webp",
      alt: "Craft Beer",
      category: "food",
      title: "Craft Beer",
    },
    {
      id: 13,
      src: "/images/Menu - Espresso.webp",
      alt: "Espresso",
      category: "food",
      title: "Espresso",
    },
    {
      id: 14,
      src: "/images/Menu - Grilled Salmon.webp",
      alt: "Grilled Salmon",
      category: "food",
      title: "Grilled Salmon",
    },
    {
      id: 15,
      src: "/images/Menu - Red Wine.webp",
      alt: "Red Wine",
      category: "food",
      title: "Red Wine",
    },
    {
      id: 16,
      src: "/images/Menu - Ribeye Steak.webp",
      alt: "Ribeye Steak",
      category: "food",
      title: "Ribeye Steak",
    },
    {
      id: 17,
      src: "/images/Menu - Tiramisu.webp",
      alt: "Tiramisu",
      category: "food",
      title: "Tiramisu",
    },
    {
      id: 18,
      src: "/images/Menu - Vegetable Risotto.webp",
      alt: "Vegetable Risotto",
      category: "food",
      title: "Vegetable Risotto",
    },
    {
      id: 19,
      src: "/images/Menu - White Wine.webp",
      alt: "White Wine",
      category: "food",
      title: "White Wine",
    },
  ];

  const categories = [
    { id: "all", name: "All" },
    { id: "interior", name: "Interior" },
    { id: "kitchen", name: "Kitchen" },
    { id: "chef", name: "Chef" },
    { id: "food", name: "Food" },
  ];

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    let newIndex;

    if (direction === "prev") {
      newIndex =
        currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex =
        currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div
      className="gallery"
      style={{
        backgroundImage: `url('/images/bg-5.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container">
        <div className="section-title">
          <p>gallery</p>
          <h1>Gallery</h1>
          <img
            src="/images/separator.svg"
            alt="separator"
            className="separator"
          />
        </div>

        {/* Category Filter */}
        <div className="gallery-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${
                selectedCategory === category.id ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="gallery-item"
              onClick={() => openLightbox(image)}
            >
              <img src={image.src} alt={image.alt} className="gallery-image" />
              <div className="gallery-overlay">
                <h3>{image.title}</h3>
                <p>Click to view</p>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Reviews Section */}
        <section className="section">
          <div className="section-title">
            <p>testimonials</p>
            <h3>What Our Guests Say</h3>
            <img
              src="/images/separator.svg"
              alt="separator"
              className="separator"
            />
            <p className="description">
              Hear from our valued customers about their Café Fausse experience
            </p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial">
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
                <blockquote>
                  "An absolute gem in DC! The French Onion Soup is to die for,
                  and the atmosphere is perfect for a romantic dinner. We'll
                  definitely be back!"
                </blockquote>
                <div className="testimonial-author">
                  <div className="testimonial-author-info">
                    <cite className="testimonial-name">
                      Sarah & Michael Thompson
                    </cite>
                    <span className="testimonial-location">Regular Guests</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial">
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
                <blockquote>
                  "Chef Pierre's attention to detail is remarkable. Every dish
                  is a masterpiece, and the service is impeccable. Truly
                  authentic French dining."
                </blockquote>
                <div className="testimonial-author">
                  <div className="testimonial-author-info">
                    <cite className="testimonial-name">David Chen</cite>
                    <span className="testimonial-location">Food Critic</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial">
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
                <blockquote>
                  "The wine selection is outstanding, and the staff's knowledge
                  of pairings made our anniversary dinner unforgettable. Highly
                  recommended!"
                </blockquote>
                <div className="testimonial-author">
                  <div className="testimonial-author-info">
                    <cite className="testimonial-name">
                      Jennifer & Robert Martinez
                    </cite>
                    <span className="testimonial-location">
                      Anniversary Guests
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              ×
            </button>
            <button
              className="lightbox-nav lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
            >
              ‹
            </button>
            <div className="lightbox-image-wrapper">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="lightbox-image"
              />
              <div className="lightbox-caption">
                <h3>{selectedImage.title}</h3>
              </div>
              <div className="lightbox-nav-container">
                <button
                  className="lightbox-nav lightbox-prev-mobile"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("prev");
                  }}
                >
                  ‹
                </button>
                <button
                  className="lightbox-nav lightbox-next-mobile"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("next");
                  }}
                >
                  ›
                </button>
              </div>
            </div>
            <button
              className="lightbox-nav lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
