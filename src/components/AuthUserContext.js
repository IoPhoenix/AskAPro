import React from 'react';

//create the context object by using React’s context API
// the authenticated user should be null in the beginning
const AuthUserContext = React.createContext(null);

export default AuthUserContext;