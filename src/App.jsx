import { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import SketchDetail from "./pages/SketchDetail";
import CategorySelector from "./pages/CategorySelector";
import Favorites from "./pages/Favorites";
import Eyes from "./pages/Eyes";
import MessageBox from "./pages/MessageBox"; // NEW IMPORT
import SketchbookLoader from "./components/SketchbookLoader";
import SoundToggle from "./components/SoundToggle";
import { sketchSounds } from "./utils/sounds";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Enable sounds
    sketchSounds.toggle(true);
    sketchSounds.setVolume(0.3);
    
    // Play welcome sound
    setTimeout(() => {
      sketchSounds.play('pageTurn');
    }, 500);

    // Simulate initial load
    const timer = setTimeout(() => {
      setLoading(false);
      sketchSounds.play('click');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <SketchbookLoader />}
      <div className={loading ? '' : 'page-transition'}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<CategorySelector />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/eyes" element={<Eyes />} />
            <Route path="/message-box" element={<MessageBox />} /> {/* NEW ROUTE */}
            <Route path="/sketch/:id" element={<SketchDetail />} />
          </Routes>
        </Router>
        <SoundToggle />
      </div>
    </>
  );
};

export default App;