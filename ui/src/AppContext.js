import React, { useState } from "react";
const AppContext = React.createContext();
import propTypes from 'prop-types';
const AppProvider = ({ children }) => {

  const [users, setUsers] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: ''
  });

  const values = {
    users
  }

  const setters = {
    setUsers
  }

  return (
    <AppContext.Provider value={{values, setters}}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: propTypes.any
}

export { AppProvider, AppContext };