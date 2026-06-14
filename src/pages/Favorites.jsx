import { motion as Motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { sketches } from "./sketchesData.js";
import { sketchSounds } from "../utils/sounds.js";

const Favorites = () => {
  const navigate = useNavigate();
  const favoriteSketches = sketches.filter((sketch) => sketch.favorite);

  return (
    <main className="gallery favorites-page">
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

      <span className="section-kicker">Curated shelf</span>
      <h2 className="pencil-stroke">Favorites</h2>
      <p className="gallery-subtitle">
        {favoriteSketches.length
          ? `${favoriteSketches.length} selected sketch${
              favoriteSketches.length === 1 ? "" : "es"
            }`
          : "No favorite sketches yet."}
      </p>

      {favoriteSketches.length === 0 ? (
        <div className="empty-state">
          Add <code>favorite: true</code> to sketches you want to feature here.
        </div>
      ) : (
        <div className="grid">
          {favoriteSketches.map((sketch, index) => (
            <Motion.article
              key={sketch.id}
              className="grid-item draw-effect favorite-card"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
            >
              <Link
                to={`/sketch/${sketch.id}`}
                className="grid-link draw-on-hover"
                aria-label={`Open ${sketch.title}`}
                onClick={() => sketchSounds.play("click")}
                onMouseEnter={() => sketchSounds.play("hover")}
              >
                <span className="favorite-ribbon">Favorite</span>
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
      )}
    </main>
  );
};

export default Favorites;
