import React, { Component} from 'react';
import { withAuthorization } from '../Session';
import { Jumbotron } from 'bootstrap-4-react';
import { Alert } from 'bootstrap-4-react';
// import * as ROUTES from '../../constants/routes';


class Onboarding extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
          role: '',
          error: ''
      }
    }
  
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log('[event.target.name]: ', [event.target.name], 'event.target.value: ', event.target.value);
    };

    onSubmit = event => {

        event.preventDefault();
    }

    render() {
        const { error } = this.state;

        return (
            <div className="container">
                <Jumbotron className="mt-5">
                    <h1>Welcome!</h1>
                    <h4>Thank you for signing up! Please provide personal information 
                    so we could match you with relevant users</h4>
                </Jumbotron>
                
                <section className="fdb-block">
                    <div className="row justify-content-center">
                        <div className="col col-md-8 text-center fdb-box fdb-touch">
                            <h4 className="text-center mb-4">Please select your role</h4>
                            <form onSubmit={this.onSubmit}>
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
                                    <small id="roleHelp" className="form-text text-muted">* You can change your role later</small>
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn fdb-box__btn fdb-box__btn--centered mb-4" >
                                        Next
                                    </button>
                                { error && <Alert danger>{error.message}</Alert>}
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Onboarding);
