import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [weather, setWeather] = useState("");
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
  };

  async function getWeather() {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    try {
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`
      );
      console.log(response.data);
      setWeather(response.data);
      setInput("");
    } catch (error) {
      toast("Invalid City!");
      console.log(error);
    }
  }

  return (
    <div>
      <Nav />
      <Dashboard />
      <Footer />
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="inputText">City:</label>
        <input
          onChange={handleInput}
          id="inputText"
          value={input}
          type="text"
        />
        <button type="submit">Check Weather</button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1>Weather Condition</h1>
      <h3>
        {weather.weather?.map((data, index) => {
          return <div key={index}>{data.description}</div>;
        })}
      </h3>
      <h3>Country: {weather.sys?.country}</h3>
      <h3>Location: {weather?.name}</h3>
      <h3>Temperature: {weather.main?.temp}</h3>
      <h3>Humidity: {weather.main?.humidity}</h3>
      <h3>Wind Speed: {weather.wind?.speed}</h3>
    </div>
  );
}

export default App;
