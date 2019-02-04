import React from 'react';
import { withAuthorization } from './Session';
import { withFirebase } from './Firebase';
import UserList from './UserList/UserList';
import { Jumbotron } from 'bootstrap-4-react';


const AdminPage = () => {
  return (
    <div className="container">
      <Jumbotron>
          <h1>Admin</h1>
          <h4>The Admin Page is accessible by every signed in admin user.</h4>
      </Jumbotron>
      
      <UserList target='admin'/>
      </div>
  )
}

const condition = authUser => authUser && authUser.isAdmin === true;

export default withFirebase(withAuthorization(condition)(AdminPage));
