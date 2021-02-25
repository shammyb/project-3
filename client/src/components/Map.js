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



  if (loading) {
    return <ClipLoader loading={loading} size={100} />
  }
  
  return <div>
    {console.log(cities)}

    <ReactMapGL {...viewport}
      mapboxApiAccessToken= 'pk.eyJ1IjoiYW96enkiLCJhIjoiY2trbGk2dWtjMmg4ZTJvbW5udXFhODJzeiJ9.JyCnWImYQtktTI6njEUIcA' 
      mapStyle='mapbox://styles/aozzy/cklf8ryx73w4d17lcit5dzq7e'
      onViewportChange={viewport => {
        setViewport(viewport)
      }}


    >

      {cities.map( city=> (
        <Marker
          key={city._id}
          latitude={city.latitude}
          longitude={city.longitude}
          
        >
          <button className="marker-btn">
            {<img src='./images/icon.png' alt='icon' />}
          </button>
        </Marker>

      ))}



    </ReactMapGL>
  </div>



}
