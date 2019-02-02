import React from 'react';
import { AuthUserContext, withAuthorization } from './Session';

const ProfilePage = () => (
    <div>
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <p>Email: {authUser.email}</p>
          </div>
        )}
      </AuthUserContext.Consumer>
    </div>
);

  
/* <section className="fdb-block">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-12 col-lg-6 col-xl-5">
        <h1>Your Profile</h1>
        <p className="lead">You are marked as a job seeker. Would you like to browse pros?</p>

        <div className="row pt-4 pt-xl-5">
          <div className="col-12 col-md-5">
            <h4><strong>Feature One</strong></h4>
            <p>A small river named Duden flows</p>
          </div>
          <div className="col-12 col-md-5 m-auto pt-3 pt-md-0">
            <h4><strong>Feature Two</strong></h4>
            <p>Separated they live in Bookmarksgrove</p>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-8 col-lg-6 m-auto mr-lg-0 ml-lg-auto pt-5 pt-lg-0">
        <img alt="image" className="img-fluid" src="./images/draws/scrum.svg">
      </div>
    </div>
  </div>
</section> */


// protect /profile route with authorization rules
const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProfilePage);