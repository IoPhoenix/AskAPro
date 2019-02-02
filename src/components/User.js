import React from 'react';

const User = ({ user, index }) => 
    <div className="col-3">
        <img alt="User portrait" className="img-fluid rounded" src={`../../src/images/people/${index+1}.jpg`} />
        <h3><strong>{user.username}</strong></h3>
        <p>Position</p>
        <p>Company</p>
        <p>Introduction text about this user</p>
   </div>


export default User;