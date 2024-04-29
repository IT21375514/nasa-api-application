// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { Link } from 'react-scroll';

// function NavScrollExample({ fetchData }) {
//     return (
//       <Navbar variant='light' fixed="top" expand="lg" className="bg-body-tertiary">
//         <Container fluid>
//           <Navbar.Brand href="#">
//           <img src='img/astrodiscover-logo.png' alt="Logo" style={{ height: '30px' }} /></Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbarScroll" />
//           <Navbar.Collapse id="navbarScroll">
//             <Nav className="my-2 my-lg-0 sub-nav" navbarScroll>
//               <Nav.Link href="#home">Home</Nav.Link>
//               <Nav.Link href="#about">About</Nav.Link>
//               <Nav.Link onClick={fetchData}>APOD</Nav.Link>
//               <Nav.Link href="#about">NeoWs</Nav.Link>
//             </Nav>
//             {/* <Form className="d-flex">
//               <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
//               <Button>Search</Button>
//             </Form> */}
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     );
//   }

  

// export default NavScrollExample;

// import { useState } from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import Offcanvas from 'react-bootstrap/Offcanvas';

// function Navigation({ activeSection }) {
//   const [showAccount, setShowAccount] = useState(false);
//   const [accountActive, setAccountActive] = useState(false); // State to manage account icon active state

//   const handleAccountClick = () => {
//     setShowAccount(true);
//     setAccountActive(true); // Set account icon active when clicked
//   };

//   const handleClose = () => {
//     setShowAccount(false);
//     setAccountActive(false); // Reset account icon active when closed
//   };

//   return (
//     <>
//       <Navbar variant="light" fixed="top" expand="lg" className="bg-body-tertiary">
//         <Container fluid>
//           <Navbar.Brand href="#"  style={{ marginRight: '0' }}>
//             <img src="img/astrodiscover-logo.png" alt="Logo" style={{ height: '30px' }} />
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbarScroll" />
//           <Navbar.Collapse id="navbarScroll">
//             <Nav className="my-2 my-lg-0 sub-nav" navbarScroll>
//               <Nav.Link href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</Nav.Link>
//               <Nav.Link href="#about" className={activeSection === 'about' ? 'active' : ''}>About</Nav.Link>
//               <Nav.Link href="#apod" className={activeSection === 'apod' ? 'active' : ''}>APOD</Nav.Link>
//               <Nav.Link href="#earthimagery" className={activeSection === 'earthimagery' ? 'active' : ''}>NeoWs</Nav.Link>
//               <Nav.Link href="#" onClick={handleAccountClick}>
//                 <img src={accountActive ? "img/user_active.png" : "img/user.png"} alt="Account" style={{ height: '30px' }} />
//               </Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       <Offcanvas show={showAccount} onHide={handleClose} placement="end" style={{ backgroundColor: '#000000' }}>
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title className='mb-5'>Account</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           <div className="text-center">
//             <img src="img/user.png" roundedCircle style={{ width: '100px', height: '100px' }} />
//             <h5 className="mt-3">John Doe</h5>
//             <p>johndoe@example.com</p>
//           </div>

//         </Offcanvas.Body>

//             <Button className="btn btn-outline-light btn-lg" type="button" style={{ margin: '2em 3em' }}>
//             Log Out
//             </Button>
//       </Offcanvas>
//     </>
//   );
// }

// export default Navigation;

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
      <Navbar variant="light" fixed="top" expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#"  style={{ marginRight: '0' }}>
            <img src="img/astrodiscover-logo.png" alt="Logo" style={{ height: '30px' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="my-2 my-lg-0 sub-nav" navbarScroll>
              <Nav.Link href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</Nav.Link>
              <Nav.Link href="#about" className={activeSection === 'about' ? 'active' : ''}>About</Nav.Link>
              <Nav.Link href="#apod" className={activeSection === 'apod' ? 'active' : ''}>APOD</Nav.Link>
              <Nav.Link href="#earthimagery" className={activeSection === 'earthimagery' ? 'active' : ''}>NeoWs</Nav.Link>
              <Nav.Link href="#" onClick={handleAccountClick}>
                <img src={accountActive ? "img/user_active.png" : "img/user.png"} alt="Account" style={{ height: '30px' }} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={showAccount} onHide={handleClose} placement="end" style={{ backgroundColor: '#000000' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='mb-5'>Account</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="text-center">
            <img src="img/user.png" roundedCircle style={{ width: '100px', height: '100px' }} />
            {userData && (
            <>
            <h5 className="mt-3">{userData.name}</h5>
            <p>{userData.email}</p>
            </>
            )}
            </div>
            </Offcanvas.Body>

            <Button className="btn btn-outline-light btn-lg" type="button"  onClick={handleLogout} style={{ margin: '2em 3em' }}>
            Log Out
            </Button>
      </Offcanvas>
    </>
  );


}


export default Navigation;


// import React, { useState, useEffect } from 'react';
// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';

// function NavScrollExample({ fetchData }) {
//   const [activeSection, setActiveSection] = useState(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = document.querySelectorAll("section");
//       let prevSection = null;

//       sections.forEach((section) => {
//         const rect = section.getBoundingClientRect();
//         if (rect.top <= 100 && rect.bottom >= 100) {
//           prevSection = section.id;
//         }
//       });

//       setActiveSection(prevSection);
//     };

//     window.addEventListener('scroll', handleScroll);

//     // Initially set active section on mount
//     handleScroll();

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <Navbar variant="light" fixed="top" expand="lg" className="bg-body-tertiary">
//       <Container fluid>
//         <Navbar.Brand href="#"  style={{ marginRight: '0' }}>
//           <img src="img/astrodiscover-logo.png" alt="Logo" style={{ height: '30px' }} />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav className="my-2 my-lg-0 sub-nav" navbarScroll>
//             <Nav.Link href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</Nav.Link>
//             <Nav.Link href="#about" className={activeSection === 'about' ? 'active' : ''}>About</Nav.Link>
//             <Nav.Link href="#apod" className={activeSection === 'apod' ? 'active' : ''}>APOD</Nav.Link>
//             <Nav.Link href="#earthimagery" className={activeSection === 'earthimagery' ? 'active' : ''}>NeoWs</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavScrollExample; 