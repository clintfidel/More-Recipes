import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameError: '',
            passwordError: '',
            userExist: '',
            emailExist: '',
            isLoading: ''
          }
          this.onChange = this.onChange.bind(this)
          this.onSubmit = this.onSubmit.bind(this)
          
        }
      
        onChange(event) {
          const name = event.target.name,
          value = event.target.value
          this.setState({
            name: value
          })
        }
        onSubmit() {
          this.setState({
            isLoading:true
          })
        
        }
    
    render() {
        return (
            <div>
    <form
      id="login-form"
      style={{ display: 'block' }}
    >
      <div className="form-group">
        <input
        onChange= {this.onChange}
          type="text"
          name="username"
          id="username"
          className="form-control"
          placeholder="Username/Email"
          required
        />
      </div>
      <div className="form-group">
        <input
        onChange= {this.onChange}
          type="password"
          name="password"
          id="password"
          tabIndex="-2"
          className="form-control"
          placeholder="Password"
          required
        />
      </div>
      <div className="form-group text-center">
        <input
          type="checkbox"
          tabIndex="-3"
          className=""
          name="remember"
          id="remember"
        />
        <label htmlFor="remember">
          Remember Me
        </label>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <input
              type="submit"
              name="login-submit"
              id="login-submit"
              tabIndex="-4"
              className="form-control btn btn-login"
              value="Log In"
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <a href=" " tabIndex="-5" className="forgot-password">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
        );
    }
};

export default LoginForm;