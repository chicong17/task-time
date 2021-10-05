import React, { useContext, createContext, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [loginSuccess, setLoginSuccess] = useState(
    localStorage.getItem('user') ? true : false
  );
  /** get all users in db */
  const getAllUsers = () => {
    return axios.get(`http://localhost:3001/users`);
  };

  /** save user account in localstorage */
  const saveOnLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setLoginSuccess(true);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setLoginSuccess(false);
  };

  const data = {
    name: 'dochicong',
    getAllUsers,
    saveOnLocalStorage,
    logout,
    loginSuccess,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};