/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(initialState || {});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
