import './App.css';
import { cities } from "./cities";

var list = [];

function startUp() {
  list = [];
  console.log(cities.length)
  for (let city of cities) {
    console.log(city)
    list.push(city);
  }
} 

function App() {
  const listItems = list.map((city) =>
    <div className="cityDetails">
      <p>{"id - " + city.CityCode + "  city name - " + city.CityName}</p>
    </div>
  );

  return (
    <div className="App">
      {startUp()}

      <div className="city-data">
        <p>Cities and their id's</p>
        {listItems}
      </div>
    </div>
  );
}

export default App;
