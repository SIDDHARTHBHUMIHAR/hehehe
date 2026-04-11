import { useState } from 'react';
import { sketchSounds } from '../utils/sounds';

const SoundToggle = () => {
  const [enabled, setEnabled] = useState(true);

  const toggleSound = () => {
    const newState = !enabled;
    setEnabled(newState);
    sketchSounds.toggle(newState);
    sketchSounds.play('click');
  };

  return (
    <button
      onClick={toggleSound}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.9)',
        border: '2px solid #ff6b6b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 1000,
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)'
      }}
      onMouseEnter={() => sketchSounds.play('hover')}
    >
      {enabled ? '🔊' : '🔇'}
    </button>
  );
};

export default SoundToggle;