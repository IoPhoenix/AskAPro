import React from 'react';


const User = ({ user, index }) => (
    <div className="col-3">
        <img alt="User portrait" className="img-fluid rounded" src={`../images/people/${index+1}.jpg`} />
        <h3><strong>{user.username}</strong></h3>
        <p>Position</p>
        <p>A wonderful serenity has taken possession of my entire soul.</p>
    </div>
    // <li key={user.uid}>
    //                 <span>
    //                 <strong>ID:</strong> {user.uid}
    //                 </span>
    //                 <span>
    //                 <strong>E-Mail:</strong> {user.email}
    //                 </span>
    //                 <span>
    //                 <strong>Username:</strong> {user.username}
    //                 </span>
    //                 <span>
    //                 <strong>Role:</strong> {user.role}
    //                 </span>
    //             </li>
)

export default User;