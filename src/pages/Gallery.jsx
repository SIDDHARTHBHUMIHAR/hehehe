import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // Added imports
import { sketches } from "./sketchesData";

const Gallery = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="gallery">
      {/* Back Button */}
      <motion.button
        className="back-button"
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05, backgroundColor: "#ff6b6b" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        ← Back
      </motion.button>

      <h2>My Sketches</h2>
      <div className="grid">
        {sketches.map((sketch) => (
          <Link to={`/sketch/${sketch.id}`} key={sketch.id} className="grid-item">
            <img src={sketch.image} alt={sketch.title} />
            <p>{sketch.note}</p>
            {sketch.favorite && <span className="favorite-badge">❤️</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gallery;