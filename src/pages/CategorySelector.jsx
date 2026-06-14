import { motion as Motion } from "framer-motion";
import { useState } from "react";
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
  const [floatingHearts] = useState(() =>
    [...Array(20)].map((_, i) => ({
      id: `category-heart-${i}`,
      initial: {
        opacity: 0,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + Math.random() * 80,
      },
      animate: {
        opacity: [0, 0.44, 0],
        y: `-${Math.random() * 520 + 130}px`,
        x: `${Math.random() * 190 - 95}px`,
        rotate: Math.random() * 70 - 35,
        scale: [0.72, 1.05, 0.86],
      },
      transition: {
        duration: Math.random() * 10 + 9,
        repeat: Infinity,
        repeatDelay: Math.random() * 4,
        ease: "easeOut",
      },
      style: {
        position: "fixed",
        zIndex: 1,
        pointerEvents: "none",
        width: `${Math.random() * 11 + 11}px`,
        height: `${Math.random() * 11 + 11}px`,
      },
    }))
  );

  return (
    <main className="category-page">
      <div className="home-book-doodle category-book-doodle" aria-hidden="true">
        <span />
      </div>
      <div
        className="home-pencil-doodle pencil-one category-pencil-one"
        aria-hidden="true"
      />
      <div
        className="home-pencil-doodle pencil-two category-pencil-two"
        aria-hidden="true"
      />

      {floatingHearts.map((heart) => (
        <Motion.div
          key={heart.id}
          className="floating-heart"
          initial={heart.initial}
          animate={heart.animate}
          transition={heart.transition}
          style={heart.style}
        />
      ))}

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
