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

    // The componentDidMount() hook runs after the component
    // output has been rendered to the DOM. 
    componentDidMount() {
        // retrieve users from firabase
        db.onceGetUsers().then(snapshot => {
          this.setState(() => ({ users: snapshot.val() }))      
          this.state.users && console.log(this.state.users);
        });
      }

      componentWillUnmount() {}

      render() {
        const { users } = this.state;
        const listOfPros = [], listOfJobSeekers = [];

        // filter out users with different roles
        Object.keys(users).forEach(key => {
            if (users[key].role === 'pro') listOfPros.push(key);
            else listOfJobSeekers.push(key);
        });

        return (
            // show list of pros to job seekers
            // show list of job seekers to pros
            <AuthUserContext.Consumer>
            { authUser => (authUser.role === 'jobseeker' || authUser.role === null) ?
                <div className="pro-list">
                <h2>List of Pros</h2> 
                { listOfPros.map(key => 
                    <ul className="list list--inline list--users" key={key}>
                        <li>
                        { users[key].username }
                        </li>
                    </ul>)}
                </div>
                : 
                <div className="jobseeker-list">
                <h2>List of Job Seekers</h2> 
                { listOfJobSeekers.map(key => 
                    <ul className="list list--inline list--users" key={key}>
                        <li>
                        { users[key].username }
                        </li>
                    </ul>)}
                </div>
            }
            </AuthUserContext.Consumer>
        )
    }
}

export default UserList;