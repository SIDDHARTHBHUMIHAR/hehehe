import { useState } from "react";
import { sketchSounds } from "../utils/sounds";

const SoundToggle = () => {
  const [enabled, setEnabled] = useState(true);

  const toggleSound = () => {
    const newState = !enabled;
    setEnabled(newState);
    sketchSounds.toggle(newState);
    sketchSounds.play("click");
  };

  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={toggleSound}
      onMouseEnter={() => sketchSounds.play("hover")}
      aria-label={enabled ? "Turn sound off" : "Turn sound on"}
      title={enabled ? "Sound on" : "Sound off"}
    >
      {enabled ? "On" : "Off"}
    </button>
  );
};

export default SoundToggle;
