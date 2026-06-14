import { useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { sketches } from "./sketchesData.js";

const SketchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const sketch = sketches.find((sk) => sk.id === parseInt(id, 10));

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
