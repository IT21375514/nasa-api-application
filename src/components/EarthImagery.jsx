// import React, { useState, useEffect } from "react";
// import Form from 'react-bootstrap/Form';
// import Spinner from 'react-bootstrap/Spinner';

// const EarthImagery = () => {
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");
//   const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
//   const [dim, setDim] = useState(0.15);
//   const [assetsData, setAssetsData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showMessage, setShowMessage] = useState(true);

//   const fetchAssetsData = async () => {
//     if (!latitude || !longitude) {
//       return;
//     }
//     const NASA_KEY = "kX4mKqMQg1ege60ay2rFEKyvrWunTiBn3cHg1LwU";
//     const assetsUrl = `https://api.nasa.gov/planetary/earth/assets?lon=${longitude}&lat=${latitude}&date=${date}&dim=${dim}&api_key=${NASA_KEY}`;
//     const imageryUrl = `https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=${date}&dim=${dim}&api_key=${NASA_KEY}`;

//     try {
//       setLoading(true);
//       const assetsRes = await fetch(assetsUrl);
//       const assetsData = await assetsRes.json();
//       setAssetsData(assetsData);
      
//       console.log("Fetching imagery data URL:", imageryUrl); 
//       const imageryRes = await fetch(imageryUrl);
//       const imageryData = await imageryRes.blob();
//       const imageURL = URL.createObjectURL(imageryData);
      
//       setLoading(false);
//       setAssetsData(prevData => ({ ...prevData, imageURL }));
//     } catch (err) {
//       console.log(err.message);
//       setError("Failed to fetch data");
//       setLoading(false);
//     }
//   };

//   const handleLatitudeChange = (event) => {
//     setLatitude(event.target.value);
//   };

//   const handleLongitudeChange = (event) => {
//     setLongitude(event.target.value);
//   };

//   const handleDateChange = (event) => {
//     setDate(event.target.value);
//   };

//   const handleDimChange = (event) => {
//     const newValue = parseFloat(event.target.value);
//     setDim(newValue);
//     console.log("New value of dim:", newValue); 
//   };
  
//   useEffect(() => {
//     fetchAssetsData();
//   }, [dim]);
  
//   useEffect(() => {
//     setShowMessage(!(latitude && longitude));
//   }, [latitude, longitude]);

//   const handleFetchAPODs = () => {
//     fetchAssetsData(); // Fetch data when the button is clicked
//   };

//   return (
//     <section id="earthimagery">
//       <div className="container" style={{ maxWidth: '80%', margin: '2em auto 5em auto' }}>
//         <div className="row mb-3" >
//           <h1 className='mb-5' style={{ textAlign: 'center' }}>Earth Imagery</h1>
//           <hr style={{ borderTop: '2px solid #ffffff' }} />
//         </div>
        
//         <div className="row mb-5">
//         <div className="col-md-6">
//   <div className="row mb-3">
//     <div className="col-md-4">
//       <label htmlFor="latitudeInput">Latitude:</label>
//     </div>
//     <div className="col-md-8">
//       <input
//         type="text"
//         id="latitudeInput"
//         value={latitude}
//         onChange={handleLatitudeChange}
//         style={{ padding: '0.2em 1em', backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff' }}
//       />
//     </div>
//   </div>
//   <div className="row mb-3">
//     <div className="col-md-4">
//       <label htmlFor="longitudeInput">Longitude:</label>
//     </div>
//     <div className="col-md-8">
//       <input
//         type="text"
//         id="longitudeInput"
//         value={longitude}
//         onChange={handleLongitudeChange}
//         style={{ padding: '0.2em 1em', backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff' }}
//       />
//     </div>
//   </div>
// </div>

//           <div className="col-md-4 mb-3"  style={{textAlign: "end"}}>
//             <label>
//               Date (YYYY-MM-DD):
//               <input 
//                 type="date" 
//                 value={date} 
//                 onChange={handleDateChange} 
//                 max={new Date().toISOString().split('T')[0]} 
//                 style={{ padding: '0.2em 1em', backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff', marginLeft: '1em'  }} 
//               />
//             </label>
//           </div>
//           <div className="col-md-2 mb-3" style={{textAlign: "end"}}>
//             <button className="api-button" onClick={handleFetchAPODs}>Fetch APODs</button> 
//           </div>
//         </div>

//         {showMessage && (
//           <div className="row mb-3">
//             <div className="col-md-12">
//               <p style={{textAlign: 'center'}}>Latitude and longitude must be provided.</p>
//             </div>
//           </div>
//         )}

