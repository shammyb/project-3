import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { useHistory, LInk } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
// import { ExternalLink } from 'react-external-link'

export default function Restaurants({ city }) {
  const [restaurantData, updateRestaurantData] = useState({})
  const [loading, updateLoading] = useState(true)

  console.log('print the city: ' + city)
  const [cities, updateCities] = useState({})

  //use effect for the Foursquare API

  useEffect(() => {

    async function getData() {

      try {



        const { data } = await axios.get(`https://api.foursquare.com/v2/venues/explore?client_id=${process.env.foursquareClientID}&client_secret=${process.env.foursquareClientSecret}&near=${city}&section=food&limit=20&v=20210222`)

        updateRestaurantData(data.response.groups[0].items)
        updateLoading(false)
        // console.log('below the data yay')
        // updateRestaurantData(restaurantData.items)


      } catch (err) {
        console.log(err)
      }
    }
    getData()

    async function fetchCityData() {
      try {
        const { data } = await axios.get(`/api/cityscapes/${city}`)
        updateCities(data)


      } catch (err) {
        console.log(err)
      }
    }
    fetchCityData()
  }, [])


  if (loading) {
    return <ClipLoader loading={loading} size={100} />
  }






  // console.log('this is returning the data')
  // console.log(restaurantData)
  // console.log('specific thing')
  // console.log(restaurantData[0].venue.name)


  // const foursquareLink = 'https://foursquare.com/v/'

  return <div className="section">

    {/* <div className="city-image">
      <h1>{cities.city}</h1>
      <img src={cities.image} alt={cities.name} />
    </div> */}


    <div className="container is-centered">
      <h2 className="title is-2">Look for top Restaurants in {city} </h2>
      <div className="column">
        <div className="columns is-multiline is-centered">

          {/* <div className="card"> */}
          {
            restaurantData.map((restaurant, index) => {



              <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                <span>



                </span>
              </a>
              return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">


                <a href={`https://foursquare.com/v/${restaurant.venue.id}`} target="_blank">


                  <div className="card">
                    <div className="card-content">
                      <p className="title is-4">{restaurant.venue.name}</p>
                      <p className="subtitle is-6">{restaurant.venue.categories[0].name}</p>
                      <p className="subtitle is-6">{restaurant.venue.location.address}</p>


                    </div>
                  </div>

                </a>
              </div>
            })
          }
          {/* </div> */}
        </div>
      </div>
    </div>
  </div >


}
