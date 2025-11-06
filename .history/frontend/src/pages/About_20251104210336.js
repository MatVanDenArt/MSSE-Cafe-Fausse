import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const carouselRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isMouseOverRef = useRef(false);
  const animationIdRef = useRef(null);

  const awards = [
    {
      id: 1,
      image: "/images/Award - Cœur de France Gastronomie.webp",
      title: "Cœur de France Gastronomie",
      year: "2023",
      description: "Excellence in French Cuisine",
    },
    {
      id: 2,
      image: "/images/Award - Culinary Innovation.webp",
      title: "Culinary Innovation Award",
      year: "2022",
      description: "Washington DC Restaurant Association",
    },
    {
      id: 3,
      image: "/images/Award - Etoile du Chef Distinction.webp",
      title: "Étoile du Chef Distinction",
      year: "2021",
      description: "French Culinary Institute",
    },
    {
      id: 4,
      image: "/images/Award - Golden Spoon.webp",
      title: "Golden Spoon Award",
      year: "2020",
      description: "Best New Restaurant",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      const containerWidth = container.offsetWidth;
      const containerCenter = containerWidth / 2;

      // Find which slide is closest to center
      const slides = container.querySelectorAll(".award-slide");
      let closestIndex = 0;
      let closestDistance = Infinity;

      slides.forEach((slide, index) => {
        const slideRect = slide.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const slideCenter =
          slideRect.left - containerRect.left + slideRect.width / 2;
        const distance = Math.abs(slideCenter - containerCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      // On desktop with duplicated slides, map back to original index
      const actualIndex = isDesktop
        ? closestIndex % awards.length
        : closestIndex;

      setCurrentIndex((prevIndex) => {
        if (
          actualIndex !== prevIndex &&
          actualIndex >= 0 &&
          actualIndex < awards.length
        ) {
          return actualIndex;
        }
        return prevIndex;
      });
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [awards.length, isDesktop]);

  // Removed scrollToIndex - indicators are now visual only
  // Navigation is handled entirely by mouse position on desktop and touch/swipe on mobile

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scrolling infinite carousel with hover pause for desktop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isDesktop) return;

    let animationId = null;
    let isPaused = false;
    const maxScrollSpeed = 2.0; // Maximum scroll speed in pixels per frame
    let currentScrollSpeed = 0; // Current scroll speed (will be eased)
    let targetScrollSpeed = maxScrollSpeed; // Target scroll speed
    let currentScrollPosition = 0;
    let slideWidth = 0;
    let singleSetWidth = 0; // Width of one set of awards
    const transitionDuration = 500; // Transition duration in milliseconds (0.5 seconds)
    let transitionStartTime = null;
    let transitionStartSpeed = 0;

    // Initialize carousel
    const initializeCarousel = () => {
      const firstSlide = container.querySelector(".award-slide");
      if (firstSlide) {
        slideWidth = firstSlide.offsetWidth + 32; // slide width + margin
        singleSetWidth = slideWidth * awards.length;
        // Start at the beginning of first set
        currentScrollPosition = 0;
        container.scrollLeft = 0;
      }
    };

    initializeCarousel();

    // Update calculations on resize
    const updateDimensions = () => {
      const firstSlide = container.querySelector(".award-slide");
      if (firstSlide) {
        slideWidth = firstSlide.offsetWidth + 32;
        singleSetWidth = slideWidth * awards.length;
      }
    };

    // Easing function for smooth transitions (ease-in-out)
    const easeInOut = (t) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    // Continuous animation loop
    const animate = (timestamp) => {
      if (!container) {
        animationId = null;
        return;
      }

      // Handle easing transition
      if (transitionStartTime !== null) {
        const elapsed = timestamp - transitionStartTime;
        const progress = Math.min(elapsed / transitionDuration, 1);

        if (progress < 1) {
          // Still transitioning - calculate eased speed
          const easedProgress = easeInOut(progress);
          currentScrollSpeed =
            transitionStartSpeed +
            (targetScrollSpeed - transitionStartSpeed) * easedProgress;
        } else {
          // Transition complete
          currentScrollSpeed = targetScrollSpeed;
          transitionStartTime = null;
        }
      }

      // Scroll at current speed (which may be easing)
      if (currentScrollSpeed > 0) {
        currentScrollPosition += currentScrollSpeed;

        // Handle seamless infinite scroll wrapping
        // When we reach or exceed the end of the first set, reset to equivalent position
        // This creates a seamless loop since duplicate slides are identical
        if (currentScrollPosition >= singleSetWidth) {
          // Use modulo to wrap seamlessly - this ensures exact visual match
          const wrappedPosition = currentScrollPosition % singleSetWidth;
          // Reset scroll position instantly when wrapping (no visible jump due to duplicates)
          container.scrollLeft = wrappedPosition;
          currentScrollPosition = wrappedPosition;
        } else {
          // Normal scrolling - update position
          container.scrollLeft = currentScrollPosition;
        }
      } else {
        // When paused or speed is 0, maintain current view
        container.scrollLeft = currentScrollPosition;
      }

      animationId = requestAnimationFrame(animate);
    };

    // Start auto-scroll with initial speed
    currentScrollSpeed = maxScrollSpeed;
    animationId = requestAnimationFrame(animate);

    // Handle mouse enter - gradually pause scrolling
    const handleMouseEnter = () => {
      if (!isPaused) {
        isPaused = true;
        transitionStartSpeed = currentScrollSpeed;
        targetScrollSpeed = 0;
        transitionStartTime = performance.now();
      }
    };

    // Handle mouse leave - gradually resume scrolling
    const handleMouseLeave = () => {
      if (isPaused) {
        isPaused = false;
        transitionStartSpeed = currentScrollSpeed;
        targetScrollSpeed = maxScrollSpeed;
        transitionStartTime = performance.now();
        if (!animationId) {
          animationId = requestAnimationFrame(animate);
        }
      }
    };

    // Handle window resize
    const handleResize = () => {
      updateDimensions();
      // Maintain current scroll position relative to the set
      const setPosition = currentScrollPosition % singleSetWidth;
      currentScrollPosition = setPosition;
      container.scrollLeft = currentScrollPosition;
    };

    // Attach event listeners to carousel wrapper
    const wrapper = carouselRef.current;
    if (wrapper) {
      wrapper.addEventListener("mouseenter", handleMouseEnter);
      wrapper.addEventListener("mouseleave", handleMouseLeave);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      if (wrapper) {
        wrapper.removeEventListener("mouseenter", handleMouseEnter);
        wrapper.removeEventListener("mouseleave", handleMouseLeave);
      }
      window.removeEventListener("resize", handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isDesktop, awards.length]);

  return (
    <div
      className="about"
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
          <p>about us</p>
          <h1>About Café Fausse</h1>
          <h2>Our Story</h2>
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.8",
              color: "#c8c8c8",
              fontWeight: 300,
              marginTop: "1rem",
            }}
          >
            Café Fausse is more than a restaurant; it's a journey through the
            heart of French cuisine, a place where tradition meets innovation,
            and where every meal is a celebration of life's simple pleasures.
          </p>
        </div>

        {/* History Section */}
        <section className="about-section">
          <div className="about-content">
            <div className="about-text">
              <h3>Our History</h3>
              <p>
                Founded in 2018 by Chef Pierre Dubois, Café Fausse was born from
                a simple dream: to bring the authentic flavors and warm
                hospitality of a traditional French bistro to the heart of
                Washington, DC. Chef Pierre, who trained in the kitchens of Lyon
                and Paris, wanted to create a space where guests could
                experience the true essence of French dining culture.
              </p>
              <p>
                What started as a small 12-table establishment has grown into a
                beloved neighborhood institution, now seating 30 guests in an
                elegant yet comfortable setting. Our commitment to quality,
                authenticity, and exceptional service has remained unchanged
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
        <section className="about-section">
          <div className="about-content reverse">
            <div className="about-text">
              <h3>Our Mission</h3>
              <p>
                At Café Fausse, we believe that great food brings people
                together. Our mission is to create memorable dining experiences
                through authentic French cuisine, warm hospitality, and an
                atmosphere that feels like home.
              </p>
              <p>
                We are committed to using the finest ingredients, many sourced
                locally, while staying true to traditional French cooking
                techniques. Every dish tells a story, and every meal is an
                opportunity to create lasting memories.
              </p>
            </div>
            <div className="about-image">
              <img
                src="/images/Gallery - Chef.webp"
                alt="Café Fausse Chef"
                className="img-responsive img-rounded"
              />
            </div>
          </div>
        </section>

        {/* Chef Section */}
        <section className="about-section">
          <div className="about-content">
            <div className="about-text">
              <h3>Chef Pierre Dubois</h3>
              <h4>Executive Master Chef</h4>
              <p>
                Chef Pierre Dubois brings over 20 years of culinary expertise to
                Café Fausse. Trained in the prestigious kitchens of Lyon and
                Paris, Chef Pierre has worked alongside some of France's most
                celebrated chefs.
              </p>
              <p>
                His philosophy is simple: respect the ingredients, honor the
                traditions, and always cook with passion. Under his guidance,
                Café Fausse has become a destination for those seeking authentic
                French cuisine in the nation's capital.
              </p>
              <div className="chef-quote">
                <blockquote>
                  "Cooking is an art, but it's also a way to bring people
                  together. At Café Fausse, we don't just serve food; we create
                  experiences that nourish both body and soul."
                </blockquote>
                <cite>- Chef Pierre Dubois</cite>
              </div>
              <Link
                to="/our-chefs"
                className="btn btn-large"
                style={{ marginTop: "2rem" }}
              >
                Meet Our Chefs
              </Link>
            </div>
            <div className="about-image">
              <img
                src="/images/Chef - Pierre Dubois.webp"
                alt="Chef Pierre Dubois"
                className="img-responsive img-rounded"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Awards Section */}
      <section className="awards-carousel-section">
        <div className="awards-carousel-header">
          <div className="awards-header-container">
            <div className="section-title">
              <p>recognition</p>
              <h3>Recognition & Awards</h3>
            </div>
          </div>
        </div>
        <div className="awards-carousel-wrapper" ref={carouselRef}>
          <div className="awards-carousel-container" ref={scrollContainerRef}>
            {/* Duplicate awards for infinite scroll effect on desktop */}
            {isDesktop ? (
              <>
                {awards.map((award, index) => (
                  <div
                    key={`dup-1-${award.id}`}
                    className={`award-slide ${
                      index === currentIndex ? "active" : ""
                    }`}
                    style={{
                      backgroundImage: `url("${award.image}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="award-slide-overlay"></div>
                    <div className="award-slide-content">
                      <h4>{award.title}</h4>
                      <p className="award-year">{award.year}</p>
                      <p className="award-description">{award.description}</p>
                    </div>
                  </div>
                ))}
                {awards.map((award, index) => (
                  <div
                    key={`dup-2-${award.id}`}
                    className={`award-slide ${
                      index === currentIndex ? "active" : ""
                    }`}
                    style={{
                      backgroundImage: `url("${award.image}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="award-slide-overlay"></div>
                    <div className="award-slide-content">
                      <h4>{award.title}</h4>
                      <p className="award-year">{award.year}</p>
                      <p className="award-description">{award.description}</p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              awards.map((award, index) => (
                <div
                  key={award.id}
                  className={`award-slide ${
                    index === currentIndex ? "active" : ""
                  }`}
                  style={{
                    backgroundImage: `url("${award.image}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="award-slide-overlay"></div>
                  <div className="award-slide-content">
                    <h4>{award.title}</h4>
                    <p className="award-year">{award.year}</p>
                    <p className="award-description">{award.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="carousel-indicators">
            {awards.map((_, index) => (
              <div
                key={index}
                className={`indicator ${
                  index === currentIndex ? "active" : ""
                }`}
                aria-label={`Award ${index + 1} ${
                  index === currentIndex ? "(current)" : ""
                }`}
              ></div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        {/* Values Section */}
        <section className="about-section">
          <div className="section-title">
            <h3>Our Values</h3>
            <p>The principles that guide everything we do</p>
          </div>
          <div className="grid grid-3">
            <div className="card">
              <div className="pillar-image">
                <img
                  src="/images/Gallery - Chef.webp"
                  alt="Authenticity"
                  className="pillar-img"
                />
              </div>
              <div className="card-body text-center">
                <h3>Authenticity</h3>
                <p>
                  We stay true to traditional French cooking methods and
                  flavors, ensuring every dish is authentic and memorable.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="pillar-image">
                <img
                  src="/images/Gallery - Kitchen.webp"
                  alt="Sustainability"
                  className="pillar-img"
                />
              </div>
              <div className="card-body text-center">
                <h3>Sustainability</h3>
                <p>
                  We source ingredients responsibly, supporting local farmers
                  and sustainable practices whenever possible.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="pillar-image">
                <img
                  src="/images/Gallery - Dining Area.webp"
                  alt="Hospitality"
                  className="pillar-img"
                />
              </div>
              <div className="card-body text-center">
                <h3>Hospitality</h3>
                <p>
                  Every guest is treated like family, with warm service that
                  makes you feel at home from the moment you arrive.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="pillar-image">
                <img
                  src="/images/Gallery - Table.webp"
                  alt="Excellence"
                  className="pillar-img"
                />
              </div>
              <div className="card-body text-center">
                <h3>Excellence</h3>
                <p>
                  We strive for perfection in every detail, from the quality of
                  our ingredients to the presentation of each dish.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
