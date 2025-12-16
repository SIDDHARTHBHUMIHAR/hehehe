// src/pages/SketchDetail.jsx
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { sketches } from "./sketchesData.js";


const SketchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const sketch = sketches.find((sk) => sk.id === parseInt(id));

  useEffect(() => {
    let audio;
    if (sketch && sketch.music) {
      audio = new Audio(sketch.music);
      audio.loop = true;
      const p = audio.play();
      if (p !== undefined) p.catch((err) => console.warn("Autoplay prevented:", err));
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [sketch]);

  if (!sketch) {
    return <div>Sketch not found</div>;
  }

  return (
    <div className="sketch-detail">
      <motion.button
        className="back-button"
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05, backgroundColor: "#ff6b6b" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        ← Back
      </motion.button>

      <div className="animated-background"></div>
      <img src={sketch.image} alt={sketch.title} />
      <p>{sketch.note}</p>
      {/* Play/Pause UI removed — music auto-plays on opening the detail */}
    </div>
  );
};

export default SketchDetail;