import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import UserItem from './UserItem';


// this components gets list of all users from database
class UserManagement extends Component {
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
        <section className="fdb-block team-4 user-list">
            <div className="container">
                <div className="row text-center justify-content-center">
                    <div className="col-8 mb-4">
                        { loading && <h1>Loading ...</h1> }

                        <h1>All users</h1>
                    </div>
                </div>
            
                <div className="row">
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
                            { users.map((user, index) =>
                                <UserItem key={user.uid} user={user} index={index} />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
      );
    }
}


export default withFirebase(UserManagement);