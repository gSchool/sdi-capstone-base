import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../AppContext";
import './CSS/SignUp.css';
import bcrypt from 'bcryptjs';
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const SignUp = () => {
  const nav = useNavigate();
  const {values, setters} = useContext(AppContext);
  const addUser = (first, last, username, password) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    console.log(password, salt)
    const newUser = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: first,
        last_name: last,
        username: username,
        password: hash
      })
    }
    fetch(`${ApiUrl}/users`, newUser)
    .then(res => res.json())
    .then(data => setters.setUsers(data))
    console.log(values.users)
    nav('/')
  }

  return(
    <div className="background">
      <h1 className="blogHeader">BLOG</h1>
      <h1 className="signUpHeader">Sign up today!</h1>
      <div className="form1">
        <input id="first" placeholder="First Name"></input>
      </div>
      <div className="form2">
        <input id="last" placeholder="Last Name"></input>
      </div>
      <div className="form3">
        <input id="username" placeholder="Username"></input>
      </div>
      <div className="form4">
        <input id="password" placeholder="Password"></input>
      </div>
      <div className="addUser">
        <button className="addUserButton" onClick={() => {addUser(document.getElementById('first').value, document.getElementById('last').value, document.getElementById('username').value, document.getElementById('password').value)}}>Sign Up!</button>
      </div>
    </div>
  )
}

export default SignUp