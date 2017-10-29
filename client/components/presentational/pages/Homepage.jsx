import React from 'react';
import NavBar from '../includes/NavBar';
import LoginForm from '../../container/auth/LoginForm';
import SignUpForm from '../../container/auth/SignUpForm';
import Footer from '../includes/Footer';

const Homepage = () => (
  <div>
    <NavBar />
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
                    </div>
                    <div className="col-xs-6">
                      <a href="user/index.html" id="register-form-link">Register</a>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-12" />
                    <LoginForm />
                    <SignUpForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="push" />
    <Footer />
  </div>
);

export default Homepage;
