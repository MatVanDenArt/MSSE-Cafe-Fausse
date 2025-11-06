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
      src: "/images/Gallery - Chef.webp",
      alt: "Chef",
      category: "chef",
      title: "Chef Pierre Dubois",
    },
    {
      id: 8,
      src: "/images/Gallery - Ribeye Steak.webp",
      alt: "Ribeye Steak",
      category: "food",
      title: "Signature Ribeye Steak",
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
    <div className="gallery">
      <div className="container">
        <div className="section-title">
          <h1>Gallery</h1>
          <h2>Experience Café Fausse</h2>
          <p>
            Take a visual journey through our elegant dining spaces,
            professional kitchen, and the culinary artistry that makes Café
            Fausse a truly special place.
          </p>
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
        <section className="reviews-section">
          <div className="section-title">
            <h3>What Our Guests Say</h3>
            <p>
              Hear from our valued customers about their Café Fausse experience
            </p>
          </div>
          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-stars">★★★★★</div>
              <blockquote>
                "An absolute gem in DC! The French Onion Soup is to die for, and
                the atmosphere is perfect for a romantic dinner. We'll
                definitely be back!"
              </blockquote>
              <cite>- Sarah & Michael Thompson</cite>
            </div>
            <div className="review-card">
              <div className="review-stars">★★★★★</div>
              <blockquote>
                "Chef Pierre's attention to detail is remarkable. Every dish is
                a masterpiece, and the service is impeccable. Truly authentic
                French dining."
              </blockquote>
              <cite>- David Chen</cite>
            </div>
            <div className="review-card">
              <div className="review-stars">★★★★★</div>
              <blockquote>
                "The wine selection is outstanding, and the staff's knowledge of
                pairings made our anniversary dinner unforgettable. Highly
                recommended!"
              </blockquote>
              <cite>- Jennifer & Robert Martinez</cite>
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
              onClick={() => navigateImage("prev")}
            >
              ‹
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="lightbox-image"
            />
            <button
              className="lightbox-nav lightbox-next"
              onClick={() => navigateImage("next")}
            >
              ›
            </button>
            <div className="lightbox-caption">
              <h3>{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
