// import React, { useState, useEffect } from 'react'
// import ReactMapGL, { Marker } from 'react-map-gl'
// import axios from 'axios'


// export default function Map() {

//   const [weatherData, updateWeatherData] = useState([])
//   const [cities, updateCities] = useState([])

//   const [viewport, setViewport] = useState({
//     latitude: 54.5260,
//     longitude: 15.2551,
//     width: '100vw',
//     height: '100vh',
//     zoom: 3.5

//   })
//   useEffect(() => {
//     async function getCities() {
//       try {
//         const { data } = await axios.get('/api/cityscapes')
//         updateCities(data)
//         // console.log(data)
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     getCities()
//   }, [])


//   // useEffect(() => {
//   //   fetch('https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=-0.12714&lat=51.506321', {
//   //     headers: {

//   //       'x-rapidapi-key': '0706c6dfe5mshf7b02b3ec57a71dp143cbbjsn6426bcc6a21d',
//   //       'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
//   //     }

//   //   }



//   //   )
//   //     .then(resp => resp.json())
//   //     .then(respdata => {
//   //       updateWeatherData(respdata.data)
//   //     })
//   // }, [])


//   // console.log(weatherData)

//   return <div>

//     <ReactMapGL {...viewport}
//       // mapboxApiAccessToken=
//       mapStyle='mapbox://styles/aozzy/cklf8ryx73w4d17lcit5dzq7e'
//       onViewportChange={viewport => {
//         setViewport(viewport)
//       }}


//     >

//       {cities.map((city, i )=> {
//         <Marker
//           key={i}
//           latitude={city.lat}
//           longitude={city.long}
          
//         >
//           <button>
//             {/* <img src='./images/icon.png' alt='icon' /> */}
//           </button>
//         </Marker>

//       })}



//     </ReactMapGL>
//   </div>



// }
