import React, { Component } from 'react';
import { BrowserRouter as Router,  Route } from 'react-router-dom';
import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AboutPage from './About';
import ContactPage from './Contact';
import AccountPage from './Account';
import ProfilePage from './Profile';
import * as routes from '../constants/routes';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  render() {
    return (
      <Router>
         <div>
        <Navigation authUser={this.state.authUser}/>
  
        <hr/>
  
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
          exact path={routes.CONTACT}
          component={() => <ContactPage />}
        />
        <Route
          exact path={routes.ACCOUNT}
          component={() => <AccountPage />}
        />
      </div>
    </Router>
    )
  }
  
}

export default App;
