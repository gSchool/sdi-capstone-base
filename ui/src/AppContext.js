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

  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])

  const values = {
    users,
    user,
    posts
  }

  const setters = {
    setUsers,
    setUser,
    setPosts
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