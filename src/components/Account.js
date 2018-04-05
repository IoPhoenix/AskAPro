import React from 'react';
import withAuthorization from './withAuthorization';


const AccountPage = () =>
  <div>
    <h1>Account Page</h1>
    <p>Account page is available only for logged in users.</p>
  </div>

//protect /account route with authorization rules
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);