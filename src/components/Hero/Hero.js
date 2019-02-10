import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () =>
    <section className="hero fdb-block fdb-viewport bg-dark">
      <div className="container align-items-center justify-content-center d-flex">
        <div className="row align-items-center text-left">
          <div className="col-12 col-sm-10 col-md-8 col-lg-8">
            <h1>Place where job seekers can ask for a professional advice. Naturally.</h1>
            <p className="lead">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there.</p>
            <p className="mt-5">
              <Link to="/signup" className="btn btn-light btn-lg">Meet a pro</Link>
              <Link to="/signup" className="btn btn-primary ml-4 btn-lg">Be a pro</Link>
            </p>
          </div>
        </div>
      </div>
    </section>


export default Hero;