import React from 'react';
import { withFirebase } from './Firebase';

const SignOutButton = ({ firebase }) => (
  <button type="button" className="btn btn-outline-primary ml-md-3" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);