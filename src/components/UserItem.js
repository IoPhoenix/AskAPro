import React from 'react';
import importAll from '../helpers';
import { Link } from 'react-router-dom';
import { AuthUserContext } from './Session';
import * as ROUTES from '../constants/routes';

const images = importAll(require.context('../images/people', false, /\.(png|jpe?g|svg)$/));


// show different layout and info for admin and non-admin
const UserItem = ({ user, index }) => 
    <AuthUserContext.Consumer>
        {authUser => authUser && authUser.isAdmin ? 
            (
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">UID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">isAdmin</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <AdminView user={user} />
                    </tbody>
                </table>
            ) : (
                    <UserView user={user} index={index} />
            )}
    </AuthUserContext.Consumer>



const UserView = ({ user, index }) => (
    <div className="col-3 mt-5">
        <img alt="User portrait" className="img-fluid rounded" src={images[index + 1]} />
        <h3><strong>{user.username}</strong></h3>
        <p>Position at Company</p>
        <Link to={ROUTES.PROFILE} className="btn btn-primary">See Profile</Link>
   </div>
)


const AdminView = ({ user }) => (
    <tr>
        <td>{user.uid}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>{user.isAdmin}</td>
        <td>  
            <Link to={{
                pathname: `${ROUTES.ADMIN}/${user.uid}`,
                state: { user }
            }}>Details</Link>
        </td>
    </tr>
        
)

export default UserItem;
