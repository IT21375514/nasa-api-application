import React from 'react';

export default function Home(props) {
  return (
    <section  id="home">
    <header>
      <div
        className='bg-image d-flex align-items-center' // Added 'd-flex' and 'align-items-center'
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.001), #04051e), url('img/night_sky2.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat', 
          minHeight: 800,
          paddingBottom: '50px'
        }}
      >
        <div className='mask' style={{maxWidth: '100%', width: '80%' ,margin: '120px auto 20px auto'}}> {/* Added width: '100%' */}
          <div className='container'>
            <div className='row align-items-center'>
              <div className='col-md-6' style={{ backgroundColor: '#000000',padding:'40px 40px'}}>
                <div className='text-white'>
                  <h6 className='mb-1' style={{ color: '#808080'}}>NASA API</h6>
                  <h1 className='mb-3'>AstroDiscover</h1>
                  <h4 className='mb-3'>Free and open source project, built with REST APIs from api.nasa.gov</h4>
                  <a className='btn btn-outline-light btn-lg' href='#about' role='button'style={{ marginTop:'20px'}}>
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
