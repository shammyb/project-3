import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'

export default function ThingsToDo({ city }) {
  
  const [artsData, updateArtsData] = useState({})
  const [outdoorsData, updateOutdoorsData] = useState({})
  const [sightsData, updateSightsData] = useState({})
  const [loading1, updateLoading1] = useState(true)
  const [loading2, updateLoading2] = useState(true)
  const [loading3, updateLoading3] = useState(true)
  
  const [cities, updateCities] = useState({})

  

  useEffect(() => {

    async function getArtsData() {

      try {
        const { data } = await axios.get(`https://api.foursquare.com/v2/venues/explore?client_id=S4D23OXL5DKZ3F0PNZZCU2SXY4BMPNADQXCZ4HBQ5J0BBVZX&client_secret=DQLUOFKVBLNFJCFZHE4CTM5PVI22YIO24IC5PWPLKSIF3BNW&near=${city}&section=arts&limit=5&v=20210222`)

        updateArtsData(data.response.groups[0].items)
        updateLoading1(false)



      } catch (err) {
        console.log(err)
      }
    }
    getArtsData()


    async function getOutdoorsData() {

      try {
        const { data } = await axios.get(`https://api.foursquare.com/v2/venues/explore?client_id=S4D23OXL5DKZ3F0PNZZCU2SXY4BMPNADQXCZ4HBQ5J0BBVZX&client_secret=DQLUOFKVBLNFJCFZHE4CTM5PVI22YIO24IC5PWPLKSIF3BNW&near=${city}&section=outdoors&limit=5&v=20210222`)

        updateOutdoorsData(data.response.groups[0].items)
        updateLoading2(false)



      } catch (err) {
        console.log(err)
      }
    }
    getOutdoorsData()
    console.log('why the hell nothing is apperaing')
    console.log('this is outdoors data' + outdoorsData)

    async function getSightsData() {

      try {
        const { data } = await axios.get(`https://api.foursquare.com/v2/venues/explore?client_id=S4D23OXL5DKZ3F0PNZZCU2SXY4BMPNADQXCZ4HBQ5J0BBVZX&client_secret=DQLUOFKVBLNFJCFZHE4CTM5PVI22YIO24IC5PWPLKSIF3BNW&near=${city}&section=sights&limit=5&v=20210222`)

        updateSightsData(data.response.groups[0].items)
        updateLoading3(false)


      } catch (err) {
        console.log(err)
      }
    }
    getSightsData()

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


  if (loading1) {
    return <ClipLoader loading1={loading1} size={100} />
  }
  if (loading2) {
    return <ClipLoader loading2={loading2} size={100} />
  }
  if (loading3) {
    return <ClipLoader loadin3={loading3} size={100} />
  }





  // console.log('this is returning the data')
  // console.log(restaurantData)
  // console.log('specific thing')
  // console.log(restaurantData[0].venue.name)

  return <div className="thingstodo">
    {/* <div className="container1">
      <div className="city-image">
        <h1>{cities.city}</h1>
        <img src={cities.image} alt={cities.name} />
      </div>
    </div> */}

    <div className="container2">
      <h1 className="title is-1">Look for the best things to do in {city} </h1>
      <div className="columns is-multiline is-mobile"></div>

      <section id="Arts">
        <h3 className="title is-3">Arts</h3>
        {
          artsData.map((item, index) => {
            return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile is-multiline">

              <a href={`https://foursquare.com/v/${item.venue.id}`} target="_blank">

                <div className="card">
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4">{item.venue.name}</p>
                        <p className="subtitle is-6">{item.venue.categories[0].name}</p>
                        <p className="subtitle is-6">{item.venue.location.address}</p>
                      </div>
                    </div>

                  </div>
                </div>
              </a>
            </div>
          })
        }
      </section>

      <section id="Outdoors">
        <h3 className="title is-3">Outdoors</h3>
        {
          outdoorsData.map((item, index) => {
            return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">


              <a href={`https://foursquare.com/v/${item.venue.id}`} target="_blank">
                <div className="card">
                  <div className="card-content">
                    <p className="title is-4">{item.venue.name}</p>
                    <p className="subtitle is-6">{item.venue.categories[0].name}</p>
                    <p className="subtitle is-6">{item.venue.location.address}</p>


                  </div>
                </div>
              </a>
            </div>
          })
        }
      </section>

      <section id="sights">
        <h3 className="title is-3">Sights</h3>
        {
          sightsData.map((item, index) => {
            return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
              <a href={`https://foursquare.com/v/${item.venue.id}`} target="_blank">


                <div className="card">
                  <div className="card-content">
                    <p className="title is-4">{item.venue.name}</p>
                    <p className="subtitle is-6">{item.venue.categories[0].name}</p>
                    <p className="subtitle is-6">{item.venue.location.address}</p>


                  </div>
                </div>
              </a>
            </div>
          })
        }
      </section>


    </div>
  </div>


}
