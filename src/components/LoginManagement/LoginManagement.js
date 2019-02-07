import React, { Component } from 'react';
import { withFirebase } from '../Firebase';


const SIGN_IN_METHODS = [
    {
      id: 'password',
      provider: null,
    },
    {
      id: 'google.com',
      provider: 'googleProvider',
    },
    {
      id: 'facebook.com',
      provider: 'facebookProvider',
    }
];


  class LoginManagementBase extends Component {
    constructor(props) {
        super(props);
            this.state = {
                activeSignInMethods: [],
                error: null,
        };
    }

    componentDidMount() {
        this.fetchSignInMethods();
    }

    fetchSignInMethods = () => {

        // fetch all active sign-in methods for the user’s email address:
        this.props.firebase.auth
            .fetchSignInMethodsForEmail(this.props.authUser.email)
            .then(activeSignInMethods =>
                this.setState({ activeSignInMethods, error: null }),
            )
            .catch(error => this.setState({ error }));
    };

    onSocialLoginLink = provider => {};

    onUnlink = providerId => {};

    render() {
        const { activeSignInMethods, error } = this.state;

        // active methods can be deactivated and vice versa:
        return (
            <div>
                <p><strong>Sign In Methods:</strong></p>
                <ul>
                    {SIGN_IN_METHODS.map(signInMethod => {
                        const isEnabled = activeSignInMethods.includes(signInMethod.id);

                        return (
                            <li key={signInMethod.id}>
                                {isEnabled ? (
                                    <button type="button" onClick={() => {}}>
                                        Deactivate {signInMethod.id}
                                    </button>
                                ):(
                                    <button type="button" onClick={() => {}}>
                                       Activate {signInMethod.id} login
                                    </button>
                            )}
                            </li>
                        );
                    })}
                </ul>
                {error && error.message}
            </div>
        );
    }
}


const LoginManagement = withFirebase(LoginManagementBase);

export default LoginManagement;