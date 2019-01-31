import React from 'react';
import { withAuthorization } from './Session';
import { withFirebase } from './Firebase';
import UserList from './UserList';


const AdminPage = () => {
  return (
    <div>
        <h1>Admin</h1>
        <p>The Admin Page is accessible by every signed in admin user.</p>
        
         <UserList target='admin'/>
    </div>
  )
}

const condition = authUser => authUser && authUser.isAdmin === true;

export default withFirebase(withAuthorization(condition)(AdminPage));
