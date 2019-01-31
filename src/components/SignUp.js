import React, { Component } from 'react';
import { Link, withRouter, } from 'react-router-dom';
import { withFirebase } from './Firebase';
import { SignInLink } from './SignIn';
import * as ROUTES from '../constants/routes';
import * as ROLES from '../constants/roles';

const SignUpPage = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm />    
      <SignInLink />
    </div>  
  )
}


const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConfirmed: '',
  role: '',
  isAdmin: false,
  error: null,
};


class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    const { username, email, password, role, isAdmin } = this.state;

    const roles = [];

    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        // create a user in the Firebase realtime database:
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            role,
            isAdmin
          });
      })
      .then(authUser => {
        console.log('authUser is: ', authUser);
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  render() {
    const { username, email, password, passwordConfirmed, role, error } = this.state;
    
    const isInvalid =
      password === '' ||
      passwordConfirmed === '' ||
      password !== passwordConfirmed ||
      email === '' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      username === '' || role === '';
    

    return (
      <form onSubmit={this.onSubmit}>
        <input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <input
            name="passwordConfirmed"
            value={passwordConfirmed}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
          <div>
            <input 
              type="radio"
              name="role"
              value="pro"
              onChange={this.onChange} />
            <label htmlFor="pro">I'm a pro</label>

            <input 
              type="radio" 
              name="role"
              value="jobseeker" 
              onChange={this.onChange} />
            <label htmlFor="jobseeker">I'm a job seeker</label><br/>
            <small>*You can change your status later</small>
          </div>

          <button
            disabled={isInvalid}
            type="submit">Sign Up</button>

          { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const SignUpLink = () => {
  return (
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  )
}

/*T o redirect a user to another page, we need access to React Router. 
The React Router node package offers a higher-order component to make 
the router properties accessible in the props of a component. Any component
that goes in the withRouter() HOC gains access to all the properties of the router,
so when passing the enhanced SignUpFormBase component to the withRouter() HOC,
it has access to the props of the router. The relevant property from the
router props is the history object, because it allows us to redirect a user to another page by pushing a route to it.*/
const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export {
  SignUpForm,
  SignUpLink,
};