import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';


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
            <div className="container mt-5">
                <h2 className="mb-4">Manage User</h2>

                {loading && <div>Loading ...</div>}

                {user && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">UID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.uid}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td><a href="#" className="btn btn-light btn-sm">Change</a></td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}
  

const UserDetails = withFirebase(UserDetailsBase);
const condition = authUser => authUser && authUser.isAdmin === true;

export default withAuthorization(condition)(UserDetails);