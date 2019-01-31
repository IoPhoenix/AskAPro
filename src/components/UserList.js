import React, { Component } from 'react';
import { withFirebase } from './Firebase';


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

            <Users users={users} target={this.props.target}/>
        </div>
      );
    }
}


const Users = ({ users, target }) => {
    console.log('From Users, target is: ', target);

    // show only job seekeres to pros and vice versa
    // otherwise show all users to admin
    if (target === 'pro') {
        users = users.filter(user => user.role === 'jobseeker');
    } else if (target === 'jobseeker') {
        users = users.filter(user => user.role === 'pro');
    } 

    return (
        <ul>
            {users.map(user => (
                <li key={user.uid}>
                    <span>
                    <strong>ID:</strong> {user.uid}
                    </span>
                    <span>
                    <strong>E-Mail:</strong> {user.email}
                    </span>
                    <span>
                    <strong>Username:</strong> {user.username}
                    </span>
                    <span>
                    <strong>Role:</strong> {user.role}
                    </span>
                </li>
                ))}
        </ul>
    )
}

export default withFirebase(UserList);