import React from 'react';

export default function Home(props) {
  return (
    <section  id="home">
    <header>
      <div
        className='bg-image d-flex align-items-center' // Added 'd-flex' and 'align-items-center'
      >
        <div className='mask'> {/* Added width: '100%' */}
          <div className='container'>
            <div className='row align-items-center'>
              <div id="home-left" className='col-md-6'  >
                <div className='text-white'>
                  <h6 className='mb-1'>NASA API</h6>
                  <h1 className='mb-3'>AstroDiscover</h1>
                  <h4 className='mb-3'>Free and open source project, built with REST APIs from api.nasa.gov</h4>
                  <a className='btn btn-outline-light btn-lg' href='#about' role='button'>
                    Discover Now
                  </a>
                </div>
              </div>
              <div className='col-md-6 text-center'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/7/7f/Rotating_earth_animated_transparent.gif' alt='Rotating Earth' className='img-fluid' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    </section>
  );
}
