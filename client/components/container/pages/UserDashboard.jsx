import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class UserDashboard extends Component {
  constructor(props) {
    super(props)

  }


  render() {
    return (
      <div>
        <div classNameName="container-fluid">
          <div classNameName="row">
            <div className="navbar navbar-inverse nav">
              <div className="navbar-inner">
                <div className="pull-left">
                  <a className="navbar-brand" href="#">
                    <i className="fa fa-th-list"></i> More Recipes
                        </a>
                </div>

                <div className="pull-right">
                  <ul className="nav pull-right">
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown">Welcome, clintfidel
                                <b className="caret"></b>
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a href="./../profile.html">
                            <i className="fa fa-user"></i> Profile
                                        </a>
                        </li>
                        <li>
                          <a href="./../index.html">
                            <i className="fa fa-users"></i> Logout
                                        </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div id="mynavbar" className="navbar-collapse collapse">
                  <ul className="nav navbar-nav pull-right">
                    <li className=""><a href="index.html">User Dashboard</a> </li>
                    <li className=""><a href="../reviews.html">Top Recipes</a></li>
                    <li className=""><a href="index.html">Add  Recipe</a></li>
                    <li className=""><a href="../favourite.html">My Favourites</a></li>
                    <li className=""><a href="#">About</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="profile-sidebar">

                <div className="profile-userpic">
                  <img src="https://images.vexels.com/media/users/3/131321/isolated/preview/76677f4f3eb3559fed4e7011f3d8d2a1-man-cartoon-head-3-by-vexels.png" className="img-responsive" alt="" />
                </div>

                <div className="profile-usertitle">
                  <div className="profile-usertitle-name">
                    Clint Fidel
                        </div>
                  <div className="profile-usertitle-job">
                    Andela Software Developer
                        </div>
                </div>
                <div className="profile-usermenu">
                  <ul className="nav">
                    <li>
                      <a href="favourite.html">
                        My Favourites </a>
                    </li>

                    <li>
                      <a href="profile.html">
                        View Profile </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        Add recipe </a>
                    </li>
                    <li>
                      <a href="profile.html">
                        Edit-Profile </a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
            <h3 className="text-center" style="font-family:Lobster; font-size: 30px; color:orangered; font-weight: bold;">VIEW RECIPES</h3>
            <div className="col-md-9">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xs-18 col-sm-6 col-md-3">
                    <div className="thumbnail">
                      <img src="../images/recipe3.jpg" />
                      <div className="caption">
                        <h4>FISH STEW RECIPES</h4>
                        <h5>By: clintfidel</h5>
                        <p>
                          <ol>
                            <li>pepper</li>
                            <li>tomatoes</li>
                            <li>enough fish</li>
                            <li>groundnut oil</li>
                            <li>water</li>
                          </ol>
                        </p>

                        <a href="#" className="btn btn-default btn-xs pull-right" role="button">
                          <i className="fa fa-heart-o" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="btn btn-succes btn-xs" role="button">15
                                        <i className="fa fa-thumbs-o-up btn btn-success" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="btn btn-danger btn-xs" role="button">5
                                        <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                  </div>
                  <div className="col-xs-18 col-sm-6 col-md-3">
                    <div className="thumbnail">
                      <img src="../images/recipe3.jpg" />
                      <div className="caption">
                        <h4>FISH STEW RECIPES</h4>
                        <h5>By: clintfidel</h5>
                        <p>
                          <ol>
                            <li>pepper</li>
                            <li>tomatoes</li>
                            <li>enough fish</li>
                            <li>groundnut oil</li>
                            <li>water</li>
                          </ol>
                        </p>
                        <a href="#" className="btn btn-default btn-xs pull-right" role="button">
                          <i className="fa fa-heart-o" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="btn btn-succes btn-xs" role="button">10
                                        <i className="fa fa-thumbs-o-up btn btn-success" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="btn btn-danger btn-xs" role="button">3
                                        <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                  </div>
                  <div className="col-xs-18 col-sm-6 col-md-3">
                    <div className="thumbnail">
                      <img src="../images/recipe3.jpg" />
                      <div className="caption">
                        <h4>FISH STEW RECIPES</h4>
                        <h5>By: clintfidel</h5>
                        <p>
                          <ol>
                            <li>pepper</li>
                            <li>tomatoes</li>
                            <li>enough fish</li>
                            <li>groundnut oil</li>
                            <li>water</li>
                          </ol>
                        </p>
                        <a href="#" className="btn btn-default btn-xs pull-right" role="button">
                          <i className="fa fa-heart-o" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="btn btn-succes btn-xs" role="button">5
                                        <i className="fa fa-thumbs-o-up btn btn-success" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="btn btn-danger btn-xs" role="button">7
                                        <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                  </div>
                  <div className="col-xs-18 col-sm-6 col-md-3">
                    <div className="thumbnail">
                      <img src="../images/recipe3.jpg" />
                      <div className="caption">
                        <h4>FISH STEW RECIPES</h4>
                        <h5>By: clintfidel</h5>
                        <p>
                          <ol>
                            <li>pepper</li>
                            <li>tomatoes</li>
                            <li>enough fish</li>
                            <li>groundnut oil</li>
                            <li>water</li>
                          </ol>
                        </p>
                        <a href="#" className="btn btn-default btn-xs pull-right" role="button">
                          <i className="fa fa-heart-o" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="btn btn-succes btn-xs" role="button">7
                                        <i className="fa fa-thumbs-o-up btn btn-success" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="btn btn-danger btn-xs" role="button">9
                                        <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                  </div>
                  <div className="col-xs-18 col-sm-6 col-md-3" />
                  <div className="thumbnail">
                    <img src="../images/recipe3.jpg" />
                    <div className="caption">
                      <h4>FISH STEW RECIPES</h4>
                      <h5>By: clintfidel</h5>
                      <p>
                        <ol>
                          <li>pepper</li>
                          <li>tomatoes</li>
                          <li>enough fish</li>
                          <li>groundnut oil</li>
                          <li>water</li>
                        </ol>
                      </p>
                      <a href="#" className="btn btn-default btn-xs pull-right" role="button">
                        <i className="fa fa-heart-o" aria-hidden="true"></i>
                      </a>
                      <a href="#" className="btn btn-succes btn-xs" role="button">
                        <i className="fa fa-thumbs-o-up btn btn-success" aria-hidden="true"></i>
                      </a>
                      <a href="#" className="btn btn-danger btn-xs" role="button">
                        <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                  <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
                <div className="col-xs-18 col-sm-6 col-md-3" />
                <div className="thumbnail">
                  <img src="../images/recipe3.jpg" />
                  <div className="caption">
                    <h4>FISH STEW RECIPES</h4>
                    <h5>By: clintfidel</h5>
                    <p>
                      <ol>
                        <li>pepper</li>
                        <li>tomatoes</li>
                        <li>enough fish</li>
                        <li>groundnut oil</li>
                        <li>water</li>
                      </ol>
                    </p>
                    <a href="#" className="btn btn-default btn-xs pull-right" role="button">
                      <i className="fa fa-heart-o" aria-hidden="true"></i>
                    </a>
                    <a href="#" className="btn btn-succes btn-xs" role="button">
                      <i className="fa fa-thumbs-o-up btn btn-success" aria-hidden="true"></i>
                    </a>
                    <a href="#" className="btn btn-danger btn-xs" role="button">
                      <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
              <div className="col-xs-18 col-sm-6 col-md-3">
                <div className="thumbnail">
                  <img src="../images/recipe3.jpg" />
                  <div className="caption">
                    <h4>FISH STEW RECIPES</h4>
                    <h5>By: clintfidel</h5>
                    <p>
                      <ol>
                        <li>pepper</li>
                        <li>tomatoes</li>
                        <li>enough fish</li>
                        <li>groundnut oil</li>
                        <li>water</li>
                      </ol>
                    </p>
                    <a href="#" className="btn btn-default btn-xs pull-right" role="button">
                      <i className="fa fa-heart-o" aria-hidden="true"></i>
                    </a>
                    <a href="#" className="btn btn-succes btn-xs" role="button">
                      <i className="fa fa-thumbs-o-up btn btn-success" aria-hidden="true"></i>
                    </a>
                    <a href="#" className="btn btn-danger btn-xs" role="button">
                      <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>

              <div className="col-xs-18 col-sm-6 col-md-3">
                <div className="thumbnail">
                  <img src="../images/recipe3.jpg" />
                  <div className="caption">
                    <h4>FISH STEW RECIPES</h4>
                    <h5>By: clintfidel</h5>
                    <p>
                      <ol>
                        <li>pepper</li>
                        <li>tomatoes</li>
                        <li>enough fish</li>
                        <li>groundnut oil</li>
                        <li>water</li>
                      </ol>
                    </p>
                    <a href="#" className="btn btn-default btn-xs pull-right" role="button">
                      <i className="fa fa-heart-o" aria-hidden="true"></i>
                    </a>
                    <a href="#" className="btn btn-succes btn-xs" role="button">
                      <i className="fa fa-thumbs-o-up btn btn-success" aria-hidden="true"></i>
                    </a>
                    <a href="#" className="btn btn-danger btn-xs" role="button">
                      <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>


        <center>
          <strong>Powered by
            <a href="http://github.com/clintfidel" target="_blank">ClintFidel</a>
          </strong>
        </center>
        <br />
      </div>)
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard)
