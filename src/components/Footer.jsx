import React from 'react';

function Footer() {
  return (
    <footer id="my-footer" className="text-light py-4" >
        <div className="row">
          <div id="my-footer-first" className="col-md-6">
            <img src='img/astrodiscover-logo.png' alt="Logo"/>
            <p>
              This app uses data from NASA APIs, including the Astronomy Picture of the Day (APOD) API and the Mars Rover Photos (MRP) API. Built with React, Bootstrap, and integration with NASA's APIs.
            </p>
          </div>
          <div className="col-md-4">
            {/* Second column content */}
          </div>
          <div id="my-footer-third" className="col-md-2">
            <h6><strong>Technologies</strong></h6>
          {/* First column content */}
            <div className="d-flex align-items-center">
              <img src="img/react.png" alt="Image 1"/>
              <span>React</span>
            </div>
            <div className="d-flex align-items-center">
              <img src="img/bootstrap.png" alt="Image 2"/>
              <span>Bootstrap</span>
            </div>
          </div>

        </div>

    </footer>
  );
}

export default Footer;
