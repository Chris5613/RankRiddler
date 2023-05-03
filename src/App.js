import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Valorant from "./Components/Valorant";
import Home from "./Components/Home";

function App() {
  return (
    <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/valorant" element={<Valorant />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
