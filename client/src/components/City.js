import React, { useState, useEffect } from 'react'
import Restaurants from './Restaurants.js'
import ThingsToDo from './ThingsToDo.js'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import { useHistory } from 'react-router-dom'
export default function City({ match }) {
  const [text, setText] = useState('')
  const [buttonNum, updateButtonNum] = useState(1)
  const city = match.params.city
  const token = localStorage.getItem('token')



  const [cities, updateCities] = useState({})
  useEffect(() => {
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
  async function handleDelete() {
    await axios.delete(`/api/cityscapes/${city}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/cityscapes')
  }
  function handleComment() {
    axios.post(`/api/cityscapes/${city}/comment`, { text }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        setText('')
        updateCities(resp.data)
      })
  }
  function handleEditComment(commentId) {
    if (!isCreator) {
      return null
    }
    axios.put(`/api/cityscapes/${city}/comment/${commentId}`, { text }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateCities(resp.data)
      })
  }
  function handleDeleteComment(commentId) {
    if (!isCreator) {
      return null
    }
    axios.delete(`/api/cityscapes/${city}/comment/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateCities(resp.data)
      })
  }
  function CommentsAllTogether() {
    return <div>
      {
        cities.comments && cities.comments.map(comment => {
          return <article key={comment._id} className="media">
            <div className="media-content">
              <div className="content">
                <p className="subtitle">
                  {comment.user.username}
                </p>
                <p>{comment.text}</p>
              </div>
            </div>
            {isCreator(comment.user._id) && <div className="media-right">
              <button
                className="delete"
                onClick={() => handleDeleteComment(comment._id)}>
              </button>
            </div>}
            {isCreator(comment.user._id) && <div className="media-right">
              <button
                className="delete"
                onClick={() => handleEditComment(comment._id)}>
              </button>
            </div>}
          </article>
        })
      }


      <article className="media">
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea
                className="textarea"
                placeholder="Make a comment.."
                onChange={event => setText(event.target.value)}
                value={text}
              >
                {text}
              </textarea>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button
                onClick={handleComment}
                className="button is-info"
              >
                Submit
              </button>
            </p>
          </div>
        </div>
      </article>
    </div>
    
  }
  function DisplayInfo() {

    
    return <div className="about-section">
      <div className="column is-four-fifths-desktop is-centered">

      <div className="card">
        <div className="card-content">

          <h2 className="title is-2">About the city </h2>
          <p>{cities.about}</p>
          <h5 className="title is-5" id="h5-city">Other information </h5>
          <p><strong>Country: </strong>{cities.country}</p>
          <p><strong>Currency: </strong>{cities.currency}</p>
          <p><strong>Continent: </strong>{cities.continent}</p>
        </div>
      </div>
    </div>
    </div>
  }

  if (!cities.user) {
    return null
  }

  return <div className="cities">
    {/* <h1 className="title is-1" id="main-title">{cities.city}</h1> */}

    <section className="hero is-medium is-primary" >
      <div className="hero-body"
        style={{
          backgroundImage: `url(${cities.image})`
          
        }}
      >





        <p className="title" id="hero-title">
          {cities.city}
        </p>
        <p className="subtitle">
          {/* Small subtitle */}
        </p>
      </div>
    </section>


    <section key className="city" >
      {/* <article className="image" id="city-image">

        <img src={cities.image} alt={cities.name} />
        {isCreator(cities.user._id) && <button
          className="button is-danger"
          onClick={handleDelete}
        > Delete City</button>}
      </article> */}



      <article id="citylayout">
        <div className="citymenu">




          <nav className="breadcrumb is-medium" aria-label="breadcrumbs">
            <ul>
              <li>
                <button onClick={() => updateButtonNum(1)} className="button is-info is-light" id="citybuttons">
                  About
            </button>
              </li>
              <li>
                <button onClick={() => updateButtonNum(2)} className="button is-info is-light" id="citybuttons">
                  Things to do
            </button>

              </li>
              <li>
                <button onClick={() => updateButtonNum(3)} className="button is-info is-light" id="citybuttons">
                  Restaurants
            </button>

              </li>
              <li>
                {/* <li class="is-active"> */}
                <button onClick={() => updateButtonNum(4)} className="button is-info is-light" id="citybuttons">
                  Experiences
            </button>
              </li>
            </ul>
          </nav>


          {/* <div className="search-box">
            {/* <h2>About</h2>
            <img className="search-image" src="https://cdn.iconscout.com/icon/free/png-512/aeroplane-airplane-plane-air-transportation-vehicle-pessanger-people-emoj-symbol-30708.png" /> */}
          {/* <button onClick={() => updateButtonNum(1)} className="button is-info is-light" id="citybuttons">
              About
            </button>
          </div> */}
          {/* <div className="search-box"> */}
          {/* <h2>Things to Do</h2>
            <img className="search-image" src="https://cdn.iconscout.com/icon/free/png-512/aeroplane-airplane-plane-air-transportation-vehicle-pessanger-people-emoj-symbol-30708.png" /> */}
          {/* <button onClick={() => updateButtonNum(2)} className="button is-info is-light" id="citybuttons">
              Things to do
            </button>
          </div> */}
          {/* <div className="search-box">
          <h2>Flights</h2>
          <img className="search-image" src="https://cdn.iconscout.com/icon/free/png-512/aeroplane-airplane-plane-air-transportation-vehicle-pessanger-people-emoj-symbol-30708.png" />
          <button onClick={routeChangeFlights}>
            Search
          </button>
        </div> */}
          {/* <div className="search-box"> */}
          {/* <h2>Restaurants</h2>
            <img className="search-image" src="https://cdn.iconscout.com/icon/free/png-512/aeroplane-airplane-plane-air-transportation-vehicle-pessanger-people-emoj-symbol-30708.png" /> */}
          {/* <button onClick={() => updateButtonNum(3)} className="button is-info is-light" id="citybuttons">
              Restaurants
            </button>
          </div> */}
          {/* <div className="search-box"> */}
          {/* <h2>Experiences</h2>
            <img className="search-image" src="https://cdn.iconscout.com/icon/free/png-512/aeroplane-airplane-plane-air-transportation-vehicle-pessanger-people-emoj-symbol-30708.png" /> */}
          {/* <button onClick={() => updateButtonNum(4)} className="button is-info is-light" id="citybuttons">
              Experiences
            </button>
          </div> */}


        </div>

        <div className="cityContent">

          {buttonNum === 1 && <div className="box"><DisplayInfo /></div>}
          {buttonNum === 3 && <div className="box"><Restaurants city={city} /></div>}
          {buttonNum === 2 && <div className="box"><ThingsToDo city={city} /></div>}
          {buttonNum === 4 && <div className="box"><CommentsAllTogether /></div>}
        </div>
      </article>

    </section>
  </div >
}