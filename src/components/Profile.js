import React from 'react';
import withAuthorization from './withAuthorization';

const ProfilePage = () =>
  <div>
    <h1>Profile Page</h1>
  </div>

//protect /profile route with authorization rules
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(ProfilePage);