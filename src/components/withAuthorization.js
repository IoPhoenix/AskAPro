// import React from 'react';
// import { withRouter } from 'react-router-dom';
// import { firebase } from '../firebase';
// import * as routes from '../constants/routes';

// // session handling higher order component:
// import AuthUserContext from './AuthUserContext';


// const withAuthorization = (authCondition) => (Component) => {
//   class WithAuthorization extends React.Component {

//     //componentDidMount() lifecycle method uses the Firebase listener 
//     // to trigger a callback function in case the authenticated 
//     // user object changes  
//     componentDidMount() {
//         firebase.auth.onAuthStateChanged(authUser => {
//             // if authorization fails, the higher order component
//             // redirects to the sign in page
//             if (!authCondition(authUser)) {
//               this.props.history.push(routes.SIGN_IN);
//             }
//         });
//     }

//     render() {
//       return (
//         <AuthUserContext.Consumer>
//           {authUser => authUser ? <Component /> : null}
//         </AuthUserContext.Consumer>
//       );
//     }
//   }  

//   return withRouter(WithAuthorization);
// }

// export default withAuthorization;