import React from 'react';
import { BrowserRouter as Router,  Route } from 'react-router-dom';
import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AboutPage from './About/About';
import InterviewTipsPage from './InterviewTips/InterviewTips';
import ContactPage from './Contact/Contact';
import AdminPage from './Admin';
import ProfilePage from './Profile';
import * as routes from '../constants/routes';
import './App.css';
import { withAuthentication } from './Session';



const App = () => (
    <Router>
      <div>
        <header className="mb-5">
          <div className="container">
              <Navigation />
            </div>
        </header>

        <Route
          exact path={routes.LANDING}
          component={() => <LandingPage />}
        />
        <Route
          exact path={routes.SIGN_UP}
          component={() => <SignUpPage />}
        />
        <Route
          exact path={routes.SIGN_IN}
          component={() => <SignInPage />}
        />
        <Route
          exact path={routes.PASSWORD_FORGET}
          component={() => <PasswordForgetPage />}
        />
        <Route
          exact path={routes.HOME}
          component={() => <HomePage />}
        />
        <Route
          exact path={routes.PROFILE}
          component={() => <ProfilePage />}
        />
        <Route
          exact path={routes.ABOUT}
          component={() => <AboutPage />}
        />
        <Route
          exact path={routes.TIPS}
          component={() => <InterviewTipsPage />}
        />
        <Route
          exact path={routes.CONTACT}
          component={() => <ContactPage />}
        />
        <Route
          exact path={routes.ADMIN}
          component={() => <AdminPage />}
        />
    </div>
    </Router>
);
  
// use the higher-order component to make the authenticated
// user available for all other components below App component:
export default withAuthentication(App);
