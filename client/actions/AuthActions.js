import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { setAuthorizationToken } from '../utils/Authorization';
import * as Types from './types';

/**
 * signs user up for the application
 * @param {object} userDetails
 * @returns
 */

export const signup = user => ({
  type: Types.SIGNUP_USER,
  newUser: user
}); 
export const signupError = error => ({
  type: Types.SIGNUP_ERROR,
  error: error.message
});

export const registerAction = userDetails => dispatch => axios
  .post('/api/v1/users/signup', userDetails)
  .then((res) => {
    const token = res.data.Token;
    const currentUser = jwtDecode(token);
    setAuthorizationToken(token);
    window.localStorage.setItem('token', token);
    dispatch(signup(currentUser));
  })
  .catch((error) => {
    dispatch(signupError(error.response.data));
  });

