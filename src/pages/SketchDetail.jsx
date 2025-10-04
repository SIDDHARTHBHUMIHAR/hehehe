import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Added motion import
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { sketches } from "./sketchesData";

const SketchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigation
  const sketch = sketches.find((sketch) => sketch.id === parseInt(id));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let audio;
    if (sketch && sketch.music) {
      audio = new Audio(sketch.music);
      if (isPlaying) {
        audio.play();
      }
    }
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [sketch, isPlaying]);

  if (!sketch) {
    return <div>Sketch not found</div>;
  }

  return (
    <div className="sketch-detail">
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

      <div className="animated-background"></div>
      <img src={sketch.image} alt={sketch.title} />
      <p>{sketch.note}</p>
      {sketch.music && (
        <button onClick={() => setIsPlaying(!isPlaying)} className="music-button">
          {isPlaying ? "Pause Music" : "Play Music"}
        </button>
      )}
    </div>
  );
};

export default SketchDetail;