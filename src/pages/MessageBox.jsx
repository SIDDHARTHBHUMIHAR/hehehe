// src/pages/MessageBox.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { messages, formatDate } from "./messagesData.js";

const MessageBox = () => {
  const navigate = useNavigate();
  const [activeMessage, setActiveMessage] = useState(null);
  const [visibleMessages, setVisibleMessages] = useState([]);

  // Initialize with 5-8 random messages on load
  useEffect(() => {
    const getRandomMessages = () => {
      const count = 5 + Math.floor(Math.random() * 4); // 5-8 messages
      const shuffled = [...messages].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    setVisibleMessages(getRandomMessages());

    // nothing to cleanup for this silent page
    return () => {};
  }, []);

  // No audio on this page — messages are silent letter previews.

  const openMessage = (message) => {
    setActiveMessage(message);
  };

  const closeMessage = () => {
    setActiveMessage(null);
  };

  const toggleMusic = () => {
    // noop — music removed from this page
  };

  const getNextMessage = () => {
    const currentIndex = visibleMessages.findIndex(m => m.id === activeMessage?.id);
    const nextIndex = (currentIndex + 1) % visibleMessages.length;
    setActiveMessage(visibleMessages[nextIndex]);
  };

  const getPrevMessage = () => {
    const currentIndex = visibleMessages.findIndex(m => m.id === activeMessage?.id);
    const prevIndex = (currentIndex - 1 + visibleMessages.length) % visibleMessages.length;
    setActiveMessage(visibleMessages[prevIndex]);
  };

  // Heart animation configuration (similar to other pages)
  const colors = {
    background: "linear-gradient(135deg, #fff9f0 0%, #fff5e6 100%)",
    heart: "#ff0000",
    heartSecondary: "#ff6b8b",
    heartTertiary: "#ff4757"
  };

  const generateHearts = (count) => 
    [...Array(count)].map((_, i) => ({
      id: `heart-${i}`,
      initial: { 
        opacity: 0,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + Math.random() * 100
      },
      animate: { 
        opacity: [0.2, 0.5, 0],
        y: `-${Math.random() * 600 + 100}px`,
        x: `${Math.random() * 200 - 100}px`,
        rotate: Math.random() * 360,
        scale: [0.8, 1.2, 0.9]
      },
      transition: {
        duration: Math.random() * 12 + 8,
        repeat: Infinity,
        repeatDelay: Math.random() * 5,
        ease: "easeOut"
      },
      style: {
        fontSize: `${Math.random() * 15 + 10}px`,
        color: [colors.heart, colors.heartSecondary, colors.heartTertiary][
          Math.floor(Math.random() * 3)
        ],
        position: 'absolute',
        zIndex: 1,
        pointerEvents: 'none'
      }
    }));

  const [hearts] = useState(() => generateHearts(20));

  return (
    <div 
      className="message-box-page"
      style={{
        background: colors.background,
        minHeight: "100vh",
        padding: "2rem",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Back Button */}
      <motion.button
        className="back-button"
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05, backgroundColor: "#ff6b6b" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ zIndex: 100 }}
      >
        ← Back
      </motion.button>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: "center",
          fontFamily: "'Caveat', cursive",
          fontSize: "3.5rem",
          color: "#3a3631",
          marginBottom: "3rem",
          position: "relative",
          zIndex: 2
        }}
      >
        Message Box
        <div style={{
          height: "3px",
          width: "200px",
          background: "linear-gradient(90deg, #ffb6c1, #98fb98, #87ceeb)",
          margin: "10px auto 0",
          borderRadius: "3px"
        }}></div>
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          color: "#666",
          maxWidth: "600px",
          margin: "0 auto 3rem",
          position: "relative",
          zIndex: 2,
          background: "rgba(255, 255, 255, 0.7)",
          padding: "1rem 1.5rem",
          borderRadius: "12px",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          backdropFilter: "blur(10px)"
        }}
      >
        Thoughts, inspirations, and daily reflections from the artist's journey.
        <br />
        <small style={{ opacity: 0.7, fontSize: "0.9rem" }}>
          Edit messages and their music in <code>messagesData.js</code> file
        </small>
      </motion.p>

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

      {/* Message Pop-ups */}
      <div className="message-grid">
        {visibleMessages.map((message, i) => (
          <motion.div
            className="message-card"
            key={message.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => openMessage(message)}
          >
            <div className="message-card-visual" style={{ background: `linear-gradient(135deg, ${message.color}15, #fff)`, border: `4px solid ${message.color}30` }}>
              <div className="message-card-icon">✉️</div>
            </div>
            <h3 className="message-card-title" style={{ color: message.color }}>{message.title}</h3>
            <p className="message-card-excerpt">{message.content.substring(0, 80)}...</p>
            <div className="message-card-date">{new Date(message.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
          </motion.div>
        ))}
      </div>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {activeMessage && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={closeMessage}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "#000",
                zIndex: 1000
              }}
            />
            
            {/* Message Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 20 }}
              className="message-modal"
              style={{
                background: `linear-gradient(135deg, ${activeMessage.color}10, #ffffff)`,
                border: `3px solid ${activeMessage.color}30`,
                boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
                backdropFilter: "blur(20px)",
                zIndex: 1001
              }}
            >
              {/* Close Button */}
              <button
                onClick={closeMessage}
                className="message-modal-close"
                style={{ color: activeMessage.color }}
              >
                ✕
              </button>

              {/* Music removed: messages are silent letters */}

              {/* Date */}
              <div style={{
                color: activeMessage.color,
                fontSize: "0.9rem",
                fontWeight: 600,
                marginBottom: "10px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginTop: activeMessage.music ? "0" : "0"
              }}>
                {formatDate(activeMessage.date)}
                {activeMessage.music && (
                  <span style={{
                    marginLeft: "10px",
                    fontSize: "0.8rem",
                    opacity: 0.7,
                    fontWeight: "normal"
                  }}>
                    ♫ Music enabled
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="message-modal-title" style={{ color: activeMessage.color }}>{activeMessage.title}</h2>

              {/* Content */}
              <div className="message-modal-content" style={{ borderLeft: `4px solid ${activeMessage.color}` }}>
                {activeMessage.content}
              </div>

              {/* Navigation */}
              {visibleMessages.length > 1 && (
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "30px",
                  gap: "20px"
                }}>
                  <motion.button
                    onClick={getPrevMessage}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => sketchSounds.play('hover')}
                    style={{
                      padding: "12px 25px",
                      background: "rgba(255,255,255,0.8)",
                      border: `2px solid ${activeMessage.color}40`,
                      borderRadius: "50px",
                      color: activeMessage.color,
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: 600,
                      flex: 1,
                      backdropFilter: "blur(10px)"
                    }}
                  >
                    ← Previous
                  </motion.button>
                  
                  <motion.button
                    onClick={getNextMessage}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => sketchSounds.play('hover')}
                    style={{
                      padding: "12px 25px",
                      background: activeMessage.color,
                      border: "none",
                      borderRadius: "50px",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: 600,
                      flex: 1
                    }}
                  >
                    Next →
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(255,255,255,0.9)",
          padding: "10px 20px",
          borderRadius: "50px",
          fontSize: "0.9rem",
          color: "#666",
          zIndex: 2,
          border: "1px solid rgba(0,0,0,0.1)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
        }}
      >
        Click on any message to read it
      </motion.div>
    </div>
  );
};

export default MessageBox;