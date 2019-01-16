import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import SignUpPage from './components/pages/SignUpPage';
import ForgotPassword from './components/pages/ForgotPassword';

const App = () => (
  <div className="ui container">
    <Route path="/" exact component={HomePage} />
    <Route path="/login" exact component={LoginPage} />
    <Route path="/dashboard" exact component={DashboardPage} />
    <Route path="/signup" exact component={SignUpPage} />
    <Route path="/forgot_password" exact component={ForgotPassword} />
  </div>
);

export default App;
