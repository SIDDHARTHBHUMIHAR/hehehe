import { useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { sketches } from "./sketchesData.js";

const SketchDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const sketch = sketches.find((sk) => sk.id === parseInt(id, 10));
  const favoriteEmoji =
    location.state?.fromFavorites && location.state?.expressionEmoji
      ? location.state.expressionEmoji
      : null;

  const floatingFavoriteEmojis = useMemo(
    () =>
      favoriteEmoji
        ? [...Array(18)].map((_, index) => ({
            id: `favorite-detail-emoji-${index}`,
            initial: {
              opacity: 0,
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + Math.random() * 80,
            },
            animate: {
              opacity: [0, 0.64, 0],
              y: `-${Math.random() * 560 + 150}px`,
              x: `${Math.random() * 220 - 110}px`,
              rotate: Math.random() * 80 - 40,
              scale: [0.7, 1.18, 0.9],
            },
            transition: {
              duration: Math.random() * 9 + 8,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
              ease: "easeOut",
            },
            style: {
              position: "fixed",
              zIndex: 1,
              pointerEvents: "none",
              fontSize: `${Math.random() * 20 + 18}px`,
            },
          }))
        : [],
    [favoriteEmoji]
  );

  useEffect(() => {
    let audio;

    if (sketch?.music) {
      audio = new Audio(sketch.music);
      audio.loop = true;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch((err) => console.warn("Autoplay prevented:", err));
      }
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [sketch]);

  if (!sketch) {
    return (
      <main className="sketch-detail">
        <div className="empty-state">Sketch not found.</div>
      </main>
    );
  }

  return (
    <main className="sketch-detail">
      {favoriteEmoji &&
        floatingFavoriteEmojis.map((item) => (
          <Motion.div
            key={item.id}
            className="favorite-detail-emoji"
            initial={item.initial}
            animate={item.animate}
            transition={item.transition}
            style={item.style}
            aria-hidden="true"
          >
            {favoriteEmoji}
          </Motion.div>
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
        className="detail-shell"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="detail-artwork">
          <img src={sketch.image} alt={sketch.title} className="responsive-sketch" />
        </div>
        <p>{sketch.note}</p>
      </Motion.section>
    </main>
  );
};

export default SketchDetail;
