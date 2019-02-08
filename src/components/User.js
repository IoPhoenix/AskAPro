import React, { Component } from 'react';
import importAll from '../helpers';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { withFirebase } from './Firebase';

const images = importAll(require.context('../images/people', false, /\.(png|jpe?g|svg)$/));


const UserItem = ({ user, index }) => 
    <div className="col-3 mt-5">
        <img alt="User portrait" className="img-fluid rounded" src={images[index + 1]} />
        <h3><strong>{user.username}</strong></h3>
        <p>Position at Company</p>
        <p>Introduction text about this user</p>
        
        <Link to={{
            pathname: `${ROUTES.ADMIN}/${user.uid}`,
            state: { user }
        }}>Details</Link>
        {/* <Link to={ROUTES.PROFILE} className="btn btn-primary">See Profile</Link> */}
   </div>


class UserDetailsBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user: null,
            ...props.location.state,
        };
    }

    componentDidMount() {
        console.log('From UserDetails: this.state.user: ', this.state.user);

        if (this.state.user) {
            return;
        }

        this.setState({ loading: true });
        
        this.props.firebase
            .user(this.props.match.params.id)
            .on('value', snapshot => {
                this.setState({
                    user: snapshot.val(),
                    loading: false,
                });
            });
    }

    componentWillUnmount() {
        this.props.firebase.user(this.props.match.params.id).off();
    }

    render() {
        const { user, loading } = this.state;

        return (
            <div>
                <h2>User ({this.props.match.params.id})</h2>

                {loading && <div>Loading ...</div>}

                {user && (
                    <div>
                        <span>
                            <strong>ID:</strong> {user.uid}
                        </span>
                        <span>
                            <strong>E-Mail:</strong> {user.email}
                        </span>
                        <span>
                            <strong>Username:</strong> {user.username}
                        </span>
                    </div>
                )}
            </div>
        );
    }
}
  
const UserDetails = withFirebase(UserDetailsBase);

export default UserItem;

export {
    UserDetails
};