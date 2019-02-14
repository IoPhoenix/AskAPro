import React from 'react';
import { withAuthorization } from '../Session';
import { Jumbotron } from 'bootstrap-4-react';
// import * as ROUTES from '../../constants/routes';


const Onboarding = () => {
  return (
    <div className="container">
      <Jumbotron className="mt-5">
          <h1>Onboarding</h1>
          <h4>The Onboarding Page is accessible by every user right after sign up</h4>
      </Jumbotron>
      
      
    </div>
  )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Onboarding);
