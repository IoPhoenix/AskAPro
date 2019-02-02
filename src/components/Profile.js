import React from 'react';
import { AuthUserContext, withAuthorization } from './Session';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import user from '../images/people/1.jpg';

const ProfilePage = () => (
     <section className="fdb-block">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6 col-xl-5">
            <h1>Your Profile</h1>

            <hr />

            <AuthUserContext.Consumer>
                { authUser => (
                  <div>
                    <p><strong>Name: </strong> <span>{authUser.username}</span></p>
                    <p><strong>Email: </strong> <span>{authUser.email}</span></p>
                    <p><strong>Status: </strong> <em>"Seeking an advice for a front-end position at Google"</em></p>
                    <p className="lead">You are marked as a <strong>job seeker</strong>. Would you like to browse pros?</p>
                  </div>
              )}
            </AuthUserContext.Consumer>

            <div className="row pt-4 pt-xl-5">
              <div className="col-12 col-md-5">
              <Link to={ROUTES.HOME} className="btn btn-primary">Browse professionals</Link>
              </div>
              <div className="col-12 col-md-5 m-auto pt-3 pt-md-0">
                  <a href="#" className="btn btn-dark">Check your messages</a>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8 col-lg-6 m-auto mr-lg-0 ml-lg-auto pt-5 pt-lg-0">
            <img alt="Large user portrait" className="img-fluid" src={user} />
          </div>
        </div>
      </div>
    </section>
  )


// protect /profile route with authorization rules
const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProfilePage);