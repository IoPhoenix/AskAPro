import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';


const UserItem = ({ user }) => 
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


export default UserItem;
