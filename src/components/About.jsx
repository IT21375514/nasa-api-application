import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function About() {
  return (
    <section id="about">

      <div id="about-row1" className="row"> {/* Bootstrap row */}
      <div id="about-row2" className="row mb-5" >
        <h1 className='mb-5'>About</h1>
        <hr/>
      </div>
        <div id="about-container-left" className="col-md-6"> {/* Bootstrap column for first card */}
          <Card> {/* Set width of card to 100% */}
            <Card.Img variant="top" src='img/apod_thump.jpg'  />
            <Card.Body>
              <Card.Title>Astronomy Picture of the Day (APOD)</Card.Title>
              <Card.Text>
                The Astronomy Picture of the Day (APOD) API provides access to NASA's popular daily astronomy imagery and metadata. 
                Users can retrieve the daily image with associated information, optionally requesting concept tags for discoverability, 
                enabling integration of space visuals into various applications and platforms.
                </Card.Text>
              <a className='btn btn-outline-light btn-lg' href='#apod' role='button'>
              Explore Now
                  </a>
              {/* <Button className='btn btn-outline-light'>Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </div>
        <div id="about-container-right" className="col-md-6"> {/* Bootstrap column for second card */}
          <Card> {/* Set width of card to 100% */}
            <Card.Img variant="top" src='img/earth_thump.jpg' />
            <Card.Body>
              <Card.Title>Earth Imagery APIs (Earth)</Card.Title>
              <Card.Text>           
                Earth Imagery APIs (Earth) provide access to satellite imagery and metadata, including Landsat data from NASA and USGS. 
                These APIs offer access to Landsat data applications and other NASA Earth Science Division APIs like GIBS and Google Earth Engine. 
                Users can retrieve images by location and date, obtaining JSON data with asset URLs.
              </Card.Text>
              <a className='btn btn-outline-light btn-lg' href='#earthimagery' role='button'>
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


export default About;