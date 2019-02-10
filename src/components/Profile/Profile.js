import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import user from '../../images/people/1.jpg';
import './Profile.css';


const ProfilePage = () => (

    <section className="fdb-block">
          <div className="container">
              <div className="row justify-content-center">
                  <AuthUserContext.Consumer>
                    { authUser => (
                      <>
                        <div className="col col-md-8 text-center fdb-box fdb-touch">
                            <img alt="Round user portrait" width="200" className="img-fluid img-thumbnail rounded-circle" src={user} />
                            <h1 className="mb-3">{authUser.username}</h1>
                            <h5>Current Location:</h5>
                            <p>San Francisco, California</p>
                        </div>

                        <div className="col col-md-8 fdb-box">
                              <div>
                                <h5 className="d-inline">Email:</h5> <span>{authUser.email}</span>
                              </div>
                              <div>
                                <h5 className="d-inline">Status:</h5> <em>"Seeking an advice for a front-end position at Google"</em>
                              </div>

                              <Link to={ROUTES.PROFILE_SETTINGS} className="btn fdb-box__btn mt-3">Edit</Link>

                              <hr />
                        </div>

                      </>
                    )}
                  </AuthUserContext.Consumer>
              </div>
          </div>
      </section>


          

    //         <div className="row pt-4 pt-xl-5">
    //           <div className="col-12 col-md-5">
    //           <Link to={ROUTES.HOME} className="btn btn-primary">Browse professionals</Link>
    //           </div>
    //           <div className="col-12 col-md-5 m-auto pt-3 pt-md-0">
    //               <a href="#" className="btn btn-dark">Check your messages</a>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col-12 col-md-8 col-lg-6 m-auto mr-lg-0 ml-lg-auto pt-5 pt-lg-0">
    //         <img alt="Large user portrait" className="img-fluid" src={user} />
    //       </div>
    //     </div>
    //   </div>
    // </section>
  )


// protect /profile route with authorization rules
const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProfilePage);