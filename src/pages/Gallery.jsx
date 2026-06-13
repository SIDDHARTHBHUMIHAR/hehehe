// src/pages/Gallery.jsx
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { sketches } from "./sketchesData.js";
import { useState, useEffect } from "react";
import { sketchSounds } from "../utils/sounds.js";

const Gallery = () => {
  const [notes, setNotes] = useState(() => {
    try {
      const raw = localStorage.getItem("sketchNotes");
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  });
  const [selectedSketch, setSelectedSketch] = useState(null);
  const [filter, setFilter] = useState('all');
  const [filteredSketches, setFilteredSketches] = useState(sketches);
  const [isShuffling, setIsShuffling] = useState(false);

  // Filter categories from sketches
  const categories = ['all', ...new Set(sketches.map(sketch => sketch.category || 'general'))];

  useEffect(() => {
    try {
      localStorage.setItem("sketchNotes", JSON.stringify(notes));
    } catch (e) {
      console.warn("Could not save notes", e);
    }
  }, [notes]);

  const navigate = useNavigate();

  // Handle filter change
  const handleFilter = (category) => {
    sketchSounds.play('pageTurn');
    setIsShuffling(true);

    if (category === 'all') {
      setFilteredSketches(sketches);
    } else {
      setFilteredSketches(sketches.filter(sketch => sketch.category === category));
    }
    setFilter(category);

    setTimeout(() => {
      setIsShuffling(false);
    }, 150);
  };

  function openAside(sketch) {
    setSelectedSketch(sketch);
  }

  function closeAside() {
    setSelectedSketch(null);
  }

  function updateNote(sketchId, value) {
    setNotes((prev) => ({ ...prev, [sketchId]: value }));
  }

  return (
    <div className="gallery">
      <motion.button
        className="back-button"
        onClick={() => {
          sketchSounds.play('click');
          navigate(-1);
        }}
        whileHover={{ scale: 1.05, backgroundColor: "#ff6b6b" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
        onMouseEnter={() => sketchSounds.play('hover')}
      >
        ← Back
      </motion.button>

      <h2 className="pencil-stroke">My Sketches</h2>

      {/* Gallery Filters */}
      <div className="gallery-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${filter === category ? 'active' : ''}`}
            onClick={() => handleFilter(category)}
            onMouseEnter={() => sketchSounds.play('hover')}
          >
            {category === 'all' ? 'All Sketches' : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid">
        {filteredSketches.map((sketch) => (
          <div 
            key={sketch.id} 
            className={`grid-item draw-effect ${isShuffling ? 'shuffling' : ''}`}
            style={{ animationDelay: `${sketch.id * 0.05}s` }}
          >
            <Link
              to={`/sketch/${sketch.id}`}
              className="grid-link draw-on-hover"
              aria-label={`Open ${sketch.title}`}
              onClick={() => sketchSounds.play('click')}
              onMouseEnter={() => sketchSounds.play('hover')}
            >
              <div className="artwork-container" style={{width: '100%', height: '220px'}}>
                <img src={sketch.image} alt={sketch.title} className="responsive-sketch" />
              </div>
              <p>{sketch.note}</p>
            </Link>

            {/* SMS box / Add note control (Commented Out) */}
            {/* <div style={{ marginTop: 12 }}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  openAside(sketch);
                  sketchSounds.play('click');
                }}
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "none",
                  background: "#ff6b6b",
                  color: "#fff",
                  cursor: "pointer"
                }}
                onMouseEnter={() => sketchSounds.play('hover')}
              >
                Add/View Note
              </button>
            </div> */}
          </div>
        ))}
      </div>

      {/* Aside panel */}
      {selectedSketch && (
        <aside
          style={{
            position: "fixed",
            right: 0,
            top: 0,
            height: "100vh",
            width: "380px",
            maxWidth: "95%",
            background: "linear-gradient(180deg, #fff, #ffeef0)",
            boxShadow: "-10px 0 30px rgba(0,0,0,0.2)",
            zIndex: 9999,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: 0 }}>{selectedSketch.title}</h3>
            <button
              onClick={() => {
                closeAside();
                sketchSounds.play('click');
              }}
              style={{ background: "transparent", border: "none", fontSize: 20 }}
              onMouseEnter={() => sketchSounds.play('hover')}
            >
              ✕
            </button>
          </div>

          <div style={{ width: "100%", borderRadius: 8, border: "6px solid white", overflow: 'hidden' }}>
            <img
              src={selectedSketch.image}
              alt={selectedSketch.title}
              className="responsive-sketch"
              style={{ borderRadius: 8, display: 'block' }}
            />
          </div>

          <label style={{ fontWeight: 600 }}>Your note</label>
          <textarea
            value={notes[selectedSketch.id] || ""}
            onChange={(e) => updateNote(selectedSketch.id, e.target.value)}
            placeholder="Write a private note for this sketch..."
            style={{
              minHeight: 120,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ddd",
            }}
            onFocus={() => sketchSounds.play('hover')}
          />

          <div style={{ marginTop: "auto", display: "flex", gap: 8 }}>
            <button
              onClick={() => {
                closeAside();
                sketchSounds.play('click');
              }}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 8,
                border: "none",
                background: "#4a4a4a",
                color: "#fff",
              }}
              onMouseEnter={() => sketchSounds.play('hover')}
            >
              Done
            </button>
            <button
              onClick={() => {
                updateNote(selectedSketch.id, "");
                sketchSounds.play('click');
              }}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 8,
                border: "none",
                background: "#e44",
                color: "#fff",
              }}
              onMouseEnter={() => sketchSounds.play('hover')}
            >
              Clear
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};

export default Gallery;