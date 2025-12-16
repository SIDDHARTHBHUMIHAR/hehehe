// src/pages/Eyes.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { sketches } from "./sketchesData.js";
import { useState, useEffect, useRef } from "react";

const Eyes = () => {
  const navigate = useNavigate();
  const eyeSketches = sketches.filter((sketch) => sketch.category === "eyes");
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);

  // PAGE-WIDE music (Option B)
  // Put the audio file under public/assets/ so it's served as "/assets/eyes-theme.mp3"
  const pageMusic = "public/audio/aud1.mp3";

  useEffect(() => {
    // cleanup previous audio if any
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // choose music:
    // If you want to always use the single page-wide track, use `musicUrl = pageMusic`
    // If you want per-sketch override when a sketch has its own music, use the OR fallback:
    const musicUrl = pageMusic; // <-- Option B: always page music
    // const musicUrl = eyeSketches[currentIndex]?.music || pageMusic; // <-- per-sketch fallback (uncomment if desired)

    if (musicUrl) {
      const audio = new Audio(musicUrl);
      audio.loop = true;
      // optional: adjust default volume
      // audio.volume = 0.65;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Autoplay may be blocked on some browsers/devices — this is expected.
          // You can show a small "Tap to play" UI if you want to support those devices.
          console.warn("Autoplay prevented:", err);
        });
      }
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
    // run effect also when currentIndex changes so the music resets if you want that behavior
  }, [currentIndex]);

  // Colors & visuals (kept from your design)
  const colors = {
    background: "linear-gradient(135deg, #ff6b6b 0%, #fad0c4 100%)",
    heart: "#ff0000",
    heartSecondary: "#ff6b8b",
    heartTertiary: "#ff4757"
  };

  const generateHearts = (count, config) =>
    [...Array(count)].map((_, i) => ({
      id: `${config.type}-${i}`,
      initial: config.initial(i),
      animate: config.animate(i),
      transition: config.transition(i),
      style: {
        fontSize: `${Math.random() * config.sizeRange[0] + config.sizeRange[1]}px`,
        color: [colors.heart, colors.heartSecondary, colors.heartTertiary][
          Math.floor(Math.random() * 3)
        ],
        position: "absolute",
        zIndex: 1,
        pointerEvents: "none",
        ...config.position
      }
    }));

  const leftHearts = generateHearts(20, {
    type: "left",
    sizeRange: [15, 20],
    position: { left: "5%" },
    initial: () => ({ opacity: 0, x: -50, y: window.innerHeight - Math.random() * 300 }),
    animate: () => ({ opacity: [0.2, 0.7, 0], y: `-${Math.random() * 500 + 100}px`, x: `${Math.random() * 100 - 50}px`, rotate: Math.random() * 360 }),
    transition: () => ({ duration: Math.random() * 10 + 8, repeat: Infinity, repeatDelay: Math.random() * 5 })
  });

  const rightHearts = generateHearts(20, {
    type: "right",
    sizeRange: [15, 20],
    position: { right: "5%" },
    initial: () => ({ opacity: 0, x: 50, y: window.innerHeight - Math.random() * 300 }),
    animate: () => ({ opacity: [0.2, 0.7, 0], y: `-${Math.random() * 500 + 100}px`, x: `${Math.random() * 100 - 50}px`, rotate: Math.random() * 360 }),
    transition: () => ({ duration: Math.random() * 10 + 8, repeat: Infinity, repeatDelay: Math.random() * 5 })
  });

  const centerHearts = generateHearts(30, {
    type: "center",
    sizeRange: [10, 25],
    position: { left: "50%" },
    initial: () => ({ opacity: 0, x: Math.random() * 200 - 100, y: window.innerHeight }),
    animate: () => ({ opacity: [0.3, 0.8, 0], y: `-${Math.random() * 800 + 100}px`, x: `${Math.random() * 200 - 100}px`, scale: [0.8, 1.2, 1] }),
    transition: () => ({ duration: Math.random() * 12 + 10, repeat: Infinity, repeatDelay: Math.random() * 3 })
  });

  const bottomHearts = generateHearts(25, {
    type: "bottom",
    sizeRange: [20, 30],
    position: { bottom: "10px" },
    initial: () => ({ opacity: 0, x: Math.random() * window.innerWidth, y: window.innerHeight }),
    animate: () => ({ opacity: [0.4, 0.9, 0], y: `-${Math.random() * 300 + 50}px`, x: `${Math.random() * 100 - 50}px`, scale: [0.7, 1.3, 1] }),
    transition: () => ({ duration: Math.random() * 15 + 10, repeat: Infinity, ease: "easeOut" })
  });

  return (
    <div
      className="eyes-page-bg"
      style={{
        background: colors.background,
        minHeight: "100vh",
        padding: "2rem",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Pencil Shavings Animation */}
      {[...Array(8)].map((_, i) => (
        <div 
          key={`shaving-${i}`}
          className="pencil-shavings"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 15}s`,
            transform: `scale(${0.5 + Math.random() * 1})`
          }}
        />
      ))}

      <motion.button
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          padding: "0.8rem 1.5rem",
          background: "rgba(255,255,255,0.7)",
          border: "1px solid #d4a5c3",
          borderRadius: "50px",
          color: "#5a3d5c",
          fontSize: "1rem",
          cursor: "pointer",
          zIndex: 10,
          backdropFilter: "blur(5px)"
        }}
      >
        ← Back
      </motion.button>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh", position: "relative", zIndex: 2 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`main-${currentIndex}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.7 }}
            style={{
              width: "130vw",
              maxWidth: "700px",
              height: "25vh",
              maxHeight: "500px",
              backgroundImage: `url(${eyeSketches[currentIndex]?.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "20px",
              boxShadow: "0 25px 50px -12px rgba(164, 110, 150, 0.2)",
              zIndex: 3,
              border: "8px solid white"
            }}
          />
        </AnimatePresence>

        {eyeSketches.length > 1 && (
          <>
            <motion.div
              style={{
                width: "50vw",
                maxWidth: "350px",
                height: "20vh",
                maxHeight: "350px",
                backgroundImage: `url(${eyeSketches[(currentIndex - 1 + eyeSketches.length) % eyeSketches.length]?.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "15px",
                boxShadow: "0 15px 30px -8px rgba(164, 110, 150, 0.2)",
                position: "absolute",
                left: "5%",
                bottom: "5%",
                zIndex: 2,
                border: "6px solid white",
                opacity: 0.9
              }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setCurrentIndex((prev) => (prev - 1 + eyeSketches.length) % eyeSketches.length)}
            />
            <motion.div
              style={{
                width: "50vw",
                maxWidth: "350px",
                height: "20vh",
                maxHeight: "350px",
                backgroundImage: `url(${eyeSketches[(currentIndex + 1) % eyeSketches.length]?.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "15px",
                boxShadow: "0 15px 30px -8px rgba(164, 110, 150, 0.2)",
                position: "absolute",
                right: "5%",
                bottom: "5%",
                zIndex: 2,
                border: "6px solid white",
                opacity: 0.9
              }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setCurrentIndex((prev) => (prev + 1) % eyeSketches.length)}
            />
          </>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem", position: "relative", zIndex: 5 }}>
        <motion.button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + eyeSketches.length) % eyeSketches.length)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            padding: "1rem 2rem",
            background: "white",
            border: "1px solid #d4a5c3",
            borderRadius: "50px",
            color: "#5a3d5c",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(164, 110, 150, 0.2)"
          }}
        >
          Previous
        </motion.button>

        <motion.button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % eyeSketches.length)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            padding: "1rem 2rem",
            background: "#d4a5c3",
            border: "none",
            borderRadius: "50px",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(164, 110, 150, 0.2)"
          }}
        >
          Next
        </motion.button>
      </div>

      {[...leftHearts, ...rightHearts, ...centerHearts, ...bottomHearts].map((heart) => (
        <motion.div key={heart.id} initial={heart.initial} animate={heart.animate} transition={heart.transition} style={heart.style}>
          ❤
        </motion.div>
      ))}
    </div>
  );
};

export default Eyes;