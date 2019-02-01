import React from 'react';
import Hero from './Hero';
import UserList from './UserList';

const LandingPage = () =>
  <div>
    <h1>Landing page is the page users see for the first time</h1>
    <Hero/>
    <UserList />
  </div>

export default LandingPage;