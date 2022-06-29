import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {

const [users, setUsers] = useState([]);
const nav = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8082/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .then(console.log(users))
      .catch(err => console.log(err))
  }, []);

  const signIn = (username, password) => {

    if(username === users[0].username && password === users[0].password) {
      console.log('correct!');
      nav(`/profile/1`)
    } else {
      console.log('wrong')
      nav('/signup')
    }
  }

  return(
    <>
      <h1>BLOG</h1>
      <h2>Log in!</h2>
      <input id="username" placeholder="username"></input>
      <input id="password" placeholder="password"></input>
      <button onClick={() => {signIn(document.getElementById('username').value, document.getElementById('password').value)}}>Sign in</button>
      <h2>No Account?</h2>
      <button onClick={() => {nav('/signup')}}>Sign up now!</button>
      {/* //if users contains corresponding username and password, sign in button will navigate to profile */}
    </>
  )
}

export default Landing;