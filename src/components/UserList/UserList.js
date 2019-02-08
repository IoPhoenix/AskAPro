import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
import UserItem from '../UserItem';
import './UserList.css';


// this components gets list of all users from database
class UserList extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        loading: false,
        users: []
      };
    }
  
    componentDidMount() {
        this.setState({ loading: true });

        //  use the users reference from Firebase class to attach a listener
        // on() method registers a continuous listener that triggers every time something has changed:
        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();

            const usersList = Object.keys(usersObject).map(key => (
                {
                    ...usersObject[key],
                    uid: key,
                }
            ));

            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }
    // remove the listener to avoid memory leaks:
    componentWillUnmount() {
        this.props.firebase.users().off();
    }

  
    render() {
        const { users, loading } = this.state;

      return (
        <div>
            {loading && <div>Loading ...</div>}

            <Users users={users} target={this.props.target} limit={this.props.limit}/>
        </div>
      );
    }
}


const Users = ({ users, target, limit }) => {
    let currentUsers = 'users';

    // show only job seekeres to pros and vice versa
    // otherwise show all users to admin
    if (target === 'pro') {
        currentUsers = 'jobseeker';
        users = users.filter(user => user.role === 'jobseeker');
    } else if (target === 'jobseeker') {
        currentUsers = 'pros';
        users = users.filter(user => user.role === 'pro');
    }

    // limit number of users for landing page
    if (limit) {
        users = users.slice(0, limit);
    }

    return (
        <section className="fdb-block team-4 user-list">
            <div className="container">
                <div className="row text-center justify-content-center">
                    <div className="col-8">
                    <h1>Available {currentUsers}</h1>
                    </div>
                </div>
            
                <div className="row">
                    <AuthUserContext.Consumer>
                        {authUser => authUser && authUser.isAdmin ? 
                            (   <table className="table">
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
                                        { users.map((user, index) =>
                                            <UserItem key={user.uid} user={user} index={index} authUser={authUser}/>
                                        )}
                                    </tbody>
                                </table>
                            ) : (
                                <>
                                    { users.map((user, index) => 
                                        <UserItem key={user.uid} user={user} index={index} authUser={authUser}/>
                                    )}
                                </>
                            )
                        }
                    </AuthUserContext.Consumer>
                </div>
            </div>
        </section>
    )
}


export default withFirebase(UserList);