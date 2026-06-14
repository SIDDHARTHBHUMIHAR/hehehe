import { motion as Motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { sketches } from "./sketchesData.js";
import { sketchSounds } from "../utils/sounds.js";

const Gallery = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [isShuffling, setIsShuffling] = useState(false);

  const categories = [
    "all",
    ...new Set(sketches.map((sketch) => sketch.category || "general")),
  ];

  const filteredSketches =
    filter === "all"
      ? sketches
      : sketches.filter((sketch) => sketch.category === filter);

  const handleFilter = (category) => {
    sketchSounds.play("pageTurn");
    setIsShuffling(true);
    setFilter(category);
    window.setTimeout(() => setIsShuffling(false), 180);
  };

  return (
    <main className="gallery">
      <Motion.button
        type="button"
        className="back-button"
        onClick={() => {
          sketchSounds.play("click");
          navigate(-1);
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300 }}
        onMouseEnter={() => sketchSounds.play("hover")}
      >
        Back
      </Motion.button>

      <span className="section-kicker">Complete collection</span>
      <h2 className="pencil-stroke">My Sketches</h2>

      <div className="gallery-filters" aria-label="Gallery categories">
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            className={`filter-btn ${filter === category ? "active" : ""}`}
            onClick={() => handleFilter(category)}
            onMouseEnter={() => sketchSounds.play("hover")}
          >
            {category === "all"
              ? "All"
              : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid">
        {filteredSketches.map((sketch, index) => (
          <Motion.article
            key={sketch.id}
            className={`grid-item draw-effect ${isShuffling ? "shuffling" : ""}`}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.025, duration: 0.3 }}
          >
            <Link
              to={`/sketch/${sketch.id}`}
              className="grid-link draw-on-hover"
              aria-label={`Open ${sketch.title}`}
              onClick={() => sketchSounds.play("click")}
              onMouseEnter={() => sketchSounds.play("hover")}
            >
              <div className="artwork-container">
                <img
                  src={sketch.image}
                  alt={sketch.title}
                  className="responsive-sketch"
                />
              </div>
              <p>{sketch.note}</p>
            </Link>
          </Motion.article>
        ))}
      </div>
    </main>
  );
};

export default Gallery;
