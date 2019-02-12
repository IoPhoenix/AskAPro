import React from 'react';
import importAll from '../helpers';
import { AuthUserContext } from './Session';
const images = importAll(require.context('../images/people', false, /\.(png|jpe?g|svg)$/));



const UserItem = ({ user, index }) => 

    <div className="col-3 mt-5">
        <img alt="User portrait" className="img-fluid rounded" src={images[index + 1]} />
        <h3><strong>{user.username}</strong></h3>
        <p>Position at Company</p>
        <AuthUserContext.Consumer>
            {authUser => authUser ?
                <div className="d-flex justify-content-between">
                    <a href="#" className="btn btn-dark btn-sm">Profile</a>
                    <a href="#" className="btn btn-light btn-sm">Contact</a>
                    <a href="#" className="btn btn-danger btn-sm">♡ Save</a>
                </div> : <div>Some more info</div>
            }
        </AuthUserContext.Consumer>
   </div>

export default UserItem;
