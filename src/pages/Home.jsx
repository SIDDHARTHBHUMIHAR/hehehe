import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  // Heart animation configuration
  const colors = {
    heart: "#ff0000",
    heartSecondary: "#ff6b8b",
    heartTertiary: "#ff4757"
  };

  // Generate floating hearts
  const generateHearts = (count) => 
    [...Array(count)].map((_, i) => ({
      id: `heart-${i}`,
      initial: { 
        opacity: 0,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + Math.random() * 100
      },
      animate: { 
        opacity: [0.2, 0.7, 0],
        y: `-${Math.random() * 500 + 100}px`,
        x: `${Math.random() * 200 - 100}px`,
        rotate: Math.random() * 360,
        scale: [0.8, 1.2, 0.9]
      },
      transition: {
        duration: Math.random() * 10 + 8,
        repeat: Infinity,
        repeatDelay: Math.random() * 3,
        ease: "easeOut"
      },
      style: {
        fontSize: `${Math.random() * 20 + 15}px`,
        color: [colors.heart, colors.heartSecondary, colors.heartTertiary][
          Math.floor(Math.random() * 3)
        ],
        position: 'fixed',
        zIndex: 1,
        pointerEvents: 'none'
      }
    }));

  const [hearts] = useState(() => generateHearts(30));

  return (
    <div className="homepage" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      overflow: 'hidden'
    }}>
      {/* Pencil Drawing Elements */}
      <div className="pencil-line"></div>
      <div className="pencil-line"></div>
      <div className="graphic-blob"></div>

      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={heart.initial}
          animate={heart.animate}
          transition={heart.transition}
          style={heart.style}
        >
          ❤
        </motion.div>
      ))}

      <h1 style={{
        fontSize: '2.5rem',
        marginBottom: '1rem',
        position: 'relative',
        zIndex: 2
      }}>
        Welcome to My Art World
      </h1>
      
      <p style={{
        fontSize: '1.2rem',
        marginBottom: '2rem',
        maxWidth: '600px',
        position: 'relative',
        zIndex: 2
      }}>
        Every stroke tells a story. Explore my sketches below.
      </p>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <Link 
          to="/categories" 
          className="cta-button"
        >
          View Categories
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;