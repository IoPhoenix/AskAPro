import React, { Component } from 'react';
import withAuthorization from './withAuthorization';
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
  return (
    // show list of pros to job seekers
    // show list of job seekers to pros
    // show these lists to both pros & job seekers?
    <div className="pro-list">
      <h2>List of Pros</h2>

      { Object.keys(users)
        .filter(key => users[key].role === 'pro')
        .map(key =>
          <div 
            className="pro" 
            key={key}>
              { users[key].username }
          </div>
        )}
    </div>
  )
}

//protect /home route with authorization rules
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);