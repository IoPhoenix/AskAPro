import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { Alert } from 'bootstrap-4-react';
import * as ROUTES from '../../constants/routes';
import './SignIn.css';


const SignInPage = () => (
    <div>
      <SignInForm>
        <SignInGoogle />
        <SignInFacebook />
      </SignInForm>
    </div>
  );


const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

// if a user signs in with one of the social logins
// but there is already an account in the system 
// with this email address, the custom error message shows up
const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.`;


class SignInFormBase extends Component {
    constructor(props) {
      super(props);
  
      this.state = { ...INITIAL_STATE };
    }
  
    onSubmit = (event) => {
        const { email, password } = this.state;

        this.props.firebase
          .doSignInWithEmailAndPassword(email, password)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });
    
        event.preventDefault();
      };

      onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };


      render() {
        const { email, password, error } = this.state;
    
        const isInvalid =  password === '' ||
              email === '' ||
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
        return (
            <section className="fdb-block">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-md-8 col-lg-7 col-md-5 text-center">

                  <div className="row">
                    <div className="col">
                      <ul className="nav nav-tabs nav-fill">
                          <li className="nav-item">
                            <Link to={ROUTES.SIGN_UP} className="nav-link">Sign Up</Link>
                          </li>
                          <li className="nav-item">
                            <Link to={ROUTES.SIGN_IN} className="active nav-link">Log In</Link>
                          </li>
                        </ul>
                    </div>
                  </div>

                    <div className="fdb-box fdb-touch">
                      <div className="row">
                        <div className="col">
                          <h4 className="fdb-box_heading">Log in to your account</h4>
                        </div>
                      </div>
                      
                      <div className="row mt-4">
                        <div className="col">
                          <input 
                            name="email"
                            value={email}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Email Address"
                            className="form-control" />
                        </div>
                      </div>
                      <div className="row align-items-center mt-4">
                        <div className="col">
                          <input 
                            name="password"
                            value={password}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Password"
                            className="form-control mb-1" />
                        </div>
                      </div>

                      <div className="row align-items-center mt-2">
                        <div className="col">
                          <div className="custom-control custom-checkbox my-1 mr-sm-2">
                            <input type="checkbox" className="custom-control-input" id="remember-me" />
                            <label className="custom-control-label" htmlFor="remember-me">Remember me</label>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col">
                          <button 
                            disabled={isInvalid}
                            className="btn btn-primary mb-3 fdb-box_btn" 
                            type="button" 
                            onClick={this.onSubmit}>
                              Log In
                          </button>
                          
                          { error && <Alert danger>{error.message}</Alert>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </section>
        );
      }
}

class SignInGoogleBase extends Component {
      constructor(props) {
        super(props);

        this.state = { error: null };
      }

      onSubmit = event => {
        this.props.firebase
          .doSignInWithGoogle()
          .then(socialAuthUser => {

            console.log('From SignInGoogleBase, socialAuthUser: ', socialAuthUser);

            // create user in Firebase Realtime Database:
            return this.props.firebase
              .user(socialAuthUser.user.uid)
              .set({
                username: socialAuthUser.user.displayName,
                email: socialAuthUser.user.email
              });
        })
        .then(() => {
          this.setState({ error: null });
          this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
          if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
            error.message = ERROR_MSG_ACCOUNT_EXISTS;
          }

          this.setState({ error });
        });

        event.preventDefault();
      };


      render() {
        const { error } = this.state;

        return (
          <form onSubmit={this.onSubmit}>
            <button type="submit">Sign In with Google</button>
            {error && <p>{error.message}</p>}
          </form>
        );
      }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {

          // Create a user in Firebase Realtime Database:
        return this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.additionalUserInfo.profile.name,
            email: socialAuthUser.additionalUserInfo.profile.email
          });
        })
        .then(() => {
          this.setState({ error: null });
          this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        
        this.setState({ error });
      });

      event.preventDefault();
    };


    render() {
      const { error } = this.state;

      return (
        <form onSubmit={this.onSubmit}>
          <button type="submit">Sign In with Facebook</button>
            {error && <p>{error.message}</p>}
          </form>
        );
      }
}


const SignInForm = withRouter(withFirebase(SignInFormBase));
const SignInGoogle = withRouter(withFirebase(SignInGoogleBase));
const SignInFacebook = withRouter(withFirebase(SignInFacebookBase));


export default SignInPage;

export { 
    SignInForm,
    SignInGoogle,
    SignInFacebook
 };