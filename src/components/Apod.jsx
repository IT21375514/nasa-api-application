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
    <div id="apod-container"className="container">
      <div id="apod-row-1" className="row mb-3" >
        <h1 className='mb-5'>Astronomy Picture of the Day</h1>
        <hr />
      </div>
      <div  id="apod-row-2" className="row mb-5">
        <div  id="apod-row-2-col-1" className="col-md-6">
          Select the start and end dates to retrieve APOD :
        </div>
        <div id="apod-row-2-col-2" className="col-md-6">
          <div id="apod-row-2-col-2-in">
            <label id="apod-row-2-col-2-in-label-1" htmlFor="startDateInput">Start Date:</label>
            <input 
              className="mb-1" 
              type="date" 
              id="startDateInput" 
              value={startDate} 
              onChange={handleStartDateChange} 
              max={new Date().toISOString().split('T')[0]} 
            />
            <label id="apod-row-2-col-2-in-label-2" htmlFor="endDateInput">End Date:</label>
            <input 
              type="date" 
              id="endDateInput" 
              value={endDate} 
              onChange={handleEndDateChange} 
              max={new Date().toISOString().split('T')[0]} 
            />
          </div>
        </div>
      </div>

      {data.length > 0 ? (
        data.length === 1 ? (
          <div id="apod-row-result" className="row">
            <div id="apod-row-result-col-1" className="col-md-6">
            <div className="ImgContainer">
                {data[0].media_type === "image" ? (
                  <img src={data[0].hdurl} alt="mar-demo-pic" className="bgImage"/>
                ) : (
                  <iframe title={data[0].title} src={data[0].url}></iframe>
                )}
              </div>
            </div>
            <div id="apod-row-result-col-2" className="col-md-6">
              <div>
                <h2>{data[0].title}</h2>
                <p><strong>Date: </strong>{data[0].date}</p>
                <p><strong>Explanation: </strong>{data[0].explanation}</p>
                <p><strong>Media Type:</strong> {data[0].media_type}</p>
                <p><strong>Service Version:</strong> {data[0].service_version}</p>
                <p className="apod-row-result-col-2-last-p"><strong>URL:</strong>  <a href={data[0].url} target="_blank" rel="noopener noreferrer">{data[0].url}</a></p>

              </div>
            </div>
          </div>
        ) : (
          <Slider {...settings}>
            {data.map(apod => (
              <div id="apod-row-result-slider" key={apod.date}>
                <div id="apod-row-result-slider-row-1" className="row">
                  <div id="apod-row-result-slider-row-1-column-1" className="col-md-6">
                    <div className="ImgContainer">
                      {apod.media_type === "image" ? (
                        <img src={apod.hdurl} alt="mar-demo-pic" className="bgImage" />
                      ) : (
                        <iframe title={apod.title} src={apod.url}></iframe>
                      )}
                    </div>
                  </div>
                  <div id="apod-row-result-slider-row-1-column-2" className="col-md-6">
                    <div>
                      <h2>{apod.title}</h2>
                      <p>Date: {apod.date}</p>
                      <p>Explanation: {apod.explanation}</p>
                      <p><strong>Media Type:</strong> {apod.media_type}</p>
                      <p><strong>Service Version:</strong> {apod.service_version}</p>
                      <p className="apod-row-result-col-2-last-p"><strong>URL:</strong> <a href={apod.url} target="_blank" rel="noopener noreferrer">{apod.url}</a></p>
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
