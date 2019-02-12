import React from 'react';
import LoginManagement from '../LoginManagement/LoginManagement';
import { AuthUserContext, withAuthorization } from '../Session';


const AccountSetttingsPage = () => 
    <section className="fdb-block">
        <div className="container">
            <div className="row justify-content-center">
            <div className="col col-md-8 text-center fdb-box fdb-touch">
                <h1 className="mb-5">Settings</h1>
                <AuthUserContext.Consumer>
                    { authUser => (
                        <LoginManagement authUser={authUser} />
                    )}
                </AuthUserContext.Consumer>
            </div>
            </div>
        </div>
    </section>


// protect route with authorization rules:
const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountSetttingsPage);