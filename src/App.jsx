
import { useState } from "react";
import "./App.css";

const INSTAGRAM_URL =
  "https://www.instagram.com/ph_gift_articles_0431/";

// -----------------------------------------
// GIFT PRODUCTS
// -----------------------------------------

const products = [
  {
    id: 1,
    name: "Personalized Crystal Photo Frame",
    category: "Crystal Frames",
    price: 799,
    oldPrice: 999,
    emoji: "💎",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=85",
    description:
      "A beautiful personalized crystal photo frame for birthdays, anniversaries, weddings, and special memories.",
    stock: 10,
  },
  {
    id: 2,
    name: "Customized 3D Photo Frame",
    category: "3D Frames",
    price: 1199,
    oldPrice: 1499,
    emoji: "🖼️",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=85",
    description:
      "Make your memories special with a customized 3D photo frame. A thoughtful gift for your loved ones.",
    stock: 8,
  },
  {
    id: 3,
    name: "Glitter Photo Frame",
    category: "Glitter Frames",
    price: 599,
    oldPrice: 799,
    emoji: "✨",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=85",
    description:
      "A stylish glitter photo frame designed to add sparkle to your favorite photographs and memories.",
    stock: 12,
  },
  {
    id: 4,
    name: "Customized Thread Art",
    category: "Handmade Gifts",
    price: 899,
    oldPrice: 1199,
    emoji: "🧵",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=85",
    description:
      "A handmade thread art gift created with care. Perfect for birthdays, anniversaries, and celebrations.",
    stock: 6,
  },
  {
    id: 5,
    name: "Personalized Wall Clock",
    category: "Home Decor",
    price: 999,
    oldPrice: 1299,
    emoji: "🕰️",
    image:
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=85",
    description:
      "A decorative wall clock that makes a memorable gift for housewarmings, weddings, and anniversaries.",
    stock: 7,
  },
  {
    id: 6,
    name: "God Photo Frame",
    category: "Devotional Gifts",
    price: 699,
    oldPrice: 899,
    emoji: "🙏",
    image:
      "https://images.unsplash.com/photo-1604608672516-1b2a1b7e1c93?auto=format&fit=crop&w=800&q=85",
    description:
      "A devotional photo frame for your home, prayer room, or as a thoughtful gift for family and friends.",
    stock: 10,
  },
  {
    id: 7,
    name: "Birthday Surprise Gift Box",
    category: "Gift Boxes",
    price: 1299,
    oldPrice: 1599,
    emoji: "🎁",
    image:
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=85",
    description:
      "A beautiful surprise gift box for birthdays and special occasions. Make someone's day memorable.",
    stock: 5,
  },
  {
    id: 8,
    name: "Anniversary Memory Frame",
    category: "Personalized Gifts",
    price: 899,
    oldPrice: 1099,
    emoji: "❤️",
    image:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=800&q=85",
    description:
      "Celebrate your special moments with a personalized anniversary frame made for lasting memories.",
    stock: 9,
  },
];

const categories = [
  "All Gifts",
  "Crystal Frames",
  "3D Frames",
  "Glitter Frames",
  "Handmade Gifts",
  "Home Decor",
  "Devotional Gifts",
  "Gift Boxes",
  "Personalized Gifts",
];

const slides = [
  {
    eyebrow: "PH GIFT ARTICLES",
    title: "Gifts Made With Love",
    description:
      "Thoughtful gifts and beautiful memories for every special occasion.",
    button: "EXPLORE GIFTS",
    className: "slide-one",
  },
  {
    eyebrow: "MAKE IT PERSONAL",
    title: "Your Memories, Your Gift",
    description:
      "Customized frames and handmade creations made just for you.",
    button: "SHOP PERSONALIZED GIFTS",
    className: "slide-two",
  },
  {
    eyebrow: "A LITTLE HAPPINESS",
    title: "Make Every Occasion Special",
    description:
      "Find something meaningful for the people you love.",
    button: "FIND YOUR GIFT",
    className: "slide-three",
  },
];

// -----------------------------------------
// PRICE FORMAT
// -----------------------------------------

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

// -----------------------------------------
// PRODUCT IMAGE
// -----------------------------------------

function ProductImage({ product }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="product-image">
      {!imageFailed && (
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      )}

      {imageFailed && (
        <div className="image-placeholder" aria-label={product.name}>
          {product.emoji}
        </div>
      )}

      {product.oldPrice > product.price && (
        <span className="sale-badge">
          {Math.round(
            ((product.oldPrice - product.price) / product.oldPrice) * 100
          )}
          % OFF
        </span>
      )}
    </div>
  );
}

