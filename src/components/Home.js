import React, { Component } from 'react';
import withAuthorization from './withAuthorization';
import AuthUserContext from './AuthUserContext';
import { db } from '../firebase';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot => {
      this.setState(() => ({ users: snapshot.val() }))      
    });
  }


  render() {
    const { users } = this.state;

    return (
      <div>
        <h1>Home Page</h1>
        { !!users && <UserList users={users} /> }
      </div>
    );
  }
}

const UserList = ({ users }) => {
    const listOfPros = [], listOfJobSeekers = [];

    // filter out users with different roles
    Object.keys(users).forEach(key => {
      if (users[key].role === 'pro') listOfPros.push(key);
      else listOfJobSeekers.push(key);
    });

  return (
    // show list of pros to job seekers
    // show list of job seekers to pros
    // show these lists to both pros & job seekers?
      <AuthUserContext.Consumer>
        { authUser => authUser.role === 'jobseeker' ?
          <div className="pro-list">
            <h2>List of Pros</h2> 
            { listOfPros.map(key => <div className="pro" key={key}>{ users[key].username } </div>)}
          </div>
           : 
           <div className="jobseeker-list">
            <h2>List of Job Seekers</h2> 
            { listOfJobSeekers.map(key => <div className="pro" key={key}>{ users[key].username } </div>)}
          </div>
        }
      </AuthUserContext.Consumer>
  )
}

//protect /home route with authorization rules
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);