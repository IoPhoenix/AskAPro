import React from 'react';
import { Link } from 'react-router-dom';
import AuthUserContext from './AuthUserContext';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = () => {

  return (
    <AuthUserContext.Consumer>
      { authUser => authUser ? 
        (
          <ul>
            <li>Hi { authUser.email } </li>
            <li><Link to={routes.PROFILE}>Profile</Link></li>
            <li><Link to={routes.ABOUT}>About</Link></li>
            <li><Link to={routes.CONTACT}>Contact</Link></li>
            <li><SignOutButton /></li>
          </ul>
        ) : (
          <ul>
            <li><Link to={routes.ABOUT}>About</Link></li>
            <li><Link to={routes.CONTACT}>Contact</Link></li>
            <li><Link to={routes.SIGN_IN}>Login</Link></li>
          </ul>)
      }
    </AuthUserContext.Consumer>
  )
}

export default Navigation;