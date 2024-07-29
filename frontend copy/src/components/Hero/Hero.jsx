import React from 'react'
import hand_icon from '../assets/hand_icon.png'
import arrow_icon from '../assets/arrow.png'
import hero_img from '../assets/house1-removebg.png'
import './Hero.css'

export const Hero = () => {
  return (
    <div className="hero">
        <div className="hero-left">
            <h2>Select your home</h2>
            <div className="hero-hand-icon">
                <p>fall</p>
                <img src={hand_icon}/>
            </div>
            <p>in love</p>
            <p>with good living</p>
            <div className="hero-latest-btn">
                <div>New Splendor</div>
                <img src={arrow_icon}/>
            </div>
        </div>
        <div className="hero-right">
            <img src={hero_img}/>
        </div>
    </div>
  )
}