// {assetsData && (
//           <div className="row">
//             <div className="col-md-6">
//               <div>
//               <div className="ImgContainer" style={{ height: "100%", width: "100%", overflow: "hidden" }}>
//                   {loading ? (
//                       <div className='mb-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
//                       <Spinner animation="border" role="status" style={{ width: '4rem', height: '4rem' }}>
//                         <span className="visually-hidden">Loading...</span>
//                       </Spinner>
//                     </div>
//                   ) : (
//                     <img src={assetsData.imageURL} alt="earth-imagery" className="bgImage" style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
//                   )}
//                 </div>
//                 <div className="mt-3 mb-5">
//                   <label style={{ display: 'flex', alignItems: 'center' }}>
//                     <span style={{ marginRight: '1em' }}>Dimension:</span>
//                     <Form.Range 
//                       value={dim} 
//                       onChange={handleDimChange} 
//                       min={0.001} 
//                       max={1} 
//                       step={0.001} 
//                       style={{ flex: '1', padding: '0.2em 1em', backgroundColor: 'transparent', color: '#fff', width: '20em'}} 
//                     />
//                     <span>{dim}</span>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-6">
//               {assetsData && (
//                 <div>
//                   <h3>Retrieved Data</h3>
//                   <p>Date: {assetsData.date}</p>
//                   <p>ID: {assetsData.id}</p>
//                   <p>Service Version: {assetsData.service_version}</p>
//                   <p style={{overflowWrap: 'break-word'}}>
//                     <strong>URL:</strong>
//                     <a href={assetsData.url} target="_blank" rel="noopener noreferrer">
//                       {assetsData.url}
//                     </a>
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default EarthImagery;


import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import L from 'leaflet'; 

const customMarkerIcon = L.icon({
  iconUrl: 'img/pin.png', // Path to your custom marker image
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
    setMapCenter([parseFloat(latitude), parseFloat(longitude)]);
    setMarkers([{ position: [parseFloat(latitude), parseFloat(longitude)] }]);
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
      <div className="container" style={{ maxWidth: '80%', margin: '2em auto 5em auto' }}>
        <div className="row mb-3" >
          <h1 className='mb-5' style={{ textAlign: 'center' }}>Earth Imagery</h1>
          <hr style={{ borderTop: '2px solid #ffffff' }} />
        </div>
        
        <div className="row mb-5">
          <div className="col-md-6 mb-3">
            <MapContainer center={mapCenter} zoom={10} style={{ height: '400px', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Markers />
            </MapContainer>
          </div>

          <div className="col-md-6">
  <div className="row mb-3">
    <div className="col-md-6 mb-1">
      <label htmlFor="latitudeInput" style={{ color: '#fff' }}>Latitude:</label>
    </div>
    <div className="col-md-6">
      <input
        type="text"
        id="latitudeInput"
        value={latitude}
        onChange={handleLatitudeChange}
        style={{ padding: '0.2em 1em', backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff', width: '100%' }}
      />
    </div>
  </div>
  <div className="row mb-3">
    <div className="col-md-6 mb-1">
      <label htmlFor="longitudeInput" style={{ color: '#fff' }}>Longitude:</label>
    </div>
    <div className="col-md-6">
      <input
        type="text"
        id="longitudeInput"
        value={longitude}
        onChange={handleLongitudeChange}
        style={{ padding: '0.2em 1em', backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff', width: '100%' }}
      />
    </div>
  </div>
  <div className="row mb-3">
    <div className="col-md-6 mb-1">
      <label htmlFor="dateInput" style={{ color: '#fff' }}>Date (YYYY-MM-DD):</label>
    </div>
    <div className="col-md-6">
      <input 
        type="date" 
        id="dateInput" 
        value={date} 
        onChange={handleDateChange} 
        max={new Date().toISOString().split('T')[0]} 
        style={{ padding: '0.2em 1em', backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff', width: '100%' }} 
      />
    </div>
  </div>


            <div className="row mb-3"   style={{ textAlign: 'end'}}>
              <div className="col-md-12">
                <button className="api-button" onClick={handleFetchAPODs}>Fetch APODs</button> 
              </div>
            </div>
          </div>
        </div>

        {showMessage && (
          <div className="row mb-3">
            <div className="col-md-12">
              <p style={{textAlign: 'center'}}>Latitude and longitude must be provided.</p>
            </div>
          </div>
        )}

        {assetsData && (
          <div className="row">
            <div className="col-md-6">
              <div>
                <div className="ImgContainer" style={{ height: "100%", width: "100%", overflow: "hidden" }}>
                  {loading ? (
                    <div className='mb-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <Spinner animation="border" role="status" style={{ width: '4rem', height: '4rem' }}>
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  ) : (
                    <img src={assetsData.imageURL} alt="earth-imagery" className="bgImage" style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                  )}
                </div>
                <div className="mt-3 mb-5">
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
        )}
      </div>
    </section>
  );
};

export default EarthImagery;