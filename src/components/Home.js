import React from 'react';
import { AuthUserContext } from './Session';
import UserList from './UserList';
// import UserFilter from './UserFilter';
import { withAuthorization } from './Session';
import { Jumbotron } from 'bootstrap-4-react';



// On home page show list of pros to job seeker and vice versa
const HomePage = () => {
  return (
    <div className="container">
      <Jumbotron>
          <h1>Home Page is where users are redirected after sign in or sign up</h1>
      </Jumbotron>

      <AuthUserContext.Consumer>
          {authUser => authUser.role === 'pro' ? <UserList target='pro'/> : <UserList target='jobseeker'/>}
      </AuthUserContext.Consumer>
    </div>
  )
}

//protect /home route with authorization rules
const condition = authUser => !!authUser; // same as 'const condition = authUser => authUser != null;'

export default withAuthorization(condition)(HomePage);