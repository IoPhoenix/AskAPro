import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import userAvatar from '../../images/icons/user.svg';
import './Profile.min.css';
import { Alert } from 'bootstrap-4-react';


// Route user to edit profile page after initial sign up
// so that user can provide more information
class EditProfileBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
          error: '',
          loading: false,
          user: null,
          ...props.location.state
        }
    }

    // fetch user from the Firebase database if
    // the /profile/:id link is entered in the browser directly
    // Otherwise, use auth user information from Navigation or Onboarding component
    componentDidMount() {
      console.log('From EditProfile, this.state before: ', this.state);

      // pass chosen role from Onboarding to user object:
      if (this.props.location.state && this.props.location.state.role) {
        this.setState({...this.state, role: this.props.location.state.role });
      }

      // if user info is already present, do not proceed
      if (this.state.user) {
        return;
      }

      this.setState({ loading: true });

      this.props.firebase
        .user(this.props.match.params.id)
        .on('value', snapshot => {
            this.setState({
              user: snapshot.val(),
              loading: false,
        });
      });

      console.log('From EditProfile, this.state after: ', this.state);
    }


    componentWillUnmount() {
      this.props.firebase.user(this.props.match.params.id).off();
    }

  
    onChange = event => {
      this.setState(Object.assign(this.state.user.details, { [event.target.name]: event.target.value }));
      console.log('[event.target.name]: ', [event.target.name], 'event.target.value: ', event.target.value);
    };

    onCheckboxChange = event => {
      this.setState(Object.assign(this.state.user.details, { [event.target.name]: event.target.checked }));
      console.log('[event.target.name]: ', [event.target.name], 'event.target.checked: ', event.target.checked);
    };

    onRoleChange = event => {
      this.setState(Object.assign(this.state.user, { role: event.target.value }));
      console.log('[event.target.name]: ', [event.target.name], 'event.target.value: ', event.target.value);
    }

    onSubmit = (event) => {
      const { firstName, lastName, city, state, zip, availability, status } = this.state.user.details;
      const { role } = this.state.user;

      console.log('this.state: ', this.state);

      const uid = this.props.firebase.auth.currentUser.uid;

      // send new data to firebase
      this.props.firebase.doSendUserDetails(uid, {
        firstName,
        lastName,
        availability,
        status,
        city,
        state,
        zip
      }, function(error) {
          if (error) {
            console.log('error sending data: ', error);
            this.setState({ error: 'Something went wrong. Please try again later' })
          } else {
            console.log('data saved successfully!');
          }
      });

      event.preventDefault();
    }


    render() {
      const { loading, error, user } = this.state; 

      return (
            <section className="fdb-block">
              <div className="container">
                <div className="row justify-content-center">

                    {loading && <div>Loading ...</div>}
                    
                    {user && (
                      <>
                        <div className="col col-md-8 text-center fdb-box fdb-touch">
                            <h1 className="mb-4">Edit profile</h1>
                            <img 
                              alt="Round user portrait" 
                              width="160" 
                              height="160" 
                              className="mb-4 img-fluid img-thumbnail rounded-circle fdb-box__image" 
                              src={userAvatar} />
                              <div className="form-group">
                                <label htmlFor="exampleFormControlFile1"><h5>Change profile photo</h5></label>
                                <input
                                  type="file"
                                  className="form-control-file fdb-box__avatar mx-auto" 
                                  name="avatar" 
                                  onChange={this.onChange} />
                              </div>
                        </div>

                        <div className="col col-md-8 fdb-box fdb-touch mt-5">
                            <h4 className="text-center mb-4">Personal details</h4>
                                <div className="form-row">
                                  <div className="form-group col-md-6">
                                    <label htmlFor="user-name">First Name*</label>
                                    <input 
                                      value={user.details.firstName}
                                      type="text" 
                                      className="form-control" 
                                      name="firstName" 
                                      id="user-name" 
                                      onChange={this.onChange} />
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label htmlFor="user-surname">Last Name*</label>
                                    <input 
                                      value={user.details.lastName}
                                      type="text" 
                                      className="form-control" 
                                      name="lastName" 
                                      id="user-surname" 
                                      onChange={this.onChange} />
                                  </div>
                                </div>

                                <div className="form-row">
                                  <div className="form-group col-md-6">
                                    <label htmlFor="inputCity">City</label>
                                    <input 
                                      value={user.details.city}
                                      type="text" 
                                      name="city" 
                                      className="form-control" 
                                      id="inputCity" 
                                      onChange={this.onChange}
                                      />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label htmlFor="inputState">State</label>
                                    <select 
                                        value={user.details.state}
                                        id="inputState" 
                                        name="state" 
                                        className="form-control" 
                                        onChange={this.onChange}>
                                        <option defaultValue="Choose">Choose...</option> 
                                        <option>California</option>
                                        <option>New York</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-md-2">
                                    <label htmlFor="inputZip">Zip</label>
                                    <input 
                                      value={user.details.zip}
                                      type="text" 
                                      name="zip" 
                                      className="form-control" 
                                      id="inputZip"  
                                      onChange={this.onChange} />
                                  </div>
                                </div>
                          </div>
                              
                        <div className="col col-md-8 fdb-touch fdb-box mt-5">
                          <h4 className="text-center mb-4">Current status</h4>
                          <div className="form-group">
                            <div className="form-check form-check-inline">
                              <input 
                                defaultChecked={user.role === 'jobseeker'}
                                className="form-check-input" 
                                type="radio" 
                                name="role" 
                                id="job-seeker" 
                                value="jobseeker"
                                onChange={this.onRoleChange}
                                aria-describedby="roleHelp" />
                              <label className="form-check-label" htmlFor="job-seeker">I am a job seeker</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                defaultChecked={user.role === 'pro'}
                                className="form-check-input"
                                type="radio"
                                name="role"
                                id="pro"
                                value="pro"
                                onChange={this.onRoleChange} 
                                aria-describedby="roleHelp" />
                              <label className="form-check-label" htmlFor="pro">I am a professional</label>
                            </div>
                            <small id="roleHelp" className="form-text text-muted">* You can change your role any time</small>
                        </div>

                        <div className="form-group mt-5">
                          <div className="form-check">
                            <input 
                              defaultChecked={user.details.availability}
                              className="form-check-input" 
                              name="availability" 
                              type="checkbox" 
                              id="user-availability" 
                              onChange={this.onCheckboxChange} />
                            <label className="form-check-label" htmlFor="user-availability">
                                Are you available for interviews? Your profile will be visible to others
                            </label>
                          </div>
                        </div>

                        <div className="form-group mt-5">
                          <label htmlFor="user-status"><h5>Shortly describe why are you here</h5></label>
                          <textarea 
                            value={user.details.status}
                            className="form-control" 
                            name="status"
                            id="user-status" 
                            rows="3" 
                            onChange={this.onChange} >
                          </textarea>
                        </div>
                        <button 
                          type="submit" 
                          className="btn fdb-box__btn fdb-box__btn--centered mb-4"
                          onClick={this.onSubmit}>
                            Submit
                        </button>

                        { error && <Alert danger>{error.message}</Alert>}
                      </div>
                      </>
                    )}
                </div>
            </div>
        </section>
     
        )
    }
}
  

const EditProfilePage = withFirebase(EditProfileBase);

// protect route with authorization rules
const condition = authUser => !!authUser;

export default withAuthorization(condition)(EditProfilePage);