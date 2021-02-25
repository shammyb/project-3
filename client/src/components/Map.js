import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader'


export default function Map() {

  const [loading, updateLoading] = useState(true)
  const [cities, updateCities] = useState({})
  const [choosenCity, setChoosenCity] = useState(null)

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

    <ReactMapGL {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle='mapbox://styles/aozzy/cklf8ryx73w4d17lcit5dzq7e'
      onViewportChange={viewport => {
        setViewport(viewport)
      }}


    >

      {cities.map(city => (
        <Marker
          key={city._id}
          latitude={city.latitude}
          longitude={city.longitude}
          

        >
          <button className='marker-btn' onClick={(event) => {
            event.preventDefault()
            setChoosenCity(city)
          }} >
            <img src='https://res.cloudinary.com/dznpk39i0/image/upload/v1614271161/nuzsszfjm4jyapebuoo4.png' alt='icon' />
          </button>
        </Marker>

      ))}


      {choosenCity ? (
        <Popup latitude={choosenCity.latitude}
          longitude={choosenCity.longitude} onClose={() => {
            setChoosenCity(null)
          }} >
          <div>
            <h2> Confirmed Cases: {choosenCity.confirmed} </h2>
            <h2> Death Toll: {choosenCity.dead} </h2>
            <h2> Recovered: {choosenCity.recovered}  </h2>
          </div>
        </Popup>
      ) : null}
    </ReactMapGL>

  </div>


}
