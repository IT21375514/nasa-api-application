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

import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function NavScrollExample({ fetchData }) {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let prevSection = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          prevSection = section.id;
        }
      });

      setActiveSection(prevSection);
    };

    window.addEventListener('scroll', handleScroll);

    // Initially set active section on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // const handleAPODClick = () => {
  //   setActiveSection('main'); // Set the active section to 'main' when APOD link is clicked
  //   fetchData(); // Fetch data for APOD

  //   // Scroll to the section with ID "main"
  //   const mainSection = document.getElementById('main');
  //   if (mainSection) {
  //     mainSection.scrollIntoView({ behavior: 'smooth' });
  //   }
  //   onClick={handleAPODClick}
  // };

  return (
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;