import React from 'react';
import { Link, } from 'react-router-dom';

const Hero = () =>
  <div className="hero">
    <h1>Place where job seekers can ask for a professional advide. Naturally.</h1>
    <div className="buttons buttons--inline">
        <Link to="/signup">Meet a pro</Link>
        <Link to="/signup">Be a pro</Link>
        {/* <button>Meet a pro</button> */}
        {/* <button>Be a pro</button> */}
    </div>
  </div>

export default Hero;