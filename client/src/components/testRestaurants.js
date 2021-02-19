import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Restaurants() {
  const [restaurantData, updateRestaurantData] = useState([])

  useEffect(() => {
    axios.get('https://api.foursquare.com/v2/venues/explore?client_id=S4D23OXL5DKZ3F0PNZZCU2SXY4BMPNADQXCZ4HBQ5J0BBVZX&client_secret=DQLUOFKVBLNFJCFZHE4CTM5PVI22YIO24IC5PWPLKSIF3BNW&near=Prague&section=food&limit=20&v=20210218')
      .then(axiosResp => {
        updateRestaurantData(axiosResp.data)
        console.log(restaurantData)
      })
  }, [])
  
  
  return <section>
    <h1>Omg this is working!!!☠️ </h1>

  </section>
}