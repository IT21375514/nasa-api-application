import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import L from 'leaflet'; 

const customMarkerIcon = L.icon({
  iconUrl: 'img/pin.png', 
  iconSize: [38, 38], // Size of the icon
  iconAnchor: [19, 38], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -38] // Point from which the popup should open relative to the iconAnchor
});

const EarthImagery = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [dim, setDim] = useState(0.15);
  const [assetsData, setAssetsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMessage, setShowMessage] = useState(true);
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);
  const zoomLevel = 10; // Adjust the zoom level as needed
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
  
    if (userData) {
      // If user data exists, use it to set the initial state
      const { date: storedDate, latitude: storedLatitude, longitude: storedLongitude } = userData;
      setDate(storedDate);
      setLatitude(storedLatitude);
      setLongitude(storedLongitude);
      setMapCenter([storedLatitude, storedLongitude]);
      setMarkers([{ position: [storedLatitude, storedLongitude] }]);
      console.log(storedLatitude);
      console.log(storedLongitude);
      // mapRef.current.setView([parseFloat(storedLatitude), parseFloat(storedLongitude)], zoomLevel);
      setMapInitialized(true); 

    } else {
      // If user data doesn't exist, fetch current location using Geolocation API
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: currentLatitude, longitude: currentLongitude } = position.coords;
          setLatitude(currentLatitude.toFixed(6));
          setLongitude(currentLongitude.toFixed(6));
          setMapCenter([currentLatitude, currentLongitude]);
          setMarkers([{ position: [currentLatitude, currentLongitude] }]);
          // mapRef.current.setView([parseFloat(currentLatitude), parseFloat(currentLongitude)], zoomLevel);
          setMapInitialized(true); 
        },
        (error) => {
          console.error('Error getting current location:', error.message);
          // Handle error if Geolocation API fails
        }
      );
    }
  }, []);
  

  useEffect(() => {
    // Call setView only when map is initialized and mapRef.current is not null
    if (mapInitialized && mapRef.current) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData) {
        // If user data exists, use it to set the initial state
        const { latitude: storedLatitude, longitude: storedLongitude } = userData;
        mapRef.current.setView([parseFloat(storedLatitude), parseFloat(storedLongitude)], zoomLevel);
      } else {
        // If user data doesn't exist, fetch current location using Geolocation API
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude: currentLatitude, longitude: currentLongitude } = position.coords;
            setLatitude(currentLatitude.toFixed(6));
            setLongitude(currentLongitude.toFixed(6));
            mapRef.current.setView([currentLatitude, currentLongitude], zoomLevel);
          },
          (error) => {
            console.error('Error getting current location:', error.message);
            // Handle error if Geolocation API fails
          }
        );
      }
    }
  }, [mapInitialized]);
  


  const fetchAssetsData = async () => {
    if (!latitude || !longitude) {
      return;
    }
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
      // const imageryData = await imageryRes.blob();
      // const imageURL = URL.createObjectURL(imageryData);
      
      if (imageryRes.ok) {
        const imageryData = await imageryRes.blob();
        const imageURL = URL.createObjectURL(imageryData);
        setAssetsData(prevData => ({ ...prevData, imageURL }));
      } else {
        // Handle 404 error by setting a default image
        setAssetsData(prevData => ({ ...prevData, imageURL: process.env.PUBLIC_URL + '/img/no_img_found.jpg' }));
      }

      setLoading(false);
      // setAssetsData(prevData => ({ ...prevData, imageURL }));
    } catch (err) {
      console.log(err.message);
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  const handleLatitudeChange = (event) => {
    const newLatitude = event.target.value;
    setLatitude(newLatitude);
  };

  const handleLongitudeChange = (event) => {
    const newLongitude = event.target.value;
    setLongitude(newLongitude);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleDimChange = (event) => {
    const newValue = parseFloat(event.target.value);
    setDim(newValue);
  };
  
  useEffect(() => {
    fetchAssetsData();
  }, [dim]);
  
  useEffect(() => {
    setShowMessage(!(latitude && longitude));
  }, [latitude, longitude]);

  const handleFetchAPODs = () => {
    if (!latitude || !longitude) {
      return;
    }
// Store user data in localStorage
localStorage.setItem('userData', JSON.stringify({ date, latitude, longitude }));

// Set the map center and zoom level to the specified latitude and longitude

setMapCenter([parseFloat(latitude), parseFloat(longitude)]);
setMarkers([{ position: [parseFloat(latitude), parseFloat(longitude)] }]);

// Pan and zoom the map to the specified location
mapRef.current.setView([parseFloat(latitude), parseFloat(longitude)], zoomLevel);

    fetchAssetsData(); // Fetch data when the button is clicked
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setLatitude(lat.toFixed(6));
    setLongitude(lng.toFixed(6));
    setMapCenter([lat, lng]);
    setMarkers([{ position: [lat, lng] }]);
  };

  const Markers = () => {
    useMapEvents({
      click(e) {
        handleMapClick(e);
      },
    });
  
    return (
      <>
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} icon={customMarkerIcon}>
            <Popup>
              Latitude: {marker.position[0]} <br />
              Longitude: {marker.position[1]}
            </Popup>
          </Marker>
        ))}
      </>
    );
  };

  return (
    <section id="earthimagery">
      <div className="container">
        <div id="earthimagery-row-1" className="row mb-3" >
          <h1 className='mb-5'>Earth Imagery</h1>
          <hr />
        </div>
        
        <div id="earthimagery-row-2" className="row mb-5">
          <div className="col-md-6 mb-3">
            <MapContainer ref={mapRef} center={mapCenter} zoom={zoomLevel}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Markers />
            </MapContainer>
          </div>

          <div className="col-md-6">
  <div className="row mb-3 earthimagery-row-2-in-rows">
    <div className="col-md-6 mb-1">
      <label htmlFor="latitudeInput">Latitude:</label>
    </div>
    <div className="col-md-6">
      <input
        type="text"
        id="latitudeInput"
        value={latitude}
        onChange={handleLatitudeChange}
      />
    </div>
  </div>
  <div className="row mb-3 earthimagery-row-2-in-rows">
    <div className="col-md-6 mb-1">
      <label htmlFor="longitudeInput">Longitude:</label>
    </div>
    <div className="col-md-6">
      <input
        type="text"
        id="longitudeInput"
        value={longitude}
        onChange={handleLongitudeChange}
      />
    </div>
  </div>
  <div className="row mb-3 earthimagery-row-2-in-rows">
    <div className="col-md-6 mb-1">
      <label htmlFor="dateInput">Date:</label>
    </div>
    <div className="col-md-6">
      <input 
        type="date" 
        id="dateInput" 
        value={date} 
        onChange={handleDateChange} 
        max={new Date().toISOString().split('T')[0]} 
      />
    </div>
  </div>


            <div className="row mb-3" id="earthimagery-row-2-in-rows-button" >
              <div className="col-md-12">
                <button className="api-button" onClick={handleFetchAPODs}>Fetch APODs</button> 
              </div>
            </div>
          </div>
        </div>

        {showMessage && (
          <div id="earthimagery-row-results-yet" className="row mb-3">
            <div className="col-md-12">
              <p>Latitude and longitude must be provided.</p>
            </div>
          </div>
        )}

        {assetsData && (
          <div id="earthimagery-row-results" className="row">
            <div className="col-md-6">
              <div>
                <div className="ImgContainer">
                  {loading ? (
                    <div id="earthimagery-row-results-loading" className='mb-3'>
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  ) : (
                    <img src={assetsData.imageURL} alt="earth-imagery" className="bgImage" />
                  )}
                </div>
                <div id="earthimagery-row-results-zoom-level" className="mt-3 mb-5">
                  <label>
                    <span>Dimension:</span>
                    <Form.Range 
                      value={dim} 
                      onChange={handleDimChange} 
                      min={0.001} 
                      max={1} 
                      step={0.001} 
                    />
                    <span>{dim}</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              {assetsData && (
                <div>
                  <h3 className="mb-3">Retrieved Data</h3>
                  <p><strong>Latitude: </strong>{latitude}</p>
                  <p><strong>Longitude: </strong>{longitude}</p>
                  <p><strong>Date: </strong>{date}</p>
                  <p><strong>Start Date of 30-day Range: </strong>{assetsData.date}</p>
                  <p><strong>ID: </strong>{assetsData.id}</p>
                  <p><strong>Service Version: </strong>{assetsData.service_version}</p>
                  <p id="earthimagery-row-results-url">
                    <strong>URL:</strong>
                    <a href={assetsData.url} target="_blank" rel="noopener noreferrer">
                      {assetsData.url}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EarthImagery;