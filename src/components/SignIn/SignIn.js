import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import SignInFacebook from './SignInFacebook';
import SignInGoogle from './SignInGoogle';
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
                          <h4 className="fdb-block_heading">Log in to your account</h4>
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

                      <div className="row mt-2">
                        <div className="col">
                          <button 
                            disabled={isInvalid}
                            className="btn btn-primary mb-2 fdb-block_btn" 
                            type="button" 
                            onClick={this.onSubmit}>
                              Log In
                          </button>
                          
                          { error && <Alert danger>{error.message}</Alert>}
                        </div>
                      </div> {/* /.row */}

                      <div className="row align-items-center mt-4">
                        <div className="col">
                          <p className="fdb-block_divider">or</p>

                          <div className="row">
                            { this.props.children }
                          </div>
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


const SignInForm = withRouter(withFirebase(SignInFormBase));


export default SignInPage;

export { 
    SignInForm,
    SignInGoogle,
    SignInFacebook
 };