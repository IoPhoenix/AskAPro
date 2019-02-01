import React from 'react';
import { withFirebase } from './Firebase';
import { Button } from 'bootstrap-4-react';

const SignOutButton = ({ firebase }) => (
  <Button as="button" className="btn btn-outline-primary ml-md-3" onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);