// -----------------------------------------
// MAIN APP
// -----------------------------------------

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All Gifts");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentSlide = slides[activeSlide];

  // Filter products by category and search
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All Gifts" ||
      product.category === activeCategory;

    const searchText = searchTerm.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  // Add a product to the cart
  function addToCart(product) {
    setCart((previousCart) => [...previousCart, product]);

    alert(`${product.name} added to your cart!`);
  }

  // Carousel controls
  function nextSlide() {
    setActiveSlide((previous) => (previous + 1) % slides.length);
  }

  function previousSlide() {
    setActiveSlide(
      (previous) => (previous - 1 + slides.length) % slides.length
    );
  }

  // Navigate to the products section
  function exploreGifts() {
    setSelectedProduct(null);
    setActiveCategory("All Gifts");
    setMobileMenuOpen(false);

    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  // Navigate to a product category
  function openCategory(category) {
    setActiveCategory(category);
    setSelectedProduct(null);
    setMobileMenuOpen(false);

    setTimeout(() => {
      document.getElementById("products")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 0);
  }

  // Open product details
  function openProduct(product) {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Return to product listing
  function backToProducts() {
    setSelectedProduct(null);
  }

  // ---------------------------------------
  // PRODUCT DETAILS PAGE
  // ---------------------------------------

  if (selectedProduct) {
    const product = selectedProduct;

    return (
      <>
        <header className="site-header">
          <button
            className="logo"
            onClick={() => {
              setSelectedProduct(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            PH GIFT<span>.</span>
          </button>

          <nav className="navigation">
            <button onClick={backToProducts}>Home</button>
            <button onClick={exploreGifts}>Shop Gifts</button>
            <button onClick={() => openCategory("Personalized Gifts")}>
              Personalized
            </button>
          </nav>

          <div className="header-actions">
            <button
              className="cart-button"
              aria-label="Shopping cart"
              onClick={() =>
                alert(`You have ${cart.length} item(s) in your cart.`)
              }
            >
              🛍️ <span>{cart.length}</span>
            </button>
          </div>
        </header>

        <main className="details-page">
          <button className="back-button" onClick={backToProducts}>
            ← Back to Gifts
          </button>

          <div className="details-layout">
            <div className="details-image">
              <img
                src={product.image}
                alt={product.name}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="image-placeholder">
                {product.emoji}
              </div>
            </div>

            <div className="details-info">
              <p className="eyebrow">{product.category}</p>

              <h1>{product.name}</h1>

              <div className="product-prices">
                <span className="current-price">
                  {formatPrice(product.price)}
                </span>

                {product.oldPrice > product.price && (
                  <span className="old-price">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>

              <p className="details-description">
                {product.description}
              </p>

              <p className="stock-message">
                {product.stock > 0
                  ? "Available to order"
                  : "Currently unavailable"}
              </p>

              <button
                className="add-button details-add"
                disabled={product.stock === 0}
                onClick={() => addToCart(product)}
              >
                ADD TO CART — {formatPrice(product.price)}
              </button>

              <p className="delivery-note">
                🎁 Customized gifts can be discussed through Instagram.
                Contact us for personalization, delivery, and pricing.
              </p>

              <a
                className="primary-button"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                style={{
                  marginTop: "20px",
                  textDecoration: "none",
                }}
              >
                ENQUIRE ON INSTAGRAM ↗
              </a>
            </div>
          </div>
        </main>

        <footer className="site-footer">
          <div className="footer-content">
            <div>
              <h2>PH GIFT.</h2>
              <p>
                Thoughtful gifts, handmade creations, and
                personalized memories.
              </p>
            </div>

            <div>
              <h3>QUICK LINKS</h3>
              <p>
                <a
                  href="#home"
                  onClick={(event) => {
                    event.preventDefault();
                    backToProducts();
                  }}
                  style={{ color: "inherit" }}
                >
                  Home
                </a>
              </p>
              <p>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "inherit" }}
                >
                  Instagram
                </a>
              </p>
            </div>

            <div>
              <h3>CONTACT</h3>
              <p>Custom Gifts & Articles</p>
              <p>Made with love ❤️</p>
            </div>
          </div>

          <div className="copyright">
            © {new Date().getFullYear()} PH Gift Articles. All rights reserved.
          </div>
        </footer>
      </>
    );
  }

  // ---------------------------------------
  // HOME PAGE
  // ---------------------------------------

  return (
    <>
      {/* HEADER */}

      <header className="site-header" id="home">
        <button
          className="mobile-menu"
          aria-label="Toggle navigation"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        <button
          className="logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          PH GIFT<span>.</span>
        </button>

        <nav
          className="navigation"
          style={
            mobileMenuOpen
              ? {
                  display: "flex",
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  padding: "20px",
                  flexDirection: "column",
                  alignItems: "stretch",
                  background: "#ffffff",
                  borderBottom: "1px solid #e8e6e2",
                  boxShadow: "0 8px 15px rgba(0,0,0,0.08)",
                }
              : undefined
          }
        >
          <button
            onClick={() => {
              setActiveCategory("All Gifts");
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Home
          </button>

          <button onClick={exploreGifts}>Shop</button>

          <button onClick={() => openCategory("Personalized Gifts")}>
            Personalized
          </button>

          <button onClick={() => openCategory("Handmade Gifts")}>
            Handmade
          </button>

          <button onClick={() => openCategory("Devotional Gifts")}>
            God Gifts
          </button>
        </nav>

        <div className="header-actions">
          <button
            aria-label="Search gifts"
            onClick={() => {
              document.getElementById("gift-search")?.focus();
              document.getElementById("products")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            ⌕
          </button>

          <button
            aria-label="Visit Instagram"
            onClick={() => window.open(INSTAGRAM_URL, "_blank")}
          >
            ◎
          </button>

          <button
            className="cart-button"
            aria-label="Shopping cart"
            onClick={() =>
              alert(`You have ${cart.length} item(s) in your cart.`)
            }
          >
            🛍️ <span>{cart.length}</span>
          </button>
        </div>
      </header>

      <main>
        {/* HERO CAROUSEL */}

        <section className={`hero ${currentSlide.className}`}>
          <button
            className="hero-arrow previous"
            onClick={previousSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>

          <div className="hero-content" key={activeSlide}>
            <p className="eyebrow">{currentSlide.eyebrow}</p>

            <h1>{currentSlide.title}</h1>

            <p>{currentSlide.description}</p>

            <button className="primary-button" onClick={exploreGifts}>
              {currentSlide.button} →
            </button>
          </div>

          <button
            className="hero-arrow next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            ›
          </button>

          <div className="hero-dots">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                className={index === activeSlide ? "active" : ""}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* INTRODUCTION */}

        <section className="category-section container">
          <div className="section-heading">
            <p className="eyebrow">A LITTLE SOMETHING SPECIAL</p>

            <h2>Find the Perfect Gift</h2>

            <p
              style={{
                marginTop: "12px",
                color: "#777777",
                fontSize: "14px",
              }}
            >
              Personalized gifts, handmade creations, and
              beautiful devotional frames.
            </p>
          </div>

          <div className="category-list">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${
                  activeCategory === category ? "selected" : ""
                }`}
                onClick={() => openCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* PRODUCTS */}

        <section className="products-section container" id="products">
          <div className="products-heading">
            <div>
              <p className="eyebrow">MADE WITH LOVE ❤️</p>

              <h2>
                {activeCategory === "All Gifts"
                  ? "Our Gift Collection"
                  : activeCategory}
              </h2>
            </div>

            <input
              id="gift-search"
              className="search-input"
              type="search"
              placeholder="Search gifts..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <button
                    className="product-image"
                    onClick={() => openProduct(product)}
                    aria-label={`View ${product.name}`}
                    style={{ padding: 0 }}
                  >
                    <ProductImage product={product} />
                  </button>

                  <div className="product-info">
                    <p className="product-category">
                      {product.category}
                    </p>

                    <button
                      className="product-name"
                      onClick={() => openProduct(product)}
                    >
                      {product.name}
                    </button>

                    <div className="product-prices">
                      <span className="current-price">
                        {formatPrice(product.price)}
                      </span>

                      {product.oldPrice > product.price && (
                        <span className="old-price">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      className="add-button"
                      onClick={() => addToCart(product)}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-message">
              <p>No gifts found. Try another search.</p>

              <button
                className="primary-button"
                style={{ marginTop: "15px" }}
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All Gifts");
                }}
              >
                VIEW ALL GIFTS
              </button>
            </div>
          )}
        </section>

        {/* INSTAGRAM PROMOTION */}

        <section className="promo-section">
          <p className="eyebrow">FOLLOW OUR JOURNEY</p>

          <h2>Make Every Occasion Special</h2>

          <p>
            Explore our latest creations, customized gifts,
            and new collections on Instagram.
          </p>

          <a
            className="primary-button"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            FOLLOW US ON INSTAGRAM ↗
          </a>

          <p style={{ marginTop: "20px", marginBottom: 0 }}>
            @ph_gift_articles_0431
          </p>
        </section>
      </main>

      {/* FOOTER */}

      <footer className="site-footer">
        <div className="footer-content">
          <div>
            <h2>PH GIFT.</h2>

            <p>
              Beautiful gifts. Handmade happiness.
              Memories that last forever.
            </p>

            <p>Made with love ❤️</p>
          </div>

          <div>
            <h3>SHOP</h3>

            <p>
              <a
                href="#products"
                onClick={() => openCategory("All Gifts")}
                style={{ color: "inherit" }}
              >
                All Gifts
              </a>
            </p>

            <p>
              <a
                href="#products"
                onClick={() => openCategory("Personalized Gifts")}
                style={{ color: "inherit" }}
              >
                Personalized Gifts
              </a>
            </p>

            <p>
              <a
                href="#products"
                onClick={() => openCategory("Devotional Gifts")}
                style={{ color: "inherit" }}
              >
                Devotional Gifts
              </a>
            </p>
          </div>

          <div>
            <h3>CONNECT WITH US</h3>

            <p>PH Gift Articles</p>

            <p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                style={{ color: "inherit" }}
              >
                Instagram ↗
              </a>
            </p>

            <p>Custom orders welcome</p>
          </div>
        </div>

        <div className="copyright">
          © {new Date().getFullYear()} PH Gift Articles. All rights reserved.
        </div>
      </footer>
    </>
  );
}