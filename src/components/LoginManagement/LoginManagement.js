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

    onDefaultLoginLink = () => {
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
                <p><strong>Sign In Methods:</strong></p>
                <ul>
                    {SIGN_IN_METHODS.map(signInMethod => {

                        const onlyOneLeft = activeSignInMethods.length === 1;
                        const isEnabled = activeSignInMethods.includes(signInMethod.id);

                        return (
                            <div className="list-group">
                            {/* <li key={signInMethod.id}> */}
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
                            {/* </li> */}
                            </div>
                        );
                    })}
                </ul>
                {error && error.message}
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
                type="button"
                className="list-group-item list-group-item-action"
                onClick={() => onUnlink(signInMethod.id)}
                disabled={onlyOneLeft}>
                    Deactivate login with {signInMethod.id}
            </button>
        ):(
            <button
                type="button"
                className="list-group-item list-group-item-action"
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
                type="button"
                className="list-group-item list-group-item-action"
                onClick={() => onUnlink(signInMethod.id)}
                disabled={onlyOneLeft} >
                    Deactivate login with {signInMethod.id}
            </button>
        ) : (
            <form onSubmit={this.onSubmit}>
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="New Password" />
                <input
                    name="passwordConfirmed"
                    value={passwordConfirmed}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm New Password" />
                <button
                    className="btn btn-primary"
                    disabled={isInvalid}
                    type="submit">
                        Link {signInMethod.id}
                </button>
            </form>
        );
    }
}

const LoginManagement = withFirebase(LoginManagementBase);

export default LoginManagement;