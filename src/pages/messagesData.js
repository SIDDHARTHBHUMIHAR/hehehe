// src/pages/messagesData.js
// You can edit these messages in VS Code
// Add/remove messages as needed

export const messages = [
  {
    id: 1,
    date: "2024-12-01",
    title: "Inspiration Day",
    content: "Today I found inspiration in the morning light. Sometimes the simplest things spark the greatest creativity.",
    color: "#ff6b6b",
    position: { top: "15%", left: "10%" },
    music: "/audio/aud1.mp3"  // ADDED MUSIC
  },
  {
    id: 2,
    date: "2024-12-02", 
    title: "New Technique",
    content: "Experimented with cross-hatching today. The texture it creates is absolutely mesmerizing!",
    color: "#4a90e2",
    position: { top: "25%", right: "15%" },
    music: "/assets/music2.mp3"  // ADDED MUSIC
  },
  {
    id: 3,
    date: "2024-12-03",
    title: "Artist Thoughts",
    content: "Art isn't just about what you see. It's about what you feel while creating it.",
    color: "#6bcf7f",
    position: { bottom: "20%", left: "5%" },
    music: "/audio/aud1.mp3"  // ADDED MUSIC
  },
  {
    id: 4,
    date: "2024-12-04",
    title: "Sketchbook Love",
    content: "My sketchbook is like a visual diary. Each page tells a story of that particular moment.",
    color: "#ff8e53",
    position: { top: "40%", left: "50%" },
    music: "/assets/music2.mp3"  // ADDED MUSIC
  },
  {
    id: 5,
    date: "2024-12-05",
    title: "Creative Block",
    content: "Hit a creative block today. Sometimes stepping away is the best solution. Tomorrow is a new day!",
    color: "#9b59b6",
    position: { bottom: "30%", right: "10%" },
    music: "/audio/aud1.mp3"  // ADDED MUSIC
  },
  {
    id: 6,
    date: "2024-12-06",
    title: "Progress",
    content: "Looking back at old sketches shows how much progress I've made. Growth is beautiful.",
    color: "#3498db",
    position: { top: "60%", left: "20%" },
    music: "/assets/music2.mp3"  // ADDED MUSIC
  },
  {
    id: 7,
    date: "2024-12-07",
    title: "Color Palette",
    content: "Discovered a new color combination today: burnt sienna and cerulean blue. Perfect for autumn sketches.",
    color: "#e74c3c",
    position: { top: "10%", right: "5%" },
    music: "/audio/aud1.mp3"  // ADDED MUSIC
  },
  {
    id: 8,
    date: "2024-12-08",
    title: "Art & Emotions",
    content: "Every stroke carries emotion. Today's sketches are filled with joy and gratitude.",
    color: "#2ecc71",
    position: { bottom: "15%", left: "60%" },
    music: "/assets/music2.mp3"  // ADDED MUSIC
  }
];

// Format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};