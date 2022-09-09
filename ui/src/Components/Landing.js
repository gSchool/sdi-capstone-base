import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import './CSS/Landing.css';
import './CSS/global.css';
import Header from "./Header";
import bcrypt from 'bcryptjs';
import config from '../config';
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const Landing = () => {

const {values, setters} = useContext(AppContext);
const nav = useNavigate();

  useEffect(() => {
    fetch(`${ApiUrl}/users`)
      .then(res => res.json())
      .then(data => setters.setUsers(data))
      .then(console.log(values.users))
      .catch(err => console.log(err))
  }, []);

  const signIn = (username, password) => {
    let usernameFound = values.users.some(user => user.username === username)
    let user = values.users.filter(user => user.username === username)
    user = user[0]
    const correct = (bcrypt.compareSync(password, user.password))
    setters.setUser(user)
    if(usernameFound && correct) {
      console.log('correct!');
      nav(`/profile/${username}`);
    } else if(!usernameFound) {
      alert('You do not have an account!');
      nav('/signup');
    } else {
      alert('Your password is incorrect!');
    }
  }

  return(
    <div className="background">
    <div>
      <Header/>
      <h3 className="logIn">Log in!</h3>
      <div className="input1">
        <input id="username" placeholder="username"></input>
      </div>
      <div className="input2">
        <input id="password" type="password" placeholder="password"></input>
      </div>
      <div className="signIn">
        <button className="signInBtn" onClick={() => {signIn(document.getElementById('username').value, document.getElementById('password').value)}}>Sign in</button>
      </div>
      <h2 className="noAcct">No Account?</h2>
      <div className="noAcctDiv">      
        <button className="noAcctBtn" onClick={() => {nav('/signup')}}>Sign up now!</button>
        <p className="noAcct">OR</p>
        <button className="noAcctBtn" onClick={() => {nav('/publicfeed')}}>View Public Feed</button>
      </div>
    </div>
    </div>
  )
}

export default Landing;