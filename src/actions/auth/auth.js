import { USER_LOGGED_IN } from '../../types/types';
import api from '../../api/api';

const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

const loginAPI = credentials => dispatch =>
  api.user.login(credentials).then(user => dispatch(userLoggedIn(user)));

export default {
  loginAPI
};
