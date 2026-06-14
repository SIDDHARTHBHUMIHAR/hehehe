import { AnimatePresence, motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate, messages } from "./messagesData.js";

const MessageBox = () => {
  const navigate = useNavigate();
  const [activeMessage, setActiveMessage] = useState(null);
  const [visibleMessages, setVisibleMessages] = useState([]);

  useEffect(() => {
    const count = 5 + Math.floor(Math.random() * 4);
    const shuffled = [...messages].sort(() => 0.5 - Math.random());
    setVisibleMessages(shuffled.slice(0, count));
  }, []);

  const activeIndex = visibleMessages.findIndex(
    (message) => message.id === activeMessage?.id
  );

  const getNextMessage = () => {
    setActiveMessage(visibleMessages[(activeIndex + 1) % visibleMessages.length]);
  };

  const getPrevMessage = () => {
    setActiveMessage(
      visibleMessages[
        (activeIndex - 1 + visibleMessages.length) % visibleMessages.length
      ]
    );
  };

  return (
    <main className="message-box-page">
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

      <Motion.header
        className="page-header"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <span className="section-kicker">Letters and reflections</span>
        <h2 className="pencil-stroke">Message Box</h2>
      </Motion.header>

      <div className="message-grid">
        {visibleMessages.map((message, index) => (
          <Motion.button
            type="button"
            className="message-card"
            key={message.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, type: "spring", stiffness: 200 }}
            whileHover={{ y: -6 }}
            onClick={() => setActiveMessage(message)}
          >
            <div
              className="message-card-visual"
              style={{
                "--message-color": message.color,
              }}
            >
              <span />
            </div>
            <h3 className="message-card-title" style={{ color: message.color }}>
              {message.title}
            </h3>
            <p className="message-card-excerpt">
              {message.content.substring(0, 86)}...
            </p>
            <time className="message-card-date" dateTime={message.date}>
              {new Date(message.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </time>
          </Motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeMessage && (
          <>
            <Motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.68 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveMessage(null)}
            />

            <Motion.article
              initial={{ opacity: 0, scale: 0.94, y: 36 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 36 }}
              transition={{ type: "spring", damping: 20 }}
              className="message-modal"
              style={{
                "--message-color": activeMessage.color,
              }}
            >
              <button
                type="button"
                onClick={() => setActiveMessage(null)}
                className="message-modal-close"
                aria-label="Close message"
              >
                x
              </button>

              <time className="message-modal-date" dateTime={activeMessage.date}>
                {formatDate(activeMessage.date)}
              </time>
              <h2 className="message-modal-title">{activeMessage.title}</h2>
              <div className="message-modal-content">{activeMessage.content}</div>

              {visibleMessages.length > 1 && (
                <div className="message-modal-actions">
                  <Motion.button
                    type="button"
                    onClick={getPrevMessage}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Previous
                  </Motion.button>
                  <Motion.button
                    type="button"
                    onClick={getNextMessage}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Next
                  </Motion.button>
                </div>
              )}
            </Motion.article>
          </>
        )}
      </AnimatePresence>
    </main>
  );
};

export default MessageBox;
