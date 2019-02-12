import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withAuthorization } from '../Session';
import UserManagement from './UserManagement';
import UserDetails from './UserDetails';
import { Jumbotron } from 'bootstrap-4-react';
import * as ROUTES from '../../constants/routes';


// add admin sdk to the server
// https://firebase.google.com/docs/admin/setup


const AdminPage = () => {
  return (
    <div className="container">
      <Jumbotron className="mt-5">
          <h1>Admin</h1>
          <h4>The Admin Page is accessible by every signed in admin user.</h4>
      </Jumbotron>
      
      <Switch>
        <Route exact path={ROUTES.ADMIN_DETAILS} component={UserDetails} />
        <Route exact path={ROUTES.ADMIN} component={UserManagement} />
      </Switch>
    </div>
  )
}

const condition = authUser => authUser && authUser.isAdmin === true;

export default withAuthorization(condition)(AdminPage);
