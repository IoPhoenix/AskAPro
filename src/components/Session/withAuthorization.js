import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';


// higher-order component receives a component and a condition function.
// based on condition is decides if it should redirect to a public route 
const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {


        // use Firebase listener to trigger a callback function every time the authenticated user changes:
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
                if (authUser) {
                    this.props.firebase
                        .user(authUser.uid)
                        .once('value')
                        .then(snapshot => {
                            const dbUser = snapshot.val();

                            // default empty roles
                            if (!dbUser.roles) {
                                dbUser.roles = [];
                            }
                            // merge the authentication user and database user:
                            authUser = {
                                uid: authUser.uid,
                                email: authUser.email,
                                ...dbUser,
                            };

                        if (!condition(authUser)) {
                            this.props.history.push(ROUTES.SIGN_IN);
                        }
                        });
                    } else {
                        this.props.history.push(ROUTES.SIGN_IN);
                    }
                }
            );
        }

      componentWillUnmount() {
        this.listener();
      }
  
      render() {
        return (
            <AuthUserContext.Consumer>
                {authUser =>
                    condition(authUser) ? <Component {...this.props} /> : null
                }
            </AuthUserContext.Consumer>
        );
      }
    }

    // To redirect a user, the higher-order component has access
    //  to the history object of the Router using the in-house 
    // withRouter() higher-order component from the React Router library
    return withRouter(withFirebase(WithAuthorization));
};
    
export default withAuthorization;