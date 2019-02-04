import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

// extract the session handling for the authenticated user to a separate higher-order component.
// This component cares about storing the merged user in the local state and
// distributing it to other components via React’s Context Provider component.
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = {
            authUser: JSON.parse(localStorage.getItem('authUser')),
        };
    }

    componentDidMount() {
        this.listener = this.props.firebase.onAuthUserListener(
            (authUser) => {
                localStorage.setItem('authUser', JSON.stringify(authUser));
                this.setState({ authUser });
            },
            () => {
                localStorage.removeItem('authUser');
                this.setState({ authUser: null });
            },
        );
    }

    componentWillUnmount() {
        this.listener();
    }

    render() {
        return (
            <AuthUserContext.Provider value={this.state.authUser}>
              <Component {...this.props} />
            </AuthUserContext.Provider>
        );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;