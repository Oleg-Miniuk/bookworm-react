import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../../types/types';
import api from '../../api/api';

const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

const loginAPI = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
  });

const logoutAPI = () => dispatch => {
  localStorage.bookwormJWT = '';
  dispatch(userLoggedOut());
};

export default {
  loginAPI,
  logoutAPI
};
