import React from 'react';
// import UserList from './UserList';
// import UserFilter from './UserFilter';
import { withAuthorization } from './Session';

const HomePage = () => {
  return (
      <div>
        <h1>Home Page is where users are redirected after sign in or sign up</h1>
        {/* <UserFilter />
        <UserList /> */}
      </div>
  )
}


//protect /home route with authorization rules
const condition = authUser => !!authUser; // same as 'const condition = authUser => authUser != null;'

// can be role-based authorization:
// const condition = authUser => authUser.role === 'ADMIN';

export default withAuthorization(condition)(HomePage);