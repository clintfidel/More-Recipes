import { SIGNUP_ERROR, SIGNUP_USER } from '../actions/types';


const INITIAL_STATE = {
  user: { currentUser: {} },
  authenticated: false,
  error: ''
};

function AuthReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGNUP_USER:
      return { ...state, user: action.newUser, authenticated: true };
    case SIGNUP_ERROR:
      return { ...state, error: action.error, authenticated: false };
    default:
      return state;
  }
}

export default AuthReducer;
