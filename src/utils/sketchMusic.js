let currentAudio = null;
let currentSource = null;
let stopTimer = null;

const clearScheduledStop = () => {
  if (stopTimer) {
    window.clearTimeout(stopTimer);
    stopTimer = null;
  }
};

export const playSketchMusic = (source) => {
  if (!source) return;

  clearScheduledStop();

  if (currentAudio && currentSource === source) {
    currentAudio.play().catch((err) => console.warn("Audio playback prevented:", err));
    return;
  }

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = new Audio(source);
  currentAudio.loop = true;
  currentSource = source;
  currentAudio.play().catch((err) => console.warn("Audio playback prevented:", err));
};

export const stopSketchMusic = () => {
  clearScheduledStop();

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = null;
  currentSource = null;
};

export const scheduleSketchMusicStop = () => {
  clearScheduledStop();
  stopTimer = window.setTimeout(stopSketchMusic, 0);
};
