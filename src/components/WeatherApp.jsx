import React , { useState } from 'react'
import axios from 'axios'

const WeatherApp = () => {

    const [cityName , setCityName] = useState('')

    const fetchWeather = async () => {
        try {

        const API_KEY = 'be09c981ada8150aba060a908edf8c62'
        // const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric` 
        
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
        console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    
    
  return (
    <div>
        <h1>⛅ Weather App</h1>
        {/* Input Field for the city name */}
        <input type="text" placeholder='Enter city name ...' value={cityName} onChange={e => setCityName(e.target.value)} />
        
        {/* Fetch Data when we click */}
        <button onClick={fetchWeather}>
            Get Weather
        </button>
    </div>
  )
}

export default WeatherApp