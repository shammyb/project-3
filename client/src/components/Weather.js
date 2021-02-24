import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { useHistory, LInk } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
// import { ExternalLink } from 'react-external-link'

export default function Weather( { city }) {

  const [loading, updateLoading] = useState(true)
  const [weathers, updateWeathers] = useState({
    main: {},
    weather: []
  })

  const city = match.params.city
  //use effect for the Foursquare API

  useEffect(() => {

    async function getData(city) {

      try {



        const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=bb9852ea707df495071eb09d564cc4d9`)

        updateWeathers(data.list[0])
        updateLoading(false)
        // console.log('below the data yay')
        // updateRestaurantData(restaurantData.items)


      } catch (err) {
        console.log(err)
      }
    }
    getData()




    if (loading) {
      return <ClipLoader loading={loading} size={100} />
    }










  })


  return <div>

  <h2 className="title is-2"> {Math.round(weathers.main.temp)}°C</h2>

  <div>Feels like {Math.round(weathers.main.feels_like)} °C. {weathers.weather.main}</div>
  <div>{weathers.weather.icon}</div>

{/* <div id="flexboxWeather">

<h2 className="title is-2" id="temperature"> {Math.round(weathers.main.temp)}°C</h2>
<img src={`http://openweathermap.org/img/w/${weathers.weather[0].icon}.png`} alt='picture of the weather' width="80"/>

<div>{weathers.weather[0].main}. Feels like {Math.round(weathers.main.feels_like)} °C. </div>

</div>
   */}



</div>
}