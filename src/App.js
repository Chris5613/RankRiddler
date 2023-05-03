import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Valorant from "./Components/Valorant";
import Home from "./Components/Home";
import Tos from "./Components/Tos";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/valorant" element={<Valorant />} />
        <Route path="/tos" element={<Tos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
