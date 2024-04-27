import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BasicExample() {
  return (
    <section id="about">

      <div className="row" style={{ maxWidth: '100%', width: '80%', margin: '0 auto 0 auto'}}> {/* Bootstrap row */}
      <div className="row mb-5" >
        <h1 className='mb-5' style={{ textAlign: 'center' }}>About</h1>
        <hr style={{ borderTop: '2px solid #ffffff' }} />
      </div>
        <div className="col-md-6" style={{padding:'0 1em 4em 1em' }}> {/* Bootstrap column for first card */}
          <Card style={{ width: '100%' }}> {/* Set width of card to 100% */}
            <Card.Img variant="top" src='img/apod_thump.jpg'  />
            <Card.Body>
              <Card.Title>Astronomy Picture of the Day (APOD)</Card.Title>
              <Card.Text>
                The Astronomy Picture of the Day (APOD) API provides access to NASA's popular daily astronomy imagery and metadata. 
                Users can retrieve the daily image with associated information, optionally requesting concept tags for discoverability, 
                enabling integration of space visuals into various applications and platforms.
                </Card.Text>
              <a className='btn btn-outline-light btn-lg' href='#!' role='button'style={{ marginTop:'20px'}}>
              Explore Now
                  </a>
              {/* <Button className='btn btn-outline-light'>Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6" style={{padding:'0 1em 4em 1em' }}> {/* Bootstrap column for second card */}
          <Card style={{ width: '100%' }}> {/* Set width of card to 100% */}
            <Card.Img variant="top" src='img/mrp_thump.jpg' />
            <Card.Body>
              <Card.Title>Mars Rover Photos (MRP)</Card.Title>
              <Card.Text>          
                The Mars Rover Photos (MRP) API offers image data from NASA's Curiosity, Opportunity, and Spirit rovers on Mars. 
                Queries by Martian sol or Earth date, filtering by camera type, allow access to 25 photos per call. 
                Developers, educators, and scientists benefit from this resource for Martian research and education.
              </Card.Text>
              <a className='btn btn-outline-light btn-lg' href='#!' role='button'style={{ marginTop:'20px'}}>
              Explore Now
                  </a>
              {/* <Button className='btn btn-outline-light'>Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </div>
      </div>
    </section>
  );
}


export default BasicExample;