import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import './Landing.css'

const Landing = () => {

const {values, setters} = useContext(AppContext);

const nav = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8082/users')
      .then(response => response.json())
      .then(data => setters.setUsers(data))
      .then(console.log(values.users))
      .catch(err => console.log(err))
  }, []);

  const signIn = (username, password) => {

    if(username === values.users[0].username && password === values.users[0].password) {
      console.log('correct!');
      nav(`/profile/${values.users[0].id}`);
    } else {
      console.log('wrong');
      nav('/signup');
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
    </div>
  )
}

export default Landing;