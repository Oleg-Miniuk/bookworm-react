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

const resetPasswordRequestAPI = data => () =>
  api.user.resetPasswordRequest(data);

export const validateToken = token => () => api.user.validateToken(token);

export const resetPassword = data => () => api.user.resetPassword(data);

export default {
  loginAPI,
  logoutAPI,
  resetPasswordRequestAPI
};
