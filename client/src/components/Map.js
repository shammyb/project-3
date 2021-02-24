import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader'


export default function Map() {

  const [loading, updateLoading] = useState(true)
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
        const { data } = await axios.get('https://www.trackcorona.live/api/countries')
        updateCities(data.data)
        updateLoading(false)
        // console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getCities()
  }, [])


  // useEffect(() => {
  //   fetch('https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=-0.12714&lat=51.506321', {
  //     headers: {

  //       
  //     }

  //   }



  //   )
  //     .then(resp => resp.json())
  //     .then(respdata => {
  //       updateWeatherData(respdata.data)
  //     })
  // }, [])

  if (loading) {
    return <ClipLoader loading={loading} size={100} />
  }
  // console.log(weatherData)
  return <div>
    {console.log(cities)}

    <ReactMapGL {...viewport}
      mapboxApiAccessToken= 
      mapStyle='mapbox://styles/aozzy/cklf8ryx73w4d17lcit5dzq7e'
      onViewportChange={viewport => {
        setViewport(viewport)
      }}


    >

      {cities.map( (city, index )=> {
        <Marker
          key={index}
          latitude={city.latitude}
          longitude={city.longitude}
          
        >
          <button>
            {/* <img src='./images/icon.png' alt='icon' /> */}
          </button>
        </Marker>

      })}



    </ReactMapGL>
  </div>



}
