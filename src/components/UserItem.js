import React from 'react';
import importAll from '../helpers';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const images = importAll(require.context('../images/people', false, /\.(png|jpe?g|svg)$/));


// show different layout and info for admin and non-admin
const UserItem = ({ user, index, authUser }) => 
        authUser && authUser.isAdmin ? 
            <AdminView user={user} /> : <UserView user={user} index={index} />

            

const UserView = ({ user, index }) => (
    <div className="col-3 mt-5">
        <img alt="User portrait" className="img-fluid rounded" src={images[index + 1]} />
        <h3><strong>{user.username}</strong></h3>
        <p>Position at Company</p>
        <div className="d-flex justify-content-between">
            <a href="#" className="btn btn-primary">Profile</a>
            <a href="#" className="btn btn-light">Contact</a>
            <a href="#" className="btn btn-danger">♡</a>
        </div>
   </div>
)

// show user in a table format
const AdminView = ({ user }) => (
    <tr>
        <td>{user.uid}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>  
            <Link to={{
                pathname: `${ROUTES.ADMIN}/${user.uid}`,
                state: { user }
            }}>Details</Link>
        </td>
    </tr>
        
)

export default UserItem;
