import React from 'react';
import importAll from '../helpers';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';


const images = importAll(require.context('../images/people', false, /\.(png|jpe?g|svg)$/));

const User = ({ user, index }) => 
    <div className="col-3 mt-5">
        <img alt="User portrait" className="img-fluid rounded" src={images[index + 1]} />
        <h3><strong>{user.username}</strong></h3>
        <p>Position at Company</p>
        <p>Introduction text about this user</p>
        <Link to={`${ROUTES.ADMIN}/${user.uid}`}>Details</Link>
        {/* <Link to={ROUTES.PROFILE} className="btn btn-primary">See Profile</Link> */}
   </div>


const UserItem = ({ match }) => (
    <div>
      <h2>User ({match.params.id})</h2>
    </div>
  );

  
export default User;