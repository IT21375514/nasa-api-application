import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Modal, Spinner } from "react-bootstrap"; // Import Modal component
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { auth } from "./firebase"; // Import Firebase authentication
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const db = getDatabase(); // Get a reference to the database

// Define the logout function outside of the Login component
export const logout = async (setLoggedIn) => {
  try {
    
    const authInstance = getAuth();
    const currentUser = authInstance.currentUser;
    if (!currentUser) {
      console.log("Before User has been successfully logged out.");
    } else {
      console.log("Before User is still logged in:", currentUser);
    }
    console.log("log out");
  // Remove authentication data from localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('userInfo');
  localStorage.removeItem('userData');
  localStorage.removeItem('startDate');
  localStorage.removeItem('endDate');
  
  // Set loggedIn state to false
  setLoggedIn(false);
    await signOut(authInstance);
    // setLoggedIn(false); // Update loggedIn state to false

    // Wait for the authentication state to update
    authInstance.onAuthStateChanged((user) => {
      if (!user) {
        console.log("After User has been successfully logged out.");
        setLoggedIn(false); // Update loggedIn state to false
      } else {
        console.log("After User is still logged in:", user);
      }
    });
  } catch (error) {
    console.error("Error logging out:", error);
    // Handle any errors that occur during logout
  }
};

function Login({ setLoggedIn }) {
  const [loginUsername, setLoginUsername] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for showing success modal
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [showErrorModal, setShowErrorModal] = useState(false); // State for showing failure modal
  const [errorMessage, setErrorMessage] = useState(""); // State for failure message
  const [loading, setLoading] = useState(false); // State for loading spinner

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      if (!loginEmail && !loginPassword){
        setErrorMessage("Please enter email and password."); // Set error message
      }else if(!loginEmail){
        setErrorMessage("Please enter your email."); // Set error message
      }else {
        setErrorMessage("Please enter your password."); // Set error message
      }
      
      setShowErrorModal(true); // Show failure modal
      return;
    }
    try {
      setLoading(true);
      const authInstance = getAuth();
      const userCredential = await signInWithEmailAndPassword(authInstance, loginEmail, loginPassword);
      // After successful login, retrieve user data and store it in localStorage
      const { user } = userCredential;
      const authToken = await user.getIdToken();
      const userInfo = { email: user.email, name: user.displayName };
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      setSuccessMessage("Login successful!");
      setShowSuccessModal(true);
      setTimeout(() => {
        setLoggedIn(true);
      }, 3000);
    } catch (error) {
      setLoading(false); // Set loading to false
      setErrorMessage("Invalid email or password."); // Set error message
      setShowErrorModal(true); // Show failure modal
    }
  };

// Check authentication state upon loading the application
useEffect(() => {
  // Check if authentication data exists in localStorage
  const authToken = localStorage.getItem('authToken');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
  // If authentication data exists, set loggedIn state to true
  if (authToken && userInfo) {
    setLoggedIn(true);
  }
}, []);



  const handleSignup = async () => {
    if (!name || !signupEmail || !signupPassword) {
      setErrorMessage("Please enter name, email, and password."); // Set error message
      setShowErrorModal(true); // Show failure modal
      return;
    }
    
    try {
      setLoading(true); // Set loading to true
      const authInstance = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        authInstance,
        signupEmail,
        signupPassword
      );
  
      // Get user ID
      const userId = userCredential.user.uid;
  
      // Construct user data object
      const userData = {
        email: signupEmail,
        name: name,
        userType: "user" // Assuming the default user type is "user"
      };
  
      // Store user data in the Realtime Database
      await set(ref(db, `users/${userId}`), userData);
  
      // Update user profile (optional)
      await updateProfile(userCredential.user, { displayName: name });
  
      localStorage.setItem('authToken', userCredential.accessToken);
      localStorage.setItem('userInfo', JSON.stringify(userCredential.user));

      setSuccessMessage("Signup successful!"); // Set success message
      setShowSuccessModal(true); // Show success modal
      setTimeout(() => {
        setLoggedIn(true); // Set logged in after 5 seconds
      }, 3000);
    } catch (error) {
      setLoading(false); // Set loading to false
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Email is already registered."); // Set error message
      } else {
        setErrorMessage("Signup failed. Please try again."); // Set error message
      }
      setShowErrorModal(true); // Show error modal
    }
  };

  return (
    <Container id="login" className="d-flex align-items-center justify-content-center">
      <div id="login-div">
        <div className="text-center mb-4">
          <img src='img/bg-logo.png'  alt="Logo" height="80" />
        </div>
        <div className="ImgContainer mb-5">
          <img src='img/astrodiscover-logo-text.png' alt="mar-demo-pic" className="bgImage" />
        </div>
        <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="home" title="Login">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                </Form.Group>
                <div className="mt-5 col-md-12 d-flex justify-content-center">
                  <Button className="btn btn-outline-light btn-lg" type="button" onClick={handleLogin}>
                    Login
                  </Button>
                </div>
              </Form>
            </Tab>

            <Tab eventKey="profile" title="Signup">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" placeholder="Enter email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                </Form.Group>
                <div className="mt-5 col-md-12 d-flex justify-content-center">
                  <Button className="btn btn-outline-light btn-lg" type="button" onClick={handleSignup}>
                    Signup
                  </Button>
                </div>
              </Form>
            </Tab>
        </Tabs>
      </div>
      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Body>
          {loading ? ( // Conditionally render spinner if loading
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>{successMessage}</>
          )}
        </Modal.Body>
      </Modal>
      
      {/* Failure Modal */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Login;
