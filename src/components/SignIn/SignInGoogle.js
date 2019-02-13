import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { Alert } from 'bootstrap-4-react';
import * as ROUTES from '../../constants/routes';
import * as ERRORS from '../../constants/errors';
import './SignIn.min.css';




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
        if (error.code === ERRORS.ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERRORS.ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

      event.preventDefault();
    };


    render() {
      const { error } = this.state;

      return (
        <div className="col mb-4">
          <button 
            className="btn btn-light btn-block"
            type="submit" 
            onClick={this.onSubmit}>
              Log in with Google
            </button>
          {error && <Alert danger>{error.message}</Alert>}
        </div>
      );
    }
}


const SignInGoogle = withRouter(withFirebase(SignInGoogleBase));

export default SignInGoogle;