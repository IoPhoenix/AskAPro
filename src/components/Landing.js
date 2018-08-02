import React from 'react';
import Hero from './Hero';
import UserList from './UserList';

const LandingPage = () =>
  <div>
    <p>The Home Page is accessible by every signed in user.</p>
    <Hero/>
    <UserList limit={1}/>
  </div>

export default LandingPage;