import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from './Session';
import logo from '../../src/images/logo.svg';
import SignOutButton from './SignOut';
import * as ROUTES from '../constants/routes';
import {  Navbar, Nav, Dropdown, Collapse } from 'bootstrap-4-react';

const Navigation = () => {
  return (
    <Navbar expand="lg" light>
        <Navbar.Brand href="#">
            <img src={logo} height="30" alt="Website Logo"/><span> AskAPro</span>
        </Navbar.Brand>
        <Navbar.Toggler target="#navbarSupportedContent" />
        <Collapse navbar id="navbarSupportedContent">
          <AuthUserContext.Consumer>
               {authUser => authUser ? <NavigationAuth authUser={authUser}/> : <NavigationNonAuth />}
          </AuthUserContext.Consumer>
        </Collapse>
    </Navbar>
  )
}

const NavigationAuth = ({authUser}) => {
  
  console.log('authUser in Nav: ', authUser);

  return (
      <Navbar.Nav ml="auto">
        <Nav.Item>
          <Link to={ROUTES.HOME} className="nav-link">Home</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={ROUTES.ABOUT} className="nav-link">About</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={ROUTES.TIPS} className="nav-link">Interview Tips</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={ROUTES.CONTACT} className="nav-link">Contact</Link>
        </Nav.Item>
        <Nav.Item dropdown>
            <Nav.Link dropdownToggle>Hi {authUser.username}</Nav.Link>
            <Dropdown.Menu>
                <Link to={ROUTES.PROFILE} className="dropdown-item">Profile</Link>
                {authUser.isAdmin === true && <Link to={ROUTES.ADMIN} className="dropdown-item">Admin</Link>}
                <SignOutButton />
            </Dropdown.Menu>
        </Nav.Item>
      </Navbar.Nav>
  );
}


const NavigationNonAuth = () =>
    <Navbar.Nav ml="auto">
      <Nav.Item>
        <Link to={ROUTES.HOME} className="nav-link">Home</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to={ROUTES.ABOUT} className="nav-link">About</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to={ROUTES.TIPS} className="nav-link">Interview Tips</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to={ROUTES.CONTACT} className="nav-link">Contact</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to={ROUTES.SIGN_IN} className="btn btn-outline-primary ml-md-3">Login</Link>
      </Nav.Item>
    </Navbar.Nav>

export default Navigation;