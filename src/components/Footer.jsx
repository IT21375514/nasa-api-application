import React from 'react';

function Footer() {
  return (
    <footer className="text-light py-4" style={{ width: '100%', backgroundColor:'#000000' }} >
        <div className="row" style={{ maxWidth: '100%', width: '80%', margin: '20px auto'}}>
          <div className="col-md-6">
            <img src='img/astrodiscover-logo.png' alt="Logo" style={{ height: '30px', marginBottom:'30px' }} />
            <p>
              This app uses data from NASA APIs, including the Astronomy Picture of the Day (APOD) API and the Mars Rover Photos (MRP) API. Built with React, Bootstrap, and integration with NASA's APIs.
            </p>
          </div>
          <div className="col-md-4">
            {/* Second column content */}
          </div>
          <div className="col-md-2">
            <h6>Technologies</h6>
          {/* First column content */}
            <div className="d-flex align-items-center">
              <img src="img/react.png" alt="Image 1" style={{ width: "16px", height: "16px" }} />
              <span style={{ marginLeft: "0.5rem" }}>React</span>
            </div>
            <div className="d-flex align-items-center">
              <img src="img/bootstrap.png" alt="Image 2" style={{ width: "16px", height: "16px" }} />
              <span style={{ marginLeft: "0.5rem" }}>Bootstrap</span>
            </div>
          </div>

        </div>

    </footer>
  );
}

export default Footer;
