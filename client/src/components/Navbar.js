import { Link, withRouter } from 'react-router-dom'
import React from 'react'
import { getLoggedInUserId } from '../lib/auth'

//import axios from 'axios'
const NavBar = ({ history }) => {
  function handleLogout() {
    localStorage.removeItem('token') 
    history.push('/')
  }

  const loggedIn = getLoggedInUserId()


  return <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-menu is-active">
      <div className="navbar-start">
        <img className="navbar-logo" src="../images/logo.png" />
        <div className="navbar-item">
          <div className="buttons">
            <Link to="/cityscapes" className="button">
              Home
            </Link>
            <Link to='/cityscapes/discover' className="button">
              Discover
            </Link>
            <Link to='/cityscapes/flights' className="button">
              Flights
            </Link>
            <Link to='/cityscapes/map' className="button">
              Covid 19 Map
            </Link>
          </div>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {!loggedIn && <Link to="/register" className="button" id="reg-log-button">
              Register
            </Link>}
            {!loggedIn && <Link to="/login" className="button" id="reg-log-button">
              Login
            </Link>}
            {loggedIn && <button onClick={handleLogout} className="button" id="reg-log-button">
              Logout
            </button>}
          </div>
        </div>
      </div>
    </div>
  </nav>
}
export default withRouter(NavBar)
