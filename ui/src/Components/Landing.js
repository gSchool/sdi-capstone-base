import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import './CSS/Landing.css'
import bcrypt from 'bcryptjs';

const Landing = () => {

const {values, setters} = useContext(AppContext);
const nav = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8082/users')
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
      <h1 className="landingHeader">BLOG</h1>
      <h2 className="logIn">Log in!</h2>
      <div className="input1">
        <input id="username" placeholder="username"></input>
      </div>
      <div className="input2">
        <input id="password" placeholder="password"></input>
      </div>
      <div className="signIn">
        <button className="signInButton" onClick={() => {signIn(document.getElementById('username').value, document.getElementById('password').value)}}>Sign in</button>
      </div>
      <h2 className="noAcct">No Account?</h2>
      <div className="signUp">      
        <button className="signUpButton" onClick={() => {nav('/signup')}}>Sign up now!</button>
      </div>
      <button onClick={() => {nav('/publicfeed')}}>View Public Feed</button>
    </div>
  )
}

export default Landing;