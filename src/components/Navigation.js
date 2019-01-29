import React from 'react';
import { Link } from 'react-router-dom';
// import AuthUserContext from './AuthUserContext';
import SignOutButton from './SignOut';
import * as ROUTES from '../constants/routes';

const Navigation = ({ authUser }) => {
  
  console.log('authUser in Nav: ', authUser);
  return <div>{authUser ? <NavigationAuth authUser={authUser}/> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = (props) => (
    <ul>
      <li>Hi { props.authUser.email }</li>
      <li><Link to={ROUTES.PROFILE}>Profile</Link></li>
      <li><Link to={ROUTES.ABOUT}>About</Link></li>
      <li><Link to={ROUTES.CONTACT}>Contact</Link></li>
      <li><SignOutButton /></li>
    </ul>
);


const NavigationNonAuth = () => (
  <ul>
    <li><Link to={ROUTES.LANDING}>Landing</Link></li>
    <li><Link to={ROUTES.ABOUT}>About</Link></li>
    <li><Link to={ROUTES.CONTACT}>Contact</Link></li>
    <li><Link to={ROUTES.SIGN_IN}>Sign In</Link></li>
  </ul>
);

export default Navigation;