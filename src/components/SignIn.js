import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { SignUpLink } from './SignUp';
import { withFirebase } from './Firebase';
import { Alert } from 'bootstrap-4-react';
import * as ROUTES from '../constants/routes';


const SignInPage = () => (
    <div>
      <SignInForm>
        <SignUpLink />
      </SignInForm>
    </div>
  );


const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
      super(props);
  
      this.state = { ...INITIAL_STATE };
    }
  
    onSubmit = (event) => {
      console.log('Sign in button was clicked!');

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
                    <div className="fdb-box fdb-touch">
                      <div className="row">
                        <div className="col">
                          <h1>Log In</h1>
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

                            { this.props.children}

                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col">
                          <button 
                            disabled={isInvalid}
                            className="btn btn-primary mb-3" 
                            type="button" 
                            onClick={this.onSubmit}>
                              Submit
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

const SignInLink = () => {
  return (
    <div className="col-6">
      <p className="text-right">
        <Link to={ROUTES.SIGN_IN}>Already have an account?</Link>
      </p>
    </div>
  )
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;

export { 
    SignInForm,
    SignInLink
 };