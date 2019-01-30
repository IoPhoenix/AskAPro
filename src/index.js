// source code: https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/#react-router-setup

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';

import registerServiceWorker from './registerServiceWorker';


// Firebase is only instantiated once and it is injected
//  via React’s Context API to React’s component tree
ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>,
    document.getElementById('root')
  );
  
registerServiceWorker();
