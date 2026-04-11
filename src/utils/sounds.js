// Sound effects utility
class SketchSounds {
  constructor() {
    this.sounds = {};
    this.volume = 0.3;
    this.enabled = true;
    
    // Initialize sounds
    this.initSounds();
  }
  
  initSounds() {
    // Pencil sounds
    this.sounds.pencilDraw = this.createSound('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ');
    this.sounds.pageTurn = this.createSound('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ');
    this.sounds.hover = this.createSound('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ');
    this.sounds.click = this.createSound('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ');
  }
  
  createSound(dataUri) {
    const audio = new Audio(dataUri);
    audio.volume = this.volume;
    return audio;
  }
  
  play(soundName) {
    if (!this.enabled || !this.sounds[soundName]) return;
    
    try {
      const sound = this.sounds[soundName];
      sound.currentTime = 0;
      sound.play().catch(e => console.log('Audio play failed:', e));
    } catch (e) {
      console.log('Sound error:', e);
    }
  }
  
  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    Object.values(this.sounds).forEach(sound => {
      sound.volume = this.volume;
    });
  }
  
  toggle(enabled) {
    this.enabled = enabled;
  }
}

// Export singleton instance
export const sketchSounds = new SketchSounds();