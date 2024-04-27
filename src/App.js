import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About"
import Apod from "./components/Apod";
import EarthImagery from "./components/EarthImagery";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content" style={{ backgroundColor: "#04051e" }}>
        <Home />
        <About />
        <Apod />
        <EarthImagery />
        <Footer />
      </div>
    </div>
  );
}

export default App;