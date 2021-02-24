import React, { useState, useEffect } from 'react'
import Restaurants from './Restaurants.js'
import ThingsToDo from './ThingsToDo.js'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import { useHistory } from 'react-router-dom'
export default function City({ match }) {
  const [text, setText] = useState('')
  const [buttonNum, updateButtonNum] = useState(0)
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

  if (!cities.user) {
    return null
  }
  return <div className="cities">
    <section key className="city" >
      <div className="city-image">
        <h1>{cities.city}</h1>
        <img src={cities.image} alt={cities.name} />
        {isCreator(cities.user._id) && <button
        className="button is-danger"
        onClick={handleDelete}
      > Delete City</button>}
      </div>
      <article id="citylayout">
        <div className="citymenu">
          <div className="search-box">
            <h2>About</h2>
            <img className="search-image" src="https://cdn.iconscout.com/icon/free/png-512/aeroplane-airplane-plane-air-transportation-vehicle-pessanger-people-emoj-symbol-30708.png" />
            <button onClick={()=> updateButtonNum(1)}>
              Search
            </button>
          </div>
          <div className="search-box">
            <h2>Things to Do</h2>
            <img className="search-image" src="https://cdn.iconscout.com/icon/free/png-512/aeroplane-airplane-plane-air-transportation-vehicle-pessanger-people-emoj-symbol-30708.png" />
            <button onClick={()=> updateButtonNum(2)}>
              Search
            </button>
          </div>
          {/* <div className="search-box">
          <h2>Flights</h2>
          <img className="search-image" src="https://cdn.iconscout.com/icon/free/png-512/aeroplane-airplane-plane-air-transportation-vehicle-pessanger-people-emoj-symbol-30708.png" />
          <button onClick={routeChangeFlights}>
            Search
          </button>
        </div> */}
          <div className="search-box">
            <h2>Restaurants</h2>
            <img className="search-image" src="https://cdn.iconscout.com/icon/free/png-512/aeroplane-airplane-plane-air-transportation-vehicle-pessanger-people-emoj-symbol-30708.png" />
            <button onClick={()=> updateButtonNum(3)}>
              Search
            </button>
          </div>
          <div className="search-box">
            <h2>Experiences</h2>
            <img className="search-image" src="https://cdn.iconscout.com/icon/free/png-512/aeroplane-airplane-plane-air-transportation-vehicle-pessanger-people-emoj-symbol-30708.png" />
            <button onClick={()=> updateButtonNum(4)}>
              Search
            </button>
          </div>
        </div>
        <div className="name-about-country-currency">
          <p>{cities.about}</p>
          <h3>{cities.country}</h3>
          <h3>{cities.currency}</h3>
          <h3>{cities.continent}</h3>
        </div>
      </article>
    </section>
    {buttonNum === 3 && <div className="box"><Restaurants city = {city} /></div>}
    {buttonNum === 2 && <div className="box"><ThingsToDo city = {city}/></div>}
    {buttonNum === 4 && <div className="box"><CommentsAllTogether /></div>}
  </div>
}