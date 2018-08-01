import React from 'react';
import UserList from './UserList';
import UserFilter from './UserFilter';
import withAuthorization from './withAuthorization';

const HomePage = () => {
    return (
      <div>
        <h1>Home Page</h1>
        <UserFilter />
        <UserList />
      </div>
    );
}

//protect /home route with authorization rules
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);