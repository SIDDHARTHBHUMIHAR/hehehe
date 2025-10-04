import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import SketchDetail from "./pages/SketchDetail";
import CategorySelector from "./pages/CategorySelector";
import Favorites from "./pages/Favorites";
import Eyes from "./pages/Eyes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<CategorySelector />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/eyes" element={<Eyes />} />
        <Route path="/sketch/:id" element={<SketchDetail />} />
      </Routes>
    </Router>
  );
};

export default App;