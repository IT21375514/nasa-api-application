import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About"
import Apod from "./components/Apod";
import EarthImagery from "./components/EarthImagery";
///jjj
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content" style={{ backgroundColor: "#04051e" }}>
        <Home />
        <About />
        <Apod />
        <EarthImagery />
        <div className='row'>
              <div className='col-md-6'   style={{ backgroundColor: '#435435',padding:'40px 40px'}}>
                </div>
                <div className='col-md-6'   style={{ backgroundColor: '#ffffff',padding:'40px 40px'}}>
                </div>
                </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;