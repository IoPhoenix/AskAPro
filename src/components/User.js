import React from 'react';
import * as firebase from 'firebase';


const User = (props) => {

    // retrieve user data from realtime database
    firebase
        .database()
        .ref('/users/' + props.uniqueId)
        .once('value')
        .then(snapshot => props.loadUser(snapshot.val()))
        .catch(err => console.log(err));

    return (
        <div className="user-container">
            <p>User name: {props.data.name}</p>
            <p>User email: {props.data.email}</p>
        </div>
    )
}

export default User;