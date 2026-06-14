import { motion as Motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { sketches } from "./sketchesData.js";
import { sketchSounds } from "../utils/sounds.js";

const expressionEmojis = ["😊", "🥰", "✨", "💖", "🌸", "😌"];

const getExpressionEmoji = (sketch, index) => {
  const text = `${sketch.title || ""} ${sketch.note || ""}`.toLowerCase();

  if (text.includes("badmosh") || text.includes("angry")) return "👺";
  if (text.includes("hmmm")) return "🤔";
  if (text.includes("special")) return "✨";
  if (text.includes("vote")) return "🗳️";
  if (text.includes("bindi")) return "🌙";
  if (text.includes("temple")) return "🙏";
  if (text.includes("saari") || text.includes("saree")) return "💃";
  if (text.includes("black")) return "🖤";
  if (text.includes("blink")) return "😉";
  if (text.includes("eyes")) return "👀";

  return expressionEmojis[index % expressionEmojis.length];
};

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
        <section className="favorites-orbit" aria-label="Favorite sketches">
          {favoriteSketches.map((sketch, index) => (
            <Motion.article
              key={sketch.id}
              className="favorite-circle-card"
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: index * 0.06,
                type: "spring",
                stiffness: 220,
                damping: 18,
              }}
            >
              <Link
                to={`/sketch/${sketch.id}`}
                className="favorite-circle-link"
                aria-label={`Open ${sketch.title}`}
                onClick={() => sketchSounds.play("click")}
                onMouseEnter={() => sketchSounds.play("hover")}
              >
                <span className="favorite-glow" />
                <div className="favorite-circle-frame">
                  <img
                    src={sketch.image}
                    alt={sketch.title}
                    className="responsive-sketch"
                  />
                </div>
                <span
                  className="favorite-expression"
                  aria-label="Expression"
                  title="Expression"
                >
                  {getExpressionEmoji(sketch, index)}
                </span>
                <p>{sketch.note}</p>
              </Link>
            </Motion.article>
          ))}
        </section>
      )}
    </main>
  );
};

export default Favorites;
