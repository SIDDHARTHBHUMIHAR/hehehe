import { AnimatePresence, motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sketches } from "./sketchesData.js";
import { playSketchMusic, scheduleSketchMusicStop } from "../utils/sketchMusic.js";

// Edit these lines once to show the same message beneath every eye sketch.
const COMMON_EYES_MESSAGE = "Kabhi tumhe saamne se dekhne ka mauka nahi mila  Bas scoty🛵 pr uncle k sath piche bethe k guzarte hue scafh se dhake uss chehre pe yea Ankhein👀 dekhi ty aur fir roj jb meri catjee🚐 ki van vaha rukti to window🪟 k side beth k tumhare aane ka wait krta🫠🧐 kbhi tum dikhti aur kbhi nhi🙂 Time kitna bith gya pr aaj bhi unmein wahi sukoon hai🙆 shayad isiliye yea sketch sirf ankhon ka nhi yaad ka hai💕 aur vo aaj bhi utni he sunder hai🫣🫶";

const Eyes = () => {
  const navigate = useNavigate();
  const eyeSketches = sketches.filter((sketch) => sketch.category === "eyes");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    playSketchMusic("/audio/Ideyes.mp3", 0.45);

    return scheduleSketchMusicStop;
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + eyeSketches.length) % eyeSketches.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % eyeSketches.length);
  };

  const currentSketch = eyeSketches[currentIndex];
  const previousSketch =
    eyeSketches[(currentIndex - 1 + eyeSketches.length) % eyeSketches.length];
  const nextSketch = eyeSketches[(currentIndex + 1) % eyeSketches.length];

  return (
    <main className="eyes-page-bg eyes-page">
      {[...Array(8)].map((_, index) => (
        <div
          key={`shaving-${index}`}
          className="pencil-shavings"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 15}s`,
          }}
        />
      ))}

      <Motion.button
        type="button"
        className="back-button"
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        Back
      </Motion.button>

      <header className="eyes-header">
        <span className="section-kicker">Eye studies</span>
        <h2 className="pencil-stroke">Eyes</h2>
      </header>

      {currentSketch ? (
        <section className="eyes-stage">
          {eyeSketches.length > 1 && (
            <button type="button" className="eyes-preview prev" onClick={goToPrevious}>
              <img
                src={previousSketch.image}
                alt={previousSketch.title || "Previous eye sketch"}
                className="responsive-sketch"
              />
            </button>
          )}

          <AnimatePresence mode="wait">
            <Motion.figure
              key={currentSketch.id}
              className="eyes-main"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.45 }}
            >
              <img
                src={currentSketch.image}
                alt={currentSketch.title || "Eye sketch"}
                className="responsive-sketch"
              />
              <figcaption>{COMMON_EYES_MESSAGE}</figcaption>
            </Motion.figure>
          </AnimatePresence>

          {eyeSketches.length > 1 && (
            <button type="button" className="eyes-preview next" onClick={goToNext}>
              <img
                src={nextSketch.image}
                alt={nextSketch.title || "Next eye sketch"}
                className="responsive-sketch"
              />
            </button>
          )}
        </section>
      ) : (
        <div className="empty-state">No eye sketches found.</div>
      )}

      {eyeSketches.length > 1 && (
        <div className="eyes-controls">
          <Motion.button
            type="button"
            onClick={goToPrevious}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Previous
          </Motion.button>
          <Motion.button
            type="button"
            onClick={goToNext}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Next
          </Motion.button>
        </div>
      )}
    </main>
  );
};

export default Eyes;
