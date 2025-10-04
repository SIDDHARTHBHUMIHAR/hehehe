import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // Fixed import

const CategorySelector = () => {
  const navigate = useNavigate();

  return (
    <div className="category-page">
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

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="category-buttons"
      >
        <h2>Explore My Art</h2>
        <div className="button-group">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#ff6b6b" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/gallery">ALL SKETCHES</Link>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#ff6b6b" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/favorites">FAVORITES</Link>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#ff6b6b" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/eyes">EYES</Link>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default CategorySelector;