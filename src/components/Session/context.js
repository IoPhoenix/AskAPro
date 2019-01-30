// use React Context API to pass down the authenticated user to any component 

import React from 'react';

const AuthUserContext = React.createContext(null);

export default AuthUserContext;