import React, { Component } from 'react';
import Validator from 'validator';
// import { render } from 'react-dom';
// import { Link } from 'react-router-dom';

/**
 *
 *
 * @class signUp
 * @extends {Component}
 */
class signUp extends Component {
  /**
   * Creates an instance of signUp.
   * @param {any} props
   * @memberof signUp
   */
  constructor(props) {
    super(props);
    this.state = {
      data: {
        full_name: '',
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
      },
      isLoading: false,
      errors: {}
    };
  }

  onChange = (e) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: [e.target.value] }
    });
  }
  /**
   *
   * @memberof signUp
   * @returns {void}
   */
  onSubmit() {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
  }

  validate(data) {
    const errors = {};
    if (!Validator.isEmail(data.email)) {
      errors.email = 'wrong email';
    }
    if (!data.password) {
      errors.password = 'cant be blank';
    }
    if (!data.full_name) {
      errors.full_name = 'Your full name is required';
    }
    if (!data.confirmpassword && data.confirmpassword !== data.password) {
      errors.confirmpassword = 'no match found';
    }
    return errors;
  }

  /**
   * render
   * @returns {void}
   */
  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <div className="navbar-wrapper">
          <div className="container-fluid">
            <nav className="navbar navbar-fixed-top">
              <div className="container">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                  <a className="navbar-brand" href="#"><i className="fa fa-th-list" /> More Recipes</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                  <ul className="nav navbar-nav pull-right">
                    <li className=""><a href="user/index.html">User Dashboard</a> </li>
                    <li className=""><a href="reviews.html">Top Recipes</a></li>
                    <li className=""><a href="user/index.html">Add  Recipe</a></li>
                    <li className=""><a href="favourite.html">My Favourites</a></li>
                    <li className=""><a href="#">About</a></li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>


        <div className="wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <div className="panel panel-login">
                  <div className="panel-heading">
                    <div className="row">
                      <div className="form-align">
                        <div className="col-xs-6">
                          <a href="reviews.html" className="active" id="login-form-link">Login</a>
                          <link to="" />
                        </div>
                        <div className="col-xs-6">
                          <a href="user/index.html" id="register-form-link">Register</a>
                        </div>
                      </div>
                      <hr />
                    </div>
                    <div className="panel-body">
                      <div className="row">
                        <div className="col-lg-12">
                          <form id="login-form" action="#" method="post" role="form" style={{ display: 'block' }} >
                            <div className="form-group">
                              <input type="text" name="username" id="username" tabIndex="-1" className="form-control" placeholder="Username/Email" value="" />
                            </div>
                            <div className="form-group">
                              <input type="password" name="password" id="password" tabIndex="-2" className="form-control" placeholder="Password" />
                            </div>
                            <div className="form-group text-center">
                              <input type="checkbox" tabIndex="-3" className="remember" name="remember" id="remember" />
                              <label htmlFor="remember"> Remember Me</label>
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-sm-6 col-sm-offset-3">
                                  <input type="submit" name="login-submit" id="login-submit" tabIndex="-4" className="form-control btn btn-login" value="Log In" />
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="text-center">
                                    <a href="#" tabIndex="-5" className="forgot-password">Forgot Password?</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                          <form
                            onSubmit={this.onSubmit}
                            id="register-form"
                            action="#"
                            method="post"
                            role="form"
                            style={{ display: 'none' }} >

                            <div className="form-group">
                              <div className="form-group">
                                <input
                                  onChange={this.onChange}
                                  type="text"
                                  name="full_name"
                                  id="full_name"
                                  tabIndex="-1"
                                  className="form-control"
                                  placeholder="Full Name"
                                  value={data.full_name}
                                />
                              </div>
                              <input
                                onChange={this.onChange}
                                type="text"
                                name="username"
                                id="username"
                                tabIndex="-1"
                                className="form-control"
                                placeholder="Username"
                                value={data.username}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                onChange={this.onChange}
                                type="email"
                                name="email"
                                id="email"
                                tabIndex="-1"
                                className="form-control"
                                placeholder="Email Address"
                                value={data.email}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                onChange={this.onChange}
                                type="password"
                                name="password"
                                id="password"
                                tabIndex="-2"
                                className="form-control"
                                placeholder="Password"
                                value={data.password}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                onChange={this.onChange}
                                type="password"
                                name="confirmpassword"
                                id="confirm-password"
                                tabIndex="-2"
                                className="form-control"
                                placeholder="Confirm Password"
                                value={data.confirmpassword}
                              />
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-sm-6 col-sm-offset-3">
                                  <input onSubmit={this.onSubmit} type="submit" name="register-submit" id="register-submit" tabIndex="-4" className="form-control btn btn-register" value="Register Now" />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="push" />
        <footer>
          <div className="container-fluid">
            <div className="copyrights">
              <p>© 2017 More Recipes. All Rights Reserved | created By  <a href="#" target="_blank">Fidelis Clinton</a> </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
export default signUp;
