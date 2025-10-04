import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { sketches } from "./sketchesData";

// Red Leaf component with animation
const RedLeaf = ({ style }) => {
  const variants = {
    falling: {
      y: [0, window.innerHeight + 100],
      x: [0, Math.random() * 200 - 100],
      rotate: [0, Math.random() * 360],
      opacity: [1, 0],
      transition: {
        duration: 5 + Math.random() * 10,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <motion.div
      className="red-leaf"
      initial="falling"
      animate="falling"
      variants={variants}
      style={{
        position: "fixed",
        top: -50,
        left: `${Math.random() * window.innerWidth}px`,
        zIndex: 10,
        backgroundImage: "url('public/images/clipart19125 (1).png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        width: "3000000px",
        height: "3000000px",
        ...style
      }}
    />
  );
};

const Favorites = () => {
  const navigate = useNavigate();
  const favoriteSketches = sketches.filter((sketch) => sketch.favorite);
  const [activeIndex, setActiveIndex] = useState(0);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    // Create 10-15 red leaves with random properties
    const newLeaves = Array.from({ length: 10 + Math.floor(Math.random() * 5) }).map((_, i) => ({
      id: i,
      size: 20 + Math.random() * 30,
      delay: Math.random() * 5,
      rotation: Math.random() * 360,
      speed: 5 + Math.random() * 10
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="slider-container">
      {/* Back Button */}
      <motion.button
        className="back-button"
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05, backgroundColor: "#ff6b6b" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ zIndex: 1000 }}
      >
        ← Back
      </motion.button>

      {/* Falling Red Leaves */}
      {leaves.map((leaf) => (
        <RedLeaf
          key={leaf.id}
          style={{
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
            animationDelay: `${leaf.delay}s`,
            transform: `rotate(${leaf.rotation}deg)`,
            transitionDuration: `${leaf.speed}s`
          }}
        />
      ))}

      {/* Decorative elements */}
      <div className="flower" key="flower1"></div>
      <div className="flower" key="flower2"></div>
      <div className="flower" key="flower3"></div>
      <div className="flower" key="flower4"></div>
      <div className="flower" key="flower5"></div>
      <div className="flower" key="flower6"></div>
      <div className="snowflake" key="snow1"></div>
      <div className="snowflake" key="snow2"></div>

      <h2>My Favorite Sketches</h2>
      <div className="slider-images">
        {favoriteSketches.map((sketch, index) => (
          <div
            key={sketch.id}
            className={`slider-img ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            <img src={sketch.image} alt={sketch.title} />
            <div className="details">
              <p>{sketch.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;