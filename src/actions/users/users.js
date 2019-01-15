import api from '../../api/api';
import { USER_LOGGED_IN } from '../../types/types';

const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

const signUpAPI = data => dispatch =>
  api.user.signUp(data).then(user => dispatch(userLoggedIn(user)));

export default {
  signUpAPI
};
