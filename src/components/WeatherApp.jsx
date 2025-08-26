import React , { useState } from 'react'
import axios from 'axios'
import { HashLoader } from 'react-spinners'

const WeatherApp = () => {

    const [cityName , setCityName] = useState('')
    const [weatherData , setWeatherData] = useState(null)
    
    const [error , setError] = useState("") // error state to display errors on the web page
    const [isLoading , setIsLoading] = useState(false) // loader state when the page is opened


    const fetchWeather = async () => {
        try {
            setError("")
            setIsLoading(true) // start loader
            const API_KEY = 'be09c981ada8150aba060a908edf8c62'
            // const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric` 
            
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
            setWeatherData(response.data)
        } catch (error) {
           setError("City not found")
        } finally {
            setIsLoading(false) // stop loader (success or error)
        }
    }
    
    
  return (
    <div className='h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500 text-white p-6'>
        <h1 className='text-3xl font-bold mb-6'>⛅ Weather App</h1>
        {/* Input Field for the city name */}
        <input className='px-4 py-2 rounded-lg text-black w-64 mb-4 border border-gray-300' type="text" placeholder='Enter city name ...' value={cityName} onChange={e => setCityName(e.target.value)} />
        
        {/* Fetch Data when we click */}
        <button onClick={fetchWeather} className='px-6 py-2 bg-gray-400 text-white rounded-lg font-semibold'>
            {isLoading ? "Loading..." : "Get Weather"}
        </button>

        {/* Loader */}
        {isLoading && (
         <div className='mt-6 flex justify-center items-center'>
            {/* <div className='border-4 w-10 h-10 rounded-full border-t-transparent animate-spin'></div> */}
            <HashLoader color='white'  />
         </div>
        )}
        

        {/* Error Message */}

        {error &&  <p className='mt-4 text-red-500'> {error} </p>}


        {/* Weather Information */}

        {
            weatherData && !isLoading && !error && (
              <div className='mt-6 bg-white text-black p-6 w-80 shadow-lg text-center rounded-2xl'>
                     <h2 className='text-xl font-bold'>{weatherData.name}, {weatherData.sys.country}</h2>
                     <p className='text-lg mt-2 capitalize'>{weatherData.weather[0].description}</p>
                     <p className='text-2xl font-bold mt-2'>{weatherData.main.temp} °C</p>
                     <p className='text-sm mt-2'> Humidity: {weatherData.main.humidity} %</p>
              </div>
            )
            // weatherData ? (
            //     <div>
            //         {weatherData.name}
            //     </div>
            // )
            // :
            // ''
        }


        
    </div>
  )
}

export default WeatherApp