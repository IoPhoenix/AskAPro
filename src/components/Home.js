import React from 'react';
import withAuthorization from './withAuthorization';

const HomePage = () =>
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>

//protect /home route with authorization rules
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);