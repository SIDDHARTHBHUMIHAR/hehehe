// src/pages/Gallery.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { sketches } from "./sketchesData.js";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    try {
      localStorage.setItem("sketchNotes", JSON.stringify(notes));
    } catch (e) {
      console.warn("Could not save notes", e);
    }
  }, [notes]);

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
        onClick={() => window.history.back()}
        whileHover={{ scale: 1.05, backgroundColor: "#ff6b6b" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        ← Back
      </motion.button>

      <h2>My Sketches</h2>

      <div className="grid">
        {sketches.map((sketch) => (
          // Wrap only the clickable parts (image + note) in Link.
          <div key={sketch.id} className="grid-item">
            <Link
              to={`/sketch/${sketch.id}`}
              className="grid-link"
              aria-label={`Open ${sketch.title}`}
            >
              <img src={sketch.image} alt={sketch.title} />
              <p>{sketch.note}</p>
            </Link>

            {/* SMS box / Add note control (Commented Out) */}
            {/* <div style={{ marginTop: 12 }}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  openAside(sketch);
                }}
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "none",
                  background: "#ff6b6b",
                  color: "#fff",
                  cursor: "pointer"
                }}
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
              onClick={closeAside}
              style={{ background: "transparent", border: "none", fontSize: 20 }}
            >
              ✕
            </button>
          </div>

          <img
            src={selectedSketch.image}
            alt={selectedSketch.title}
            style={{ width: "100%", borderRadius: 8, border: "6px solid white" }}
          />

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
          />

          <div style={{ marginTop: "auto", display: "flex", gap: 8 }}>
            <button
              onClick={() => {
                closeAside();
              }}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 8,
                border: "none",
                background: "#4a4a4a",
                color: "#fff",
              }}
            >
              Done
            </button>
            <button
              onClick={() => {
                updateNote(selectedSketch.id, "");
              }}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 8,
                border: "none",
                background: "#e44",
                color: "#fff",
              }}
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