import React from 'react';
import { withAuthorization } from './Session';

const AccountPage = () => (
    <div>
      <h1>Profile Page</h1>
    </div>
);

  
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
  

  

// protect /profile route with authorization rules
const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);