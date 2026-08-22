import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";
import Details from "./pages/Details/Details";

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-amber-50">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipe-item/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;