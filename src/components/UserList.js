import React from 'react';
import AuthUserContext from './AuthUserContext';
import { db } from '../firebase';


class UserList extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        users: null,
      };
    }

    // Invoked once, both on the client and server, immediately
    //  before the initial rendering occurs. If you call setState 
    // within this method, render() will see the updated state and 
    // will be executed only once despite the state change 
    componentWillMount() {
        // retrieve users from firabase
        db.onceGetUsers().then(snapshot => {
          this.setState(() => ({ users: snapshot.val() }))      
          console.log('componentWillMount: ', this.state.users);
        });
    }

      displayListOfUsers = (arrayOfUsers) => {
        const { limit } = this.props;

        // limits number of showed pros on landing page
        if (limit) arrayOfUsers = arrayOfUsers.slice(0, limit);

        return arrayOfUsers.map(key =>
            <ul className="list list--inline list--users" key={key}>
                <li>
                { this.state.users[key].username }
                </li>
            </ul>
        );
      }

      render() {
        const { users } = this.state;
        const listOfPros = [], listOfJobSeekers = [];

        console.log('render: ', this.state.users);

        // filter out users with different roles
        if (users) {
            Object.keys(users).forEach(key => {
                if (users[key].role === 'pro') listOfPros.push(key);
                else listOfJobSeekers.push(key);
            });
        }

        const prosList =
            <div className="pro-list">
                <h2>List of Pros</h2> 
                { this.displayListOfUsers(listOfPros) }
            </div>;

        const jobseekersList = 
            <div className="jobseeker-list">
                <h2>List of Job Seekers</h2> 
                { this.displayListOfUsers(listOfJobSeekers)}
            </div>;


        return (
            // show list of pros to job seekers
            // show list of job seekers to pros
            // show limited list of pros on home page to everyone when no user is logged in
            <AuthUserContext.Consumer>
                { authUser => authUser === null ? prosList :
                            authUser.role === 'pro' ? prosList : jobseekersList }
            </AuthUserContext.Consumer>
        )
    }
}

export default UserList;