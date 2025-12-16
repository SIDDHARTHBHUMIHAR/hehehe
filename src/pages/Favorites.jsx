// src/pages/Favorites.jsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { sketches } from "./sketchesData.js";


// small animated leaf component
const RedLeaf = ({ style }) => {
  const variants = {
    falling: {
      y: [0, window.innerHeight + 100],
      x: [0, Math.random() * 200 - 100],
      rotate: [0, Math.random() * 360],
      opacity: [1, 0],
      transition: { duration: 5 + Math.random() * 10, repeat: Infinity, ease: "linear" }
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
        width: "40px",
        height: "40px",
        ...style
      }}
    />
  );
};

const Favorites = () => {
  const navigate = useNavigate();
  const favoriteSketches = sketches.filter((sketch) => sketch.favorite);
  const [activeIndex, setActiveIndex] = useState(0);
  const audioRef = useRef(null);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    // generate visual leaves
    const newLeaves = Array.from({ length: 10 + Math.floor(Math.random() * 5) }).map((_, i) => ({
      id: i,
      size: 20 + Math.random() * 30,
      delay: Math.random() * 5,
      rotation: Math.random() * 360,
      speed: 5 + Math.random() * 10
    }));
    setLeaves(newLeaves);
  }, []);

  // Play the music specific to the active favorite image
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const musicUrl = favoriteSketches[activeIndex]?.music;
    if (musicUrl) {
      const audio = new Audio(musicUrl);
      audio.loop = true;
      const playPromise = audio.play();
      if (playPromise !== undefined) playPromise.catch((err) => console.warn("Autoplay prevented:", err));
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <div className="slider-container">
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

      {/* Falling leaves */}
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