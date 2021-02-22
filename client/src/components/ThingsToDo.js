



import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'

export default function ThingsToDo() {
  const [sightsData, updateSightsData] = useState({})

  const [loading, updateLoading] = useState(true)

  useEffect(() => {

    async function getData() {

      try {



        const { data } = await axios.get('https://api.foursquare.com/v2/venues/explore?client_id=S4D23OXL5DKZ3F0PNZZCU2SXY4BMPNADQXCZ4HBQ5J0BBVZX&client_secret=DQLUOFKVBLNFJCFZHE4CTM5PVI22YIO24IC5PWPLKSIF3BNW&near=Prague&section=sights&limit=20&v=20210218')

        updateSightsData(data.response.groups[0].items)
        updateLoading(false)
        // console.log('below the data yay')
        // updateRestaurantData(restaurantData.items)


      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])



  if (loading) {
    return <ClipLoader loading={loading} size={100} />
  }




  console.log('this is returning the data')
  console.log(sightsData)
  console.log('specific thing')
  console.log(sightsData[0].venue.name)

  return <div>
    <h1>These are the restaurants yo </h1>
    <div className="container">
      <div className="columns is-multiline is-mobile"></div>


      {
        sightsData.map((sight, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">



            <div className="card">
              <div className="card-content">
                <p className="title is-4">{sight.venue.name}</p>
                <p className="subtitle is-6">{sight.venue.categories[0].name}</p>
                <p className="subtitle is-6">{sight.venue.location.address}</p>


              </div>
            </div>

          </div>


        })
      }
    </div>
  </div>

 
}