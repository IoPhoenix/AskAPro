import React from 'react';
import Hero from './Hero/Hero';
import UserList from './UserList/UserList';

const LandingPage = () =>
  <div>
    <Hero/>
    <UserList limit="4"/>
  </div>

export default LandingPage;