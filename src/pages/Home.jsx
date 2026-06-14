import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();

  const [floatingMarks] = useState(() =>
    [...Array(14)].map((_, i) => ({
      id: `mark-${i}`,
      initial: {
        opacity: 0,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + Math.random() * 80,
      },
      animate: {
        opacity: [0.08, 0.28, 0],
        y: `-${Math.random() * 500 + 120}px`,
        x: `${Math.random() * 180 - 90}px`,
        rotate: Math.random() * 50 - 25,
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
      },
    }))
  );

  return (
    <main className="homepage">
      <div className="pencil-line"></div>
      <div className="pencil-line"></div>

      {floatingMarks.map((mark) => (
        <Motion.div
          key={mark.id}
          className="floating-mark"
          initial={mark.initial}
          animate={mark.animate}
          transition={mark.transition}
          style={mark.style}
        />
      ))}

      <Motion.section
        className="home-hero"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <span className="home-kicker">Personal sketch archive</span>
        <h1>Welcome to My Art World</h1>
        <p>
          Every stroke tells a story. Explore sketches, favorite moments, eye
          studies, and quiet notes from the artist's journey.
        </p>
      </Motion.section>

      <Motion.button
        type="button"
        className="hero-action"
        onClick={() => navigate("/categories")}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        Open Sketchbook
      </Motion.button>
    </main>
  );
};

export default Home;
