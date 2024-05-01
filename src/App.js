import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About"
import Apod from "./components/Apod";
import EarthImagery from "./components/EarthImagery";
import Login, { logout } from "./Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = async () => {
    try {
      // Call the logout function directly
      await logout(setLoggedIn);
      setLoggedIn(false); // Update loggedIn state to false
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle any errors that occur during logout
    }
  };

  return (
    <div className="App">
      {loggedIn ? (
        <>
          <Navbar handleLogout={handleLogout}/>
          <div className="content">
            <Home />
            <About />
            <Apod />
            <EarthImagery />
            <Footer />
          </div>
        </>
      ) : (
        <Login setLoggedIn={setLoggedIn} handleLogout={handleLogout}/>
      )}
    </div>
  );
}

export default App;
