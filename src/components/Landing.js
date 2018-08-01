import React from 'react';
import Hero from './Hero';
import UserList from './UserList';

const LandingPage = () =>
  <div>
    <p>The Home Page is accessible by every signed in user.</p>
    <Hero/>
    <UserList />
  </div>

export default LandingPage;