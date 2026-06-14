import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "All Sketches",
    detail: "Browse the full sketchbook",
    path: "/gallery",
  },
  {
    title: "Favorites",
    detail: "The pieces worth pausing for",
    path: "/favorites",
  },
  {
    title: "Eyes",
    detail: "A focused study collection",
    path: "/eyes",
  },
  {
    title: "Message Box",
    detail: "Short notes and reflections",
    path: "/message-box",
  },
];

const CategorySelector = () => {
  const navigate = useNavigate();

  return (
    <main className="category-page">
      <Motion.button
        type="button"
        className="back-button"
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        Back
      </Motion.button>

      <Motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        className="category-shell"
      >
        <span className="section-kicker">Choose a collection</span>
        <h2>Explore My Art</h2>

        <div className="button-group">
          {categories.map((category, index) => (
            <Motion.button
              type="button"
              key={category.path}
              className="category-card"
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => navigate(category.path)}
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <span>{category.title}</span>
              <small>{category.detail}</small>
            </Motion.button>
          ))}
        </div>
      </Motion.section>
    </main>
  );
};

export default CategorySelector;
