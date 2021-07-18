import React, { useState } from 'react';
import axios from 'axios';

import { cities } from "./cities";
import './App.css';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=38ae29532c0049cda0871304f24e46cb&id=';

var list = [];

function startUp() {
  list = [];
  for (let city of cities) {
    // console.log(city)
    list.push(city);
  }
}

function App() {
  const listItems = list.map((city) =>
    <div className="cityDetails">
      <p><pre>{"id - " + city.CityCode + "    city name - " + city.CityName}</pre></p>
    </div>
  );

  const [post, setPost] = useState([])
  const [sysData, setSysData] = useState([])
  const [weatherMainData, setWeatherMainData] = useState()
  const [weatherDescriptionData, setWeatherDescriptionData] = useState()
  const [mainData, setMainData] = useState([])
  const [windData, setWindData] = useState([])
  const [cloudsData, setCloudsData] = useState([])
  const [showData, setShowData] = useState(false);

  const [id, setId] = useState()

  const handleClick = () => {
    setShowData(true);
    axios
      .get(BASE_URL + id)
      .then(res => {
        console.log(res)
        setPost(res.data)
        setSysData(res.data.sys)
        setWeatherMainData(res.data.weather[0].main)
        setWeatherDescriptionData(res.data.weather[0].description)
        setMainData(res.data.main)
        setWindData(res.data.wind)
        setCloudsData(res.data.clouds)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="App">
      {startUp()}

      <div className="city-data">
        <h2>Cities and their id's</h2>
        {listItems}
      </div>

      <div className="weather-data">
        <div className="input-area">
          <input type="text" value={id} onChange={e => setId(e.target.value)} className="input" placeholder="enter the city id..."/>
          <button type="button" onClick={handleClick} className="button"><b>Get Data</b></button>
        </div>

        {showData === true &&
          <>
            <p>Visibility -   {post.visibility}</p>
            <p>Id -   {post.id}</p>
            <p>Name -   {post.name}</p>
            <p>dt -   {post.dt}</p>
            <p>Country -   {sysData.country}</p>
            <p>Sunrise -   {sysData.sunrise}</p>
            <p>Sunset -   {sysData.sunset}</p>
            <p>Weather -   {weatherMainData}</p>
            <p>Weather Description -   {weatherDescriptionData}</p>
            <p>Temperature -   {mainData.temp}</p>
            <p>Pressure -   {mainData.pressure}</p>
            <p>Humidity -   {mainData.humidity}</p>
            <p>Minimum Temperature -   {mainData.temp_min}</p>
            <p>Maximum Temperature -   {mainData.temp_max}</p>
            <p>Wind speed -   {windData.speed}</p>
            <p>Wind Deg -   {windData.deg}</p>
            <p>Clouds -   {cloudsData.all}</p>
          </>

        }

      </div>
    </div>
  );
}

export default App;
