import React from 'react';
import {UserContext} from '../contexts/User';

export const useUser = () => {
  const {
    isLogged,
    changeType,
    onLoginSuccess,
    onLogoutSuccess,
    user,
    setUser,
    userType,
  } = React.useContext(UserContext);
  return {
    isLogged,
    changeType,
    onLoginSuccess,
    user,
    setUser,
    onLogoutSuccess,
    userType,
  };
};
