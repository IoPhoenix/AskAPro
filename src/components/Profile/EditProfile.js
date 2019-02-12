import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';


const INITIAL_STATE = {
    role: '',
    firstName: '',
    lastName: '',
    location: '',
    status: '',
    available: true
};


class EditProfileBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit() {
        // send new data to firebase
    }


    render() {
        return (
            <section className="fdb-block">
            <div className="container">
                <div className="row justify-content-center">
                    <AuthUserContext.Consumer>
                      { authUser => (
                        <>
                          <div className="col col-md-8 text-center fdb-box fdb-touch">
                              <h1 className="mb-3">Edit your profile</h1>
                              <img alt="Round user portrait" width="200" className="img-fluid img-thumbnail rounded-circle" src='' />
                          </div>
  
                          <div className="col col-md-8 fdb-box fdb-touch mt-5  text-center">
                                <div className="mb-4">
                                  <h5>Email:</h5> <span>Edit name</span>
                                </div>
                                <div className="mb-4">
                                  <h5>Role:</h5> <span>Edit role</span>
                                </div>
                                <div className="mb-4">
                                  <h5>Status:</h5> <em>Edit Status</em>
                                </div>
                          </div>
                                
                          <div className="col col-md-8 fdb-touch fdb-box mt-5">
                                <div className="team-5">
                                  <div className="row text-center justify-content-center">
                                    <div className="col-8 mb-4">
                                      <h4>Upload resume</h4>
                                    </div>
                                  </div>
  
                                <div className="row text-center justify-content-center">
                                  
                                </div> 
                               </div>
                            </div>
                        </>
                      )}
                    </AuthUserContext.Consumer>
                </div>
            </div>
        </section>
     
        )
    }
}
  

const EditProfile = withFirebase(EditProfileBase);

// protect route with authorization rules
const condition = authUser => !!authUser;

export default withAuthorization(condition)(EditProfile);