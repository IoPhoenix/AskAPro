import React from 'react';
import { Link } from 'react-router-dom';
import AuthUserContext from './AuthUserContext';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  )
}

const NavigationAuth = () => {
  console.log('user logged in');
  return (
    <ul>
      <li>Hi, </li>
      <li><Link to={routes.ACCOUNT}>Account</Link></li>
      <li><Link to={routes.ABOUT}>About</Link></li>
      <li><Link to={routes.CONTACT}>Contact</Link></li>
      <li><SignOutButton /></li>
    </ul>
  )
}

const NavigationNonAuth = () => {
  console.log('user not logged in');
  return (
    <ul>
      <li><Link to={routes.ABOUT}>About</Link></li>
      <li><Link to={routes.CONTACT}>Contact</Link></li>
      <li><Link to={routes.SIGN_IN}>Login</Link></li>
    </ul>
  )
}

export default Navigation;