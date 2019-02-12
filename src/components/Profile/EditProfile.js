import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';
import user from '../../images/icons/user.svg';
import './Profile.min.css';


const INITIAL_STATE = {
    role: '',
    avatar: '',
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    zipCode: '',
    status: '',
    available: true,
    error: ''
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
                              <h1 className="mb-4">Edit your profile</h1>
                              <img 
                                alt="Round user portrait" 
                                width="160" 
                                height="160" 
                                className="mb-4 img-fluid img-thumbnail rounded-circle fdb-box__image" 
                                src={user} />
                                <div className="form-group">
                                  <label for="exampleFormControlFile1"><h5>Change profile photo</h5></label>
                                  <input type="file" className="form-control-file fdb-box__avatar mx-auto" name="avatar" />
                                </div>
                          </div>
  
                          <div className="col col-md-8 fdb-box fdb-touch mt-5">
                              <h4 className="text-center mb-4">Personal details</h4>
                                  <div className="form-row">
                                    <div className="form-group col-md-6">
                                      <label for="user-name">First Name*</label>
                                      <input 
                                        type="text" 
                                        className="form-control" 
                                        name="firstName" 
                                        id="user-name" 
                                        onChange={this.onChange} />
                                    </div>
                                    <div className="form-group col-md-6">
                                      <label for="user-surname">Last Name*</label>
                                      <input 
                                        type="text" 
                                        className="form-control" 
                                        name="lastName" 
                                        id="user-surname" 
                                        onChange={this.onChange} />
                                    </div>
                                  </div>

                                  <div className="form-row">
                                    <div className="form-group col-md-6">
                                      <label for="inputCity">City</label>
                                      <input type="text" name="city" className="form-control" id="inputCity" />
                                    </div>
                                    <div className="form-group col-md-4">
                                      <label for="inputState">State</label>
                                      <select id="inputState" name="state" className="form-control">
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                      </select>
                                    </div>
                                    <div className="form-group col-md-2">
                                      <label for="inputZip">Zip</label>
                                      <input type="text" name="zipCode" className="form-control" id="inputZip" />
                                    </div>
                                  </div>
                            </div>
                                
                          <div className="col col-md-8 fdb-touch fdb-box mt-5">
                              <h4 className="text-center mb-4">Current status</h4>
                              <div className="form-group">
                                <div className="form-check form-check-inline">
                                  <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="role" 
                                    id="job-seeker" 
                                    value="jobseeker"
                                    onChange={this.onChange}
                                    aria-describedby="roleHelp" />
                                  <label className="form-check-label" htmlFor="job-seeker">I am a job seeker</label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="role"
                                    id="pro"
                                    value="pro"
                                    onChange={this.onChange} 
                                    aria-describedby="roleHelp" />
                                  <label className="form-check-label" htmlFor="pro">I am a professional</label>
                                </div>
                                <small id="roleHelp" className="form-text text-muted">*You might need to provide additional information depending on your role</small>
                              </div>

                              <div className="form-group mt-5">
                                <label for="user-status"><h5>Shortly describe why are you here</h5></label>
                                <textarea className="form-control" name="status" id="user-status" rows="3"></textarea>
                              </div>
    
                            </div>
                                  
                            {/* <button 
                              type="submit" 
                              className="btn btn-primary fdb-box__btn"
                              onClick={this.onSubmit}>
                                Submit
                            </button> */}
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