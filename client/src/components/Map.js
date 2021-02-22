import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import axios from 'axios'




export default function Map() {

  const [weatherData, updateWeatherData] = useState([])
  const [cities, updateCities] = useState([])

  const [viewport, setViewport] = useState({
    latitude: 54.5260,
    longitude: 15.2551,
    width: '100vw',
    height: '100vh',
    zoom: 3.5

  })
  useEffect(() => {
    async function getCities() {
      try {
        const { data } = await axios.get('/api/cityscapes')
        updateCities(data)
        // console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getCities()
  }, [])


  
  return <div>

    <ReactMapGL {...viewport}
      // mapboxApiAccessToken=
      mapStyle='mapbox://styles/aozzy/cklf8ryx73w4d17lcit5dzq7e'
      onViewportChange={viewport => {
        setViewport(viewport)
      }}


    >

      {cities.map((city, i )=> {
        <Marker
          key={i}
          latitude={city.lat}
          longitude={city.long}
          
        >
          <button>
            {/* <img src='./images/icon.png' alt='icon' /> */}
          </button>
        </Marker>

      })}



    </ReactMapGL>
  </div>



}
