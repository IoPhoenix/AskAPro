// import React from 'react';
// import withAuthorization from './withAuthorization';
// import AuthUserContext from './AuthUserContext';
// import User from './User';

// class ProfilePage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//       email: '',
//       city: '',
//       state: '',
//       zip: ''
//     };
//   }

//   loadUser = (data) => {
//     this.setState({
//       name: data.username,
//       email: data.email
//     });
//   }


//   render() {
//     return (
//       <AuthUserContext.Consumer>
//         { authUser => 
//             <User uniqueId={authUser.uid} loadUser={this.loadUser} data={this.state}/>
//         }
//       </AuthUserContext.Consumer>
//     )
//   }
// }
  

  

// //protect /profile route with authorization rules
// const authCondition = (authUser) => !!authUser;

// export default withAuthorization(authCondition)(ProfilePage);