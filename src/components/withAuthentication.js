// import React from 'react';
// import AuthUserContext from './AuthUserContext';
// import { firebase } from '../firebase';

// const withAuthentication = (Component) => {
//   class WithAuthentication extends React.Component {
//     constructor(props) {
//         super(props);
  
//         this.state = {
//           authUser: null,
//         };
//       }
  
//     //  Once the authenticated user changes, it changes as well as the passed 
//     // value in the Provider component, and then also in the Consumer component
//     componentDidMount() {
//         firebase.auth.onAuthStateChanged(authUser => {
//             authUser
//             ? this.setState(() => ({ authUser }))
//             : this.setState(() => ({ authUser: null }));
//         });
//     }

//     render() {
//       const { authUser } = this.state;

//       // Provider component makes its value accessible
//       // to all the components below:
//       return (
//             <AuthUserContext.Provider value={authUser}>
//                 <Component />
//             </AuthUserContext.Provider>
//       );
//     }
//   }
//   return WithAuthentication;
// }

// export default withAuthentication;