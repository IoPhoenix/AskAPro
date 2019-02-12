import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import user from '../../images/people/1.jpg';
import './Profile.min.css';
import importAll from '../../helpers';

const images = importAll(require.context('../../images/people', false, /\.(png|jpe?g|svg)$/));



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
                            <h4>Current Location</h4>
                            <p>San Francisco, California</p>
                        </div>

                        <div className="col col-md-8 fdb-box fdb-touch mt-5  text-center">
                              <div className="mb-4">
                                <h5>Email:</h5> <span>{authUser.email}</span>
                              </div>
                              <div className="mb-4">
                                <h5>Role:</h5> <span>{authUser.role}</span>
                              </div>
                              <div className="mb-4">
                                <h5>Status:</h5> <em>"Seeking an advice for a front-end position at Google"</em>
                              </div>

                              <Link to={ROUTES.PROFILE_SETTINGS} className="btn fdb-box__btn mt-3">Edit</Link>
                        </div>
                              
                        <div className="col col-md-8 fdb-touch fdb-box mt-5">
                              <div className="team-5">
                                <div className="row text-center justify-content-center">
                                  <div className="col-8 mb-4">
                                    <h4>Your favourite pros</h4>
                                  </div>
                                </div>

                              <div className="row text-center justify-content-center">
                                <div className="col-sm-2 m-sm-auto">
                                  <img alt="Portrait" width="150" className="img-fluid rounded-circle" src={images[1]} />

                                  <h5 className="mt-2">Sara Doe</h5>
                                  <div className="d-flex align-items-start">
                                    <a href="#" className="btn btn-light btn-sm">6 messages</a>
                                    <a href="#" class="badge badge-pill badge-primary">1</a>
                                  </div>
                                </div>

                                <div className="col-sm-2 m-sm-auto">
                                  <img alt="Portrait" width="150" className="img-fluid rounded-circle" src={images[2]} />

                                  <h5 className="mt-2">Sara Doe</h5>
                                  <a href="#" className="btn btn-light btn-sm">2 messages</a>
                                </div>

                                <div className="col-sm-2 m-sm-auto">
                                  <img alt="Portrait" width="150" className="img-fluid rounded-circle" src={images[3]} />

                                  <h5 className="mt-2">Sara Doe</h5>
                                  <a href="#" className="btn btn-primary btn-sm">Contact</a>
                                </div>

                                <div className="col-sm-2 m-sm-auto">
                                  <img alt="Portrait" width="150" className="img-fluid rounded-circle" src={images[4]} />

                                  <h5 className="mt-2">Sara Doe</h5>
                                  <a href="#" className="btn btn-light btn-sm">3 messages</a>
                                </div>
                              </div> 
                             </div>
                          </div>
                      </>
                    )}
                  </AuthUserContext.Consumer>
              </div>
          </div>
      </section>


          

    //         <div classNameName="row pt-4 pt-xl-5">
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