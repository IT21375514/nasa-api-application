import { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

function Navigation({ activeSection,  handleLogout }) {
  const [showAccount, setShowAccount] = useState(false);
  const [accountActive, setAccountActive] = useState(false); 
  const [userData, setUserData] = useState(null); // State to store user data

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        const userRef = ref(db, `users/${userId}`);
        
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          setUserData(data);
        });
      } else {
        setUserData(null);
      }
    });
  }, []);

  const handleAccountClick = () => {
    setShowAccount(true);
    setAccountActive(true); // Set account icon active when clicked
  };

  const handleClose = () => {
    setShowAccount(false);
    setAccountActive(false); // Reset account icon active when closed
  };

    return (
    <>
      <Navbar id="head-nav-bar" variant="light" fixed="top" expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">
            <img src="img/astrodiscover-logo.png" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="my-2 my-lg-0 sub-nav" navbarScroll>
              <Nav.Link href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</Nav.Link>
              <Nav.Link href="#about" className={activeSection === 'about' ? 'active' : ''}>About</Nav.Link>
              <Nav.Link href="#apod" className={activeSection === 'apod' ? 'active' : ''}>APOD</Nav.Link>
              <Nav.Link href="#earthimagery" className={activeSection === 'earthimagery' ? 'active' : ''}>NeoWs</Nav.Link>
              <Nav.Link href="#" onClick={handleAccountClick}>
                <img src={accountActive ? "img/user_active.png" : "img/user.png"} alt="Account"/>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas id="account-offcanvas" show={showAccount} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='mb-5'>Account</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="text-center">
            <img src="img/user.png" roundedCircle/>
            {userData && (
            <>
            <h5 className="mt-3">{userData.name}</h5>
            <p>{userData.email}</p>
            </>
            )}
            </div>
            </Offcanvas.Body>

            <Button className="btn btn-outline-light btn-lg btn-logout" type="button"  onClick={handleLogout}>
            Log Out
            </Button>
      </Offcanvas>
    </>
  );


}


export default Navigation;
