// import { useState, useEffect } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function Main() {
//   const [data, setData] = useState([]);
//   const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
//   const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

//   const fetchData = async () => {
//     const NASA_KEY = "kX4mKqMQg1ege60ay2rFEKyvrWunTiBn3cHg1LwU";
//     const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&start_date=${startDate}&end_date=${endDate}&thumbs=true`;

//     try {
//       const res = await fetch(url);
//       const apiData = await res.json();
//       setData(apiData);
//       console.log('Fetched Data:', apiData); // Log fetched data
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const handleStartDateChange = (event) => {
//     setStartDate(event.target.value);
//   };

//   const handleEndDateChange = (event) => {
//     setEndDate(event.target.value);
//   };

//   useEffect(() => {
//     // Fetch data when component mounts and when start/end dates change
//     fetchData();
//   }, [startDate, endDate]);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     adaptiveHeight: true, // Adjust slide height based on content
//       customPaging: function (i) {
//       return <button>{i + 1}</button>;
//     },
//   };

//     return (
//       <div id="main" className="container" style={{ maxWidth: '80%', margin: '2em auto 5em auto' }}>
//         <div className="row mb-3" >
//           <h1 className='mb-5' style={{ textAlign: 'center' }}>Astronomy Picture of the Day</h1>
//           <hr style={{ borderTop: '2px solid #ffffff' }} />
//         </div>
//         <div className="row">
//           {/* Input fields for selecting start and end dates */}
          
//           <div className="col-md-6" style={{ marginBottom: '2em' }}>
//           Select the start and end dates to retrieve APOD :
//             </div>
//             <div className="col-md-6"  style={{ textAlign: 'end' }}>
//             <div style={{ marginBottom: '4em' }}>
//               <label htmlFor="startDateInput" style={{ marginRight: '1em' }} >Start Date:</label>
//               <input 
//                 type="date" 
//                 id="startDateInput" 
//                 value={startDate} 
//                 onChange={handleStartDateChange} 
//                 max={new Date().toISOString().split('T')[0]} // Restrict future dates
//                 style={{ padding: '0.2em 1em', backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff' }} // Customize calendar style
//               />
//               <label htmlFor="endDateInput" style={{ marginLeft: '1em', marginRight: '1em' }}>End Date:</label>
//               <input 
//                 type="date" 
//                 id="endDateInput" 
//                 value={endDate} 
//                 onChange={handleEndDateChange} 
//                 max={new Date().toISOString().split('T')[0]} // Restrict future dates
//                 style={{ padding: '0.2em 1em', backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff' }} // Customize calendar style
//               />
//               {/* <button className="api-button" onClick={fetchData}>Fetch APODs</button> */}
//             </div>
//           </div>
//         </div>
        
//         <Slider {...settings}>
//     {/* Rendering each APOD */}
//     {data.map(apod => (
//       <div key={apod.date} style={{ maxHeight: "600px" }}>
//         <div className="row">
//           <div className="col-md-6" style={{ marginBottom: "2em"}}>
//             <div className="ImgContainer" style={{ height: "100%", width: "100%", maxHeight: "600px", overflow: "hidden" }}>
//               {apod.media_type === "image" ? (
//                 <img src={apod.hdurl} alt="mar-demo-pic" className="bgImage" style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
//               ) : (
//                 <iframe title={apod.title} src={apod.url} style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
//               )}
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div>
//               <h2>{apod.title}</h2>
//               <p>Date: {apod.date}</p>
//               <p>Explanation: {apod.explanation}</p>
//               <p>
//                 <strong>Media Type:</strong> {apod.media_type}
//               </p>
//               <p>
//                 <strong>Service Version:</strong> {apod.service_version}
//               </p>
//               <p style={{ overflowWrap: 'break-word' }}>
//                 <strong>URL:</strong>{' '}
//                 <a href={apod.url} target="_blank" rel="noopener noreferrer">
//                   {apod.url}
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     ))}
//   </Slider>

//       </div>
//     );
// }

// import { useState, useEffect } from "react";
// import Carousel from 'react-bootstrap/Carousel';

// export default function Apod() {
//   const [data, setData] = useState([]);
//   const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
//   const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);


//   const fetchData = async () => {
//     const NASA_KEY = "kX4mKqMQg1ege60ay2rFEKyvrWunTiBn3cHg1LwU";
//     const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&start_date=${startDate}&end_date=${endDate}&thumbs=true`;

