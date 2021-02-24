import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Discover from './components/Discover'
import Flights from './components/Flights'

import City from './components/City'
// import Experiences from './components/Experiences'
import Restaurants from './components/Restaurants'
import ThingsToDo from './components/ThingsToDo'

import UpdateCity from './components/UpdateCity'
import PostCity from './components/PostCity'
import Map from './components/Map'

import ImageUpload from './components/ImageUpload'


//for testing purposes 
import testRestaurants from './components/testRestaurants'

import 'bulma'
import './styles/style.scss'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/cityscapes" component={Home}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/cityscapes/images" component={ImageUpload} />
      <Route exact path="/cityscapes/discover" component={Discover}/>
      <Route exact path="/cityscapes/discover/postcity" component={PostCity} />
      <Route exact path="/cityscapes/discover/map" component={Map}/>
      <Route exact path="/cityscapes/flights" component={Flights} />
      <Route exact path="/cityscapes/discover/:city" component={City} />
      <Route exact path="/cityscapes/discover/:city/updatecity" component={UpdateCity} />

      {/* <Route exact path="/testrestaurants" component={testRestaurants} /> */}
    </Switch>
  </BrowserRouter>
)

export default App