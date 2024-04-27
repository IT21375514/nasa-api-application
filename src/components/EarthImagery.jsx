import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';

const EarthImagery = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [date, setDate] = useState("");
  const [dim, setDim] = useState(0.15);
  const [assetsData, setAssetsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAssetsData = async () => {
    const NASA_KEY = "kX4mKqMQg1ege60ay2rFEKyvrWunTiBn3cHg1LwU";
    const assetsUrl = `https://api.nasa.gov/planetary/earth/assets?lon=${longitude}&lat=${latitude}&date=${date}&dim=${dim}&api_key=${NASA_KEY}`;
    const imageryUrl = `https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=${date}&dim=${dim}&api_key=${NASA_KEY}`;

    try {
      setLoading(true);
      const assetsRes = await fetch(assetsUrl);
      const assetsData = await assetsRes.json();
      setAssetsData(assetsData);
      
      console.log("Fetching imagery data URL:", imageryUrl); 
      const imageryRes = await fetch(imageryUrl);
      const imageryData = await imageryRes.blob();
      const imageURL = URL.createObjectURL(imageryData);
      
      setLoading(false);
      setAssetsData(prevData => ({ ...prevData, imageURL }));
    } catch (err) {
      console.log(err.message);
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleDimChange = (event) => {
    const newValue = parseFloat(event.target.value);
    setDim(newValue);
    console.log("New value of dim:", newValue); 
    fetchAssetsData(); // Fetch data whenever the dimension value changes
  };
  

  const handleFetchAPODs = () => {
    fetchAssetsData(); // Fetch data when the button is clicked
  };

  return (
    <section id="earthimagery">
      <div className="container" style={{ maxWidth: '80%', margin: '2em auto 5em auto' }}>
        <div className="row mb-3" >
          <h1 className='mb-5' style={{ textAlign: 'center' }}>Earth Imagery</h1>
          <hr style={{ borderTop: '2px solid #ffffff' }} />
        </div>
        
        <div className="row mb-5">
        <div className="col-md-6">
  <div className="row mb-3">
    <div className="col-md-4">
      <label htmlFor="latitudeInput">Latitude:</label>
    </div>
    <div className="col-md-8">
      <input
        type="text"
        id="latitudeInput"
        value={latitude}
        onChange={handleLatitudeChange}
        style={{ padding: '0.2em 1em', backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff' }}
      />
    </div>
  </div>
  <div className="row mb-3">
    <div className="col-md-4">
      <label htmlFor="longitudeInput">Longitude:</label>
    </div>
    <div className="col-md-8">
      <input
        type="text"
        id="longitudeInput"
        value={longitude}
        onChange={handleLongitudeChange}
        style={{ padding: '0.2em 1em', backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff' }}
      />
    </div>
  </div>
</div>

          <div className="col-md-4 mb-3"  style={{textAlign: "end"}}>
            <label>
              Date (YYYY-MM-DD):
              <input 
                type="date" 
                value={date} 
                onChange={handleDateChange} 
                max={new Date().toISOString().split('T')[0]} 
                style={{ padding: '0.2em 1em', backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff', marginLeft: '1em'  }} 
              />
            </label>
          </div>
          <div className="col-md-2 mb-3" style={{textAlign: "end"}}>
            <button className="api-button" onClick={handleFetchAPODs}>Fetch APODs</button> 
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            {assetsData && (
              <div>
                <div className="ImgContainer" style={{ height: "100%", width: "100%", maxHeight: "600px", overflow: "hidden" }}>
                  <img src={assetsData.imageURL} alt="earth-imagery" className="bgImage" style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                </div>
                <div className="col-md-3 mt-3 mb-5">
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '1em' }}>Dimension:</span>
                    <Form.Range 
                      value={dim} 
                      onChange={handleDimChange} 
                      min={0.001} 
                      max={1} 
                      step={0.001} 
                      style={{ flex: '1', padding: '0.2em 1em', backgroundColor: 'transparent', color: '#fff', width: '20em'}} 
                    />
                    <span>{dim}</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="col-md-6">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {assetsData && (
              <div>
                <h3>Retrieved Data</h3>
                <p>Date: {assetsData.date}</p>
                <p>ID: {assetsData.id}</p>
                <p>Service Version: {assetsData.service_version}</p>
                <p style={{overflowWrap: 'break-word'}}>
                  <strong>URL:</strong>
                  <a href={assetsData.url} target="_blank" rel="noopener noreferrer">
                    {assetsData.url}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarthImagery;
