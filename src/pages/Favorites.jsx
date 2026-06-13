// src/pages/Favorites.jsx
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { sketches } from "./sketchesData.js";
import { useState } from "react";
import { sketchSounds } from "../utils/sounds.js";

const Favorites = () => {
  const navigate = useNavigate();
  const favoriteSketches = sketches.filter((sketch) => sketch.favorite);
  const [hoveredId, setHoveredId] = useState(null);

  if (favoriteSketches.length === 0) {
    return (
      <div className="gallery">
        <motion.button
          className="back-button"
          onClick={() => { sketchSounds.play('click'); navigate(-1); }}
          whileHover={{ scale: 1.05, backgroundColor: "#ff6b6b" }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => sketchSounds.play('hover')}
        >
          ← Back
        </motion.button>
        <h2 className="pencil-stroke">⭐ Favorites</h2>
        <p style={{ textAlign: "center", color: "#888", fontSize: "1.2rem", marginTop: "4rem" }}>
          No favorites yet. Mark sketches as favorite in sketchesData.js!
        </p>
      </div>
    );
  }

  return (
    <div className="gallery">
      {/* Back Button */}
      <motion.button
        className="back-button"
        onClick={() => { sketchSounds.play('click'); navigate(-1); }}
        whileHover={{ scale: 1.05, backgroundColor: "#ff6b6b" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
        onMouseEnter={() => sketchSounds.play('hover')}
      >
        ← Back
      </motion.button>

      {/* Title */}
      <h2 className="pencil-stroke">⭐ Favorites</h2>

      {/* Count */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          textAlign: "center",
          color: "#999",
          fontSize: "1rem",
          marginBottom: "3rem",
          fontFamily: "'Jost', sans-serif",
        }}
      >
        {favoriteSketches.length} favorite{favoriteSketches.length !== 1 ? "s" : ""}
      </motion.p>

      {/* ── Circular Grid ── */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "clamp(20px, 4vw, 50px)",
        padding: "20px clamp(16px, 5vw, 60px) 80px",
        maxWidth: "1300px",
        margin: "0 auto",
      }}>
        {favoriteSketches.map((sketch, i) => {
          const isHovered = hoveredId === sketch.id;

          return (
            <motion.div
              key={sketch.id}
              initial={{ opacity: 0, y: 30, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: i * 0.08,
                type: "spring",
                stiffness: 200,
                damping: 18,
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "14px",
                width: "clamp(150px, 28vw, 260px)",
              }}
              onMouseEnter={() => { setHoveredId(sketch.id); sketchSounds.play('hover'); }}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link
                to={`/sketch/${sketch.id}`}
                onClick={() => sketchSounds.play('click')}
                style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}
                aria-label={`Open ${sketch.title}`}
              >
                {/* ── Circle ── */}
                <motion.div
                  animate={{
                    scale: isHovered ? 1.08 : 1,
                    boxShadow: isHovered
                      ? "0 20px 50px rgba(255,107,107,0.30), 0 0 0 5px rgba(255,107,107,0.18), 0 0 0 10px rgba(255,107,107,0.07)"
                      : "0 8px 30px rgba(0,0,0,0.13), 0 0 0 4px #fff, 0 0 0 7px rgba(255,107,107,0.10)",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "5px solid #fff",
                    background: "#f8f6f2",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                    <img
                      src={sketch.image}
                      alt={sketch.title}
                      className="responsive-sketch"
                      style={{ filter: "sepia(0.08) brightness(1.03) contrast(1.05)" }}
                    />
                  </div>

                  {/* hover coral tint */}
                  <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(135deg, rgba(255,107,107,0.15) 0%, rgba(255,142,83,0.10) 100%)",
                      borderRadius: "50%",
                      pointerEvents: "none",
                    }}
                  />
                </motion.div>

                {/* Label */}
                <motion.p
                  animate={{
                    y: isHovered ? -4 : 0,
                    color: isHovered ? "#ff6b6b" : "#3a3631",
                  }}
                  transition={{ duration: 0.25 }}
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: "clamp(1rem, 2.2vw, 1.3rem)",
                    fontWeight: 600,
                    textAlign: "center",
                    margin: "10px 0 0 0",
                    lineHeight: 1.3,
                    padding: "0 4px",
                  }}
                >
                  {sketch.note}
                </motion.p>

                {/* Star badge */}
                <motion.div
                  animate={{ scale: isHovered ? 1.2 : 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{
                    marginTop: "4px",
                    fontSize: "0.75rem",
                    color: "#ff8e53",
                    opacity: 0.8,
                    textAlign: "center",
                    fontFamily: "'Jost', sans-serif",
                  }}
                >
                  ★ favorite
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom fade */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "60px",
        background: "linear-gradient(to top, rgba(254,254,254,0.9), transparent)",
        pointerEvents: "none",
        zIndex: 5,
      }} />
    </div>
  );
};

export default Favorites;