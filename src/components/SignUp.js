import React, { Component } from 'react';
import { Link, withRouter, } from 'react-router-dom';
import { auth } from '../firebase';
import * as routes from '../constants/routes';


const SignUpPage = ({history}) => {
  return (
    <div>
      <h1>SignUp</h1>
      <SignUpForm history={history}/>
    </div>  
  )
}


const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConfirmed: '',
  role: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      // username,
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  handleOptionChange = (changeEvent) => {
    this.setState({
      role: changeEvent.target.value
    });
  }

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmed,
      role,
      error,
    } = this.state;

    
    const isInvalid =
      password === '' ||
      passwordConfirmed === '' ||
      password !== passwordConfirmed ||
      email === '' ||
      username === '' || role === '';
    

    return (
      <form onSubmit={this.onSubmit}>
        <input
            value={username}
            onChange={event => this.setState(byPropKey('username', event.target.value))}
            type="text"
            placeholder="Full Name"
          />
          <input
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          />
          <input
            value={password}
            onChange={event => this.setState(byPropKey('password', event.target.value))}
            type="password"
            placeholder="Password"
          />
          <input
            value={passwordConfirmed}
            onChange={event => this.setState(byPropKey('passwordConfirmed', event.target.value))}
            type="password"
            placeholder="Confirm Password"
          />
          <div>
            <input 
              type="radio"
              name="pro"
              value="pro"
              onChange={this.handleOptionChange} />
            <label htmlFor="pro">I'm a pro</label>

            <input 
              type="radio" 
              name="jobseeker"
              value="jobseeker" 
              onChange={this.handleOptionChange} />
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
      Don't have an account?
      {' '}
      <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>
  )
}

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};