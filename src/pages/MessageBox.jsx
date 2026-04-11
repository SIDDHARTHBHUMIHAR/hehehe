// src/pages/MessageBox.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { messages, formatDate } from "./messagesData.js";
import { sketchSounds } from "../utils/sounds.js";

const MessageBox = () => {
  const navigate = useNavigate();
  const [activeMessage, setActiveMessage] = useState(null);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Initialize with 5-8 random messages on load
  useEffect(() => {
    const getRandomMessages = () => {
      const count = 5 + Math.floor(Math.random() * 4); // 5-8 messages
      const shuffled = [...messages].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    setVisibleMessages(getRandomMessages());
    
    // Play a soft sound when entering message box
    setTimeout(() => {
      sketchSounds.play('hover');
    }, 300);

    // Cleanup audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle music playback when activeMessage changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
    }

    if (activeMessage && activeMessage.music) {
      const audio = new Audio(activeMessage.music);
      audio.loop = true;
      audio.volume = 0.5; // Set volume to 50% for background music
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(err => {
            console.warn("Audio autoplay prevented:", err);
            setIsPlaying(false);
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
  }, [activeMessage]);

  const openMessage = (message) => {
    sketchSounds.play('click');
    setActiveMessage(message);
  };

  const closeMessage = () => {
    sketchSounds.play('click');
    setActiveMessage(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(err => console.warn("Audio play failed:", err));
      }
    }
    sketchSounds.play('click');
  };

  const getNextMessage = () => {
    const currentIndex = visibleMessages.findIndex(m => m.id === activeMessage?.id);
    const nextIndex = (currentIndex + 1) % visibleMessages.length;
    setActiveMessage(visibleMessages[nextIndex]);
    sketchSounds.play('pageTurn');
  };

  const getPrevMessage = () => {
    const currentIndex = visibleMessages.findIndex(m => m.id === activeMessage?.id);
    const prevIndex = (currentIndex - 1 + visibleMessages.length) % visibleMessages.length;
    setActiveMessage(visibleMessages[prevIndex]);
    sketchSounds.play('pageTurn');
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
        onMouseEnter={() => sketchSounds.play('hover')}
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
      <div style={{ position: "relative", minHeight: "60vh" }}>
        <AnimatePresence>
          {visibleMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 10 - 5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: Math.random() * 4 - 2,
                y: [0, -5, 0]
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ 
                duration: 0.5,
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              whileHover={{ 
                scale: 1.05, 
                rotate: 0,
                boxShadow: "0 15px 35px rgba(0,0,0,0.15)"
              }}
              onClick={() => openMessage(message)}
              onMouseEnter={() => sketchSounds.play('hover')}
              style={{
                position: "absolute",
                background: `linear-gradient(135deg, ${message.color}15, #ffffff)`,
                border: `2px solid ${message.color}40`,
                borderRadius: "15px",
                padding: "20px",
                width: "250px",
                cursor: "pointer",
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                backdropFilter: "blur(10px)",
                zIndex: 10,
                ...message.position
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <div style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: message.color
                  }}></div>
                  <h3 style={{
                    margin: 0,
                    color: message.color,
                    fontSize: "1.2rem",
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 600
                  }}>
                    {message.title}
                  </h3>
                </div>
                {message.music && (
                  <div style={{
                    fontSize: "1.2rem",
                    opacity: 0.7
                  }}>
                    ♫
                  </div>
                )}
              </div>
              <p style={{
                margin: "10px 0 0 0",
                color: "#3a3631",
                fontSize: "0.95rem",
                lineHeight: 1.4,
                opacity: 0.9
              }}>
                {message.content.substring(0, 80)}...
              </p>
              <div style={{
                fontSize: "0.8rem",
                color: "#999",
                marginTop: "10px",
                textAlign: "right"
              }}>
                {new Date(message.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
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
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: `linear-gradient(135deg, ${activeMessage.color}10, #ffffff)`,
                border: `3px solid ${activeMessage.color}30`,
                borderRadius: "20px",
                padding: "40px",
                width: "90%",
                maxWidth: "600px",
                maxHeight: "80vh",
                overflowY: "auto",
                zIndex: 1001,
                boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
                backdropFilter: "blur(20px)"
              }}
            >
              {/* Close Button */}
              <button
                onClick={closeMessage}
                onMouseEnter={() => sketchSounds.play('hover')}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "rgba(255,255,255,0.8)",
                  border: "none",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: activeMessage.color,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}
              >
                ✕
              </button>

              {/* Music Controls */}
              {activeMessage.music && (
                <motion.button
                  onClick={toggleMusic}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => sketchSounds.play('hover')}
                  style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    background: "rgba(255,255,255,0.8)",
                    border: `2px solid ${activeMessage.color}40`,
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: activeMessage.color,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  {isPlaying ? "⏸️" : "▶️"}
                </motion.button>
              )}

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
              <h2 style={{
                margin: "0 0 20px 0",
                color: activeMessage.color,
                fontSize: "2.5rem",
                fontFamily: "'Caveat', cursive",
                fontWeight: 700
              }}>
                {activeMessage.title}
              </h2>

              {/* Content */}
              <div style={{
                fontSize: "1.2rem",
                lineHeight: 1.6,
                color: "#3a3631",
                marginBottom: "30px",
                padding: "20px",
                background: "rgba(255,255,255,0.5)",
                borderRadius: "10px",
                borderLeft: `4px solid ${activeMessage.color}`
              }}>
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
        Click on any message to read it and listen to its music
      </motion.div>
    </div>
  );
};

export default MessageBox;