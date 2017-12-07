import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerAction } from '../../../actions/AuthActions';

class SignUpForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fullName: '',
      username: '',
      password: '',
      email: '',
      usernameError: '',
      passwordError: '',
      passwordConfirm: '',
      emailError: '',
      userExist: '',
      emailExist: '',
      isLoading: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onFocus = this.onFocus.bind(this)
  }

  onChange(event) {
    const name = event.target.name,
    value = event.target.value
    this.setState({
      [name]: value
    })
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.registerAction(this.state)
    this.setState({
      isLoading:true
    })
  }
  onFocus(event) {
    const name = event.target.name,
    value = event.target.value
    switch(name) {
      case 'username':
            this.setState({ usernameError: ''})
          break;
      case 'password': 
            this.setState({ passwordError: ''})
          break;
      case 'email':
            this.setState({ emailError: ''})
          break;
      case 'confirmPassword':
            this.setState({passwordConfirm: ''})
    }
  }
  onBlur(event) {
    const name = event.target.name,
    value = event.target.value,
    password = document.getElementById('password').value
    
    switch(name) {
      case 'username':
          if(value.length < 5) {
            this.setState({ usernameError: 'Username should be more than 5 letters'})
          }
         
          break;
      case 'password': 
          if(value.length < 5) {
            this.setState({ passwordError: 'Password should be more than 5 characters'})
          }
         
          break;
      case 'email': 
          
          if(!(value.endsWith('.com') && /@/.test(value))) {
            this.setState({ emailError: 'invalid email'})
          }
         
          break;
      case 'confirmPassword':
          if(value !== this.state.password) {
            this.setState({passwordConfirm: 'Password does not match'})
          }
         
    }
  }
  render () {
    console.log(this.props.AuthReducer, '===')
    return (
      <div>
      <form
        id="register-form"
        style={{ display: 'none' }}
        onSubmit={this.onSubmit}
      >
        <div className="form-group">
          <div className="form-group">
            <input
            onChange={this.onChange}
              type="text"
              name="fullName"
              id="fullName"
              tabIndex="-1"
              className="form-control"
              placeholder="Full Name"
              required
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
            onBlur= {this.onBlur}
            onFocus= {this.onFocus}
            required
          />
          <div style = {{color: 'red'}}>{this.state.usernameError}</div>
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
            onBlur={this.onBlur}
            onFocus= {this.onFocus}
            required
          />
          <div style = {{color: 'red'}}>{this.state.emailError}</div>
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
            onBlur={this.onBlur}
            onFocus= {this.onFocus}
            required
          />
          <div style = {{color: 'red'}}>{this.state.passwordError}</div>
        </div>
        <div className="form-group">
          <input
            onChange={this.onChange}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            tabIndex="-2"
            className="form-control"
            placeholder="Confirm Password"
            onBlur={this.onBlur}
            onFocus= {this.onFocus}
            required
          />
          <div style = {{color: 'red'}}>{this.state.passwordConfirm}</div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <input
                type="submit"
                name="registerSubmit"
                tabIndex="-4"
                className="form-control btn btn-register"
                value="Register Now"
              />
              <div className="text-center">
              <a href=" " tabIndex="-5" className="SignIn">Already have an accout?SignIn</a>
            </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    )
}
};

const mapStateToProps = (state) => {
  return {
    authReducer: state.AuthReducer
  }
}

export default connect(mapStateToProps, { registerAction })(SignUpForm);
