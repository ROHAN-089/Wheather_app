import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './weather.css';

const Weather = () => {
  const [weatherinfo, setWeatherinfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [city, setcity] = useState("London")
  const [input, setinput] = useState("")
  const [error, setError] = useState(false)
  

  const search = async (city) => {
    setIsLoading(true); // Start loading
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setWeatherinfo({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temp: Math.floor(data.main.temp),
        location: data.name,
        icon: data.weather[0].icon, // Corrected icon access
      });
      setError(false)
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(true);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    search(city)
  }, [city])
  

  const handelchange =(value)=>{
    setinput(value)
  }

  const handlesearch=()=>{
    if(input)
    setcity(input)
  }



  return (
    <div className='weather'>
      <div className="input-box">
        <input type="text" placeholder='Search' className='input' onChange={(e)=>handelchange(e.target.value)}/>
        <div className='search-icon' onClick={handlesearch}>
          <FaSearch />
        </div>
      </div>

      {/* Conditional rendering based on loading and weatherinfo state */}
      {isLoading ? (
        <p>Loading...</p>
      ) :error? (
        <p>ENTER VALID CITY</p>
      ):(
        weatherinfo && (
          <>
            <img
              className='icon'
              src={`https://openweathermap.org/img/wn/${weatherinfo.icon}@2x.png`}
              alt="Weather icon"
            />
            <div className="weather-details">
              <h1>{weatherinfo.temp}°C</h1>
              <p>{weatherinfo.location}</p>
              <div className="additional-info">
                <div><span>{weatherinfo.humidity}%</span> Humidity</div>
                <div><span>{weatherinfo.windspeed} km/h</span> Wind Speed</div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Weather;