//     try {
//       const res = await fetch(url);
//       const apiData = await res.json();
//       setData(apiData);
//       console.log('Fetched Data:', apiData); // Log fetched data
//     } catch (err) {
//       console.log(err.message);
//     }
//   };


//   const handleStartDateChange = (event) => {
//     setStartDate(event.target.value);
//   };

//   const handleEndDateChange = (event) => {
//     setEndDate(event.target.value);
//   };

//   useEffect(() => {
//     // Fetch data when component mounts
//     fetchData();
//   }, [startDate, endDate]); 

//   return (
//           <section id="main">
//     <div className="container" style={{ maxWidth: '80%', margin: '2em auto 5em auto' }}>
//       <div className="row mb-3" >
//         <h1 className='mb-5' style={{ textAlign: 'center' }}>Astronomy Picture of the Day</h1>
//         <hr style={{ borderTop: '2px solid #ffffff' }} />
//       </div>
//       <div className="row mb-5">
//         <div className="col-md-6" style={{ marginBottom: '2em' }}>
//           Select the start and end dates to retrieve APOD :
//         </div>
//         <div className="col-md-6" style={{ textAlign: 'end' }}>
          
//           <div style={{ marginBottom: '4em'}}>
//           <div className="mb-3" style={{ display: 'inline-block'}}>
//             <label htmlFor="startDateInput" style={{ marginRight: '1em'}} >Start Date:</label>
//             <input 
//               type="date" 
//               id="startDateInput" 
//               value={startDate} 
//               onChange={handleStartDateChange} 
//               max={new Date().toISOString().split('T')[0]} 
//               style={{ padding: '0.2em 1em', backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff' }} 
//             />
//             </div>
//             <div className="mb-3" style={{ display: 'inline-block'}}>
//             <label htmlFor="endDateInput" style={{ marginLeft: '1em', marginRight: '1em'}}>End Date:</label>
//             <input 
//               type="date" 
//               id="endDateInput" 
//               value={endDate} 
//               onChange={handleEndDateChange} 
//               max={new Date().toISOString().split('T')[0]} 
//               style={{ padding: '0.2em 1em', backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff' }} 
//             />
//             </div>
//           </div>
//         </div>
//       </div>
//       <Carousel>
//         {/* Rendering each APOD */}
//         {data.map(apod => (
//           <Carousel.Item key={apod.date}>
//             <div className="row">
//               <div className="col-md-6">

//              <div className="ImgContainer" style={{ height: "100%", width: "100%", maxHeight: "600px", overflow: "hidden" }}>
//                  {apod.media_type === "image" ? (
//                    <img src={apod.hdurl} alt="mar-demo-pic" className="bgImage" style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
//                  ) : (
//                    <iframe title={apod.title} src={apod.url} style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
//                  )}
//                </div>
//               </div>
//               <div className="col-md-6">
//                 <div>
//                   <h2>{apod.title}</h2>
//                   <p>Date: {apod.date}</p>
//                   <p>Explanation: {apod.explanation}</p>
//                   <p>
//                     <strong>Media Type:</strong> {apod.media_type}
//                   </p>
//                   <p>
//                     <strong>Service Version:</strong> {apod.service_version}
//                   </p>
//                   <p>
//                     <strong>URL:</strong>{' '}
//                     <a href={apod.url} target="_blank" rel="noopener noreferrer">
//                       {apod.url}
//                     </a>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </Carousel.Item>
//         ))}
//       </Carousel>
//     </div>
//     </section>
//   );
// }

    


import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from 'react-bootstrap/Carousel';

