import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Alert } from 'bootstrap-4-react';



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


// allow user to manage sign in methods:
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

    // password from the child component is added to the authenticated user’s
    // email address:
    onDefaultLoginLink = password => {
        const credential = this.props.firebase.emailAuthProvider.credential(
            this.props.authUser.email, password
        );

        this.props.firebase.auth.currentUser
            .linkAndRetrieveDataWithCredential(credential)
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({ error }));
    };


    fetchSignInMethods = () => {

        // fetch all active sign-in methods for the user’s email address:
        this.props.firebase.auth
            .fetchSignInMethodsForEmail(this.props.authUser.email)
            .then(activeSignInMethods =>
                this.setState({ activeSignInMethods, error: null }),
            )
            .catch(error => this.setState({ error }));
    };

    onSocialLoginLink = provider => {
        this.props.firebase.auth.currentUser
            .linkWithPopup(this.props.firebase[provider])
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({ error }))
    };

    onUnlink = providerId => {
        this.props.firebase.auth.currentUser
            .unlink(providerId)
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({ error }));
    };


    render() {
        const { activeSignInMethods, error } = this.state;

        // active methods can be deactivated and vice versa
        // one logiin method should be left as active
        return (
            <div>
                <h4 className="mb-3">Manage login methods</h4>
                <div className="list-group">
                    {SIGN_IN_METHODS.map(signInMethod => {

                        const onlyOneLeft = activeSignInMethods.length === 1;
                        const isEnabled = activeSignInMethods.includes(signInMethod.id);

                        return (
                            
                            <div key={signInMethod.id} className="list-group-item">
                                {signInMethod.id === 'password' ? (
                                    <DefaultLoginToggle
                                        onlyOneLeft={onlyOneLeft}
                                        isEnabled={isEnabled}
                                        signInMethod={signInMethod}
                                        onLink={this.onDefaultLoginLink}
                                        onUnlink={this.onUnlink} />
                                ):(
                                    <SocialLoginToggle
                                        onlyOneLeft={onlyOneLeft}
                                        isEnabled={isEnabled}
                                        signInMethod={signInMethod}
                                        onLink={this.onSocialLoginLink}
                                        onUnlink={this.onUnlink} />
                                )}
                            </div>
                            
                        );
                    })}
                </div>
                {error && <Alert danger>{error.message}</Alert>}
            </div>
        );
    }
}

const SocialLoginToggle = ({
        onlyOneLeft,
        isEnabled,
        signInMethod,
        onLink,
        onUnlink,
    }) =>
        isEnabled ? (
            <button
                className="btn btn-primary btn-block"
                onClick={() => onUnlink(signInMethod.id)}
                disabled={onlyOneLeft}>
                    Deactivate login with {signInMethod.id}
            </button>
        ):(
            <button
                className="btn btn-primary btn-block"
                onClick={() => onLink(signInMethod.provider)}>
                    Activate login with {signInMethod.id}
            </button>
        );

        
// component for the default sign-in via email/password:
class DefaultLoginToggle extends Component {
    constructor(props) {
        super(props);
        this.state = { password: '', passwordConfirmed: '' };
    }
        
    onSubmit = event => {
        event.preventDefault();

        this.props.onLink(this.state.password);
        this.setState({ password: '', passwordConfirmed: '' });
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            onlyOneLeft,
            isEnabled,
            signInMethod,
            onUnlink,
        } = this.props;
        const { password, passwordConfirmed } = this.state;
        const isInvalid = password !== passwordConfirmed || password === '';

        return isEnabled ? (
            <button
                className="btn btn-primary btn-block"
                onClick={() => onUnlink(signInMethod.id)}
                disabled={onlyOneLeft} >
                    Deactivate login with {signInMethod.id}
            </button>
        ) : (
            <form onSubmit={this.onSubmit}>
                 <div className="form-row align-items-center">
                    <div className="col-auto">  
                        <input
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={this.onChange}
                            type="password"
                            placeholder="New Password" />
                    </div>
                    <div className="col-auto">
                        <input
                            className="form-control"
                            name="passwordConfirmed"
                            value={passwordConfirmed}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Confirm New Password" />
                    </div>
                    <div className="col">
                        <button
                            className="btn btn-primary btn-block mt-3"
                            disabled={isInvalid}
                            type="submit">
                                Submit
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

const LoginManagement = withFirebase(LoginManagementBase);

export default LoginManagement;