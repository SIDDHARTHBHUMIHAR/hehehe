import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();

  const [floatingHearts] = useState(() =>
    [...Array(24)].map((_, i) => ({
      id: `heart-${i}`,
      initial: {
        opacity: 0,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + Math.random() * 80,
      },
      animate: {
        opacity: [0, 0.52, 0],
        y: `-${Math.random() * 560 + 140}px`,
        x: `${Math.random() * 210 - 105}px`,
        rotate: Math.random() * 70 - 35,
        scale: [0.72, 1.08, 0.86],
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
        width: `${Math.random() * 12 + 12}px`,
        height: `${Math.random() * 12 + 12}px`,
      },
    }))
  );

  return (
    <main className="homepage">
      <div className="pencil-line"></div>
      <div className="pencil-line"></div>

      <div className="home-book-doodle" aria-hidden="true">
        <span />
      </div>
      <div className="home-pencil-doodle pencil-one" aria-hidden="true" />
      <div className="home-pencil-doodle pencil-two" aria-hidden="true" />

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

      <Motion.section
        className="home-hero"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <span className="home-kicker">The Museum of Unsent Feelings</span>
        <h1>In Every Season You Appeared</h1>
        <p>
          You never posed for these sketches
          You never asked for them
          Yet somehow, for years, you became the reason I kept drawing
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
