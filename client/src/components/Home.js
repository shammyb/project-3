import React from 'react'
import { Link } from 'react-router-dom'
import Slider from "react-slick"

export default function Home() {
  var settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  }

  return <section className="heropage">
  <div className="homepage-text">
    <h1 className="homepage-title">Cityscapes</h1>
    <h3 className="homepage-subtitle">Find your hidden Gem</h3>
  </div>
  <Slider {...settings}>
    <div>
      <img src="https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80"/>
    </div>
    <div>
    <img src="https://images.unsplash.com/photo-1474831626379-cfcad2ba6309?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3548&q=80"/>
    </div>
    <div>
    <img src="https://images.unsplash.com/photo-1529260830199-42c24126f198?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3455&q=80"/>
    </div>
    <div>
    <img src="https://images.unsplash.com/photo-1542379950-b3fc716c16f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80"/>
    </div>
  </Slider>
</section>

}
