import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/views/Home";
import About from "./components/views/About";
import Events from "./components/views/Events";
import Rotware from "./components/views/Rotware";
import PeripheralVision from "./components/views/PeripheralVision";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/events" element={<Events />} />
      <Route path="/rotware" element={<Rotware />} />
      <Route path="/peripheral-vision" element={<PeripheralVision />} />
    </Routes>
  );
};

export default App;
