import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../AppContext";
import './Profile.css'

const Profile = () => {
const {values, setters} = useContext(AppContext)
const user = useParams();

useEffect(() => {
  fetch('http://localhost:8082/posts')
    .then(response => response.json())
    .then(data => setters.setPosts(data))
    .then(console.log(values.posts))
    .catch(err => console.log(err))
}, []);

  return(
    <div className="background">
      <h1 className="profileHeader">Welcome, {user.username}!</h1>
    <div>
      <div className="viewAllPosts"></div>
      <h2>{values.posts[0].title}</h2>
      <p>{values.posts[0].content}</p>
    </div>
    </div>
  )
}

export default Profile;