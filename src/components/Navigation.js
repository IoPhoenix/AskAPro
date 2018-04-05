import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = ({ authUser }) => {
  return (
    <div>
      { authUser
          ? <NavigationAuth />
          : <NavigationNonAuth />
      }
    </div>
  )
}

const NavigationAuth = ({authUser}) => {
  return (
    <ul>
      <li>Hi, {authUser.username}</li>
      <li><Link to={routes.ACCOUNT}>Account</Link></li>
      <li><Link to={routes.ABOUT}>About</Link></li>
      <li><Link to={routes.CONTACT}>Contact</Link></li>
      <li><SignOutButton /></li>
    </ul>
  )
}

const NavigationNonAuth = () => {
  return (
    <ul>
      <li><Link to={routes.ABOUT}>About</Link></li>
      <li><Link to={routes.CONTACT}>Contact</Link></li>
      <li><Link to={routes.SIGN_IN}>Login</Link></li>
    </ul>
  )
}

export default Navigation;