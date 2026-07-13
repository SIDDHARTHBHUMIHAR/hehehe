import { AnimatePresence, motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { messages } from "./messagesData.js";

const getMessagePreview = (content) => {
  const maxLength = 44;

  if (content.length <= maxLength) {
    return content;
  }

  const trimmed = content.slice(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 24 ? lastSpace : maxLength)}...`;
};

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

      <div className="message-letter-grid">
        {visibleMessages.map((message, index) => (
          <Motion.button
            type="button"
            className="message-card message-letter"
            key={message.id}
            aria-label={`Open message: ${message.title}`}
            initial={{ opacity: 0, y: 18, rotateX: -16 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              delay: index * 0.07,
              type: "spring",
              stiffness: 210,
              damping: 20,
            }}
            whileHover={{ y: -8, rotate: index % 2 === 0 ? -1 : 1 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setActiveMessage(message)}
            style={{
              "--message-color": message.color,
            }}
          >
            <span className="message-letter-fold" aria-hidden="true" />
            <span className="message-letter-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="message-letter-title">{message.title}</span>
            <span className="message-letter-preview">
              {getMessagePreview(message.content)}
            </span>
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
