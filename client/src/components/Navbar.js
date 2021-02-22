import { Link, withRouter } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
//import axios from 'axios'
export default function Navbar() {
  return <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-menu is-active">
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link to="/cityscapes" className="button is-dark">
              Home
            </Link>
            <Link to='/cityscapes/discover' className="button is-primary">
              Discover
            </Link>
            <Link to='/cityscapes/flights' className="button is-primary">
              Flights
            </Link>
            <Link to="/register" className="button is-light">
              Register
            </Link>
            <Link to="/login" className="button is-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
}