export default function Apod() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(() => {
    // Retrieve start date from localStorage or set to today's date
    const storedStartDate = localStorage.getItem('startDate');
    return storedStartDate ? storedStartDate : new Date().toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    // Retrieve end date from localStorage or set to today's date
    const storedEndDate = localStorage.getItem('endDate');
    return storedEndDate ? storedEndDate : new Date().toISOString().split('T')[0];
  });

  const fetchData = async () => {
    const NASA_KEY = "kX4mKqMQg1ege60ay2rFEKyvrWunTiBn3cHg1LwU";
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&start_date=${startDate}&end_date=${endDate}&thumbs=true`;

    try {
      const res = await fetch(url);
      const apiData = await res.json();
      setData(apiData);
      console.log('Fetched Data:', apiData); // Log fetched data
    } catch (err) {
      console.log(err.message);
    }
  };

  // Function to handle changes in start date
  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    setStartDate(newStartDate);
    // Store new start date in localStorage
    localStorage.setItem('startDate', newStartDate);
  };

  // Function to handle changes in end date
  const handleEndDateChange = (event) => {
    const newEndDate = event.target.value;
    setEndDate(newEndDate);
    // Store new end date in localStorage
    localStorage.setItem('endDate', newEndDate);
  };
  useEffect(() => {
    // Fetch data when component mounts and when start/end dates change
    fetchData();
  }, [startDate, endDate]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    customPaging: function (i) {
      return <button>{i + 1}</button>;
    },
  };

  return (
    <section id="apod">
    <div className="container" style={{ maxWidth: '80%', margin: '2em auto 5em auto' }}>
      <div className="row mb-3" >
        <h1 className='mb-5' style={{ textAlign: 'center' }}>Astronomy Picture of the Day</h1>
        <hr style={{ borderTop: '2px solid #ffffff' }} />
      </div>
      <div className="row mb-5">
        <div className="col-md-6" style={{ marginBottom: '2em' }}>
          Select the start and end dates to retrieve APOD :
        </div>
        <div className="col-md-6" style={{ textAlign: 'end' }}>
          <div style={{ marginBottom: '4em' }}>
            <label htmlFor="startDateInput" style={{ marginRight: '1em'}} >Start Date:</label>
            <input 
              className="mb-1" 
              type="date" 
              id="startDateInput" 
              value={startDate} 
              onChange={handleStartDateChange} 
              max={new Date().toISOString().split('T')[0]} 
              style={{ padding: '0.2em 1em', backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff' }} 
            />
            <label htmlFor="endDateInput" style={{ marginLeft: '1em', marginRight: '1em' }}>End Date:</label>
            <input 
              type="date" 
              id="endDateInput" 
              value={endDate} 
              onChange={handleEndDateChange} 
              max={new Date().toISOString().split('T')[0]} 
              style={{ padding: '0.2em 1em', backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff' }} 
            />
          </div>
        </div>
      </div>

      {data.length > 0 ? (
        data.length === 1 ? (
          <div className="row">
            <div className="col-md-6"  style={{ marginBottom: "2em"}}>
            <div className="ImgContainer" style={{ height: "100%", width: "100%", maxHeight: "600px", overflow: "hidden" }}>
                {data[0].media_type === "image" ? (
                  <img src={data[0].hdurl} alt="mar-demo-pic" className="bgImage" style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                ) : (
                  <iframe title={data[0].title} src={data[0].url} style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <h2>{data[0].title}</h2>
                <p><strong>Date: </strong>{data[0].date}</p>
                <p><strong>Explanation: </strong>{data[0].explanation}</p>
                <p><strong>Media Type:</strong> {data[0].media_type}</p>
                <p><strong>Service Version:</strong> {data[0].service_version}</p>
                <p style={{ overflowWrap: 'break-word' }}><strong>URL:</strong>  <a href={data[0].url} target="_blank" rel="noopener noreferrer">{data[0].url}</a></p>

              </div>
            </div>
          </div>
        ) : (
          <Slider {...settings}>
            {data.map(apod => (
              <div key={apod.date} style={{ maxHeight: "600px" }}>
                <div className="row">
                  <div className="col-md-6" style={{ marginBottom: "2em"}}>
                    <div className="ImgContainer" style={{ height: "100%", width: "100%", maxHeight: "600px", overflow: "hidden" }}>
                      {apod.media_type === "image" ? (
                        <img src={apod.hdurl} alt="mar-demo-pic" className="bgImage" style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                      ) : (
                        <iframe title={apod.title} src={apod.url} style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <h2>{apod.title}</h2>
                      <p>Date: {apod.date}</p>
                      <p>Explanation: {apod.explanation}</p>
                      <p><strong>Media Type:</strong> {apod.media_type}</p>
                      <p><strong>Service Version:</strong> {apod.service_version}</p>
                      <p style={{ overflowWrap: 'break-word' }}><strong>URL:</strong> <a href={apod.url} target="_blank" rel="noopener noreferrer">{apod.url}</a></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </section>
  );
}
