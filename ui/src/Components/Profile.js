import React, { useContext, useEffect} from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";
import './CSS/Profile.css';
import './CSS/global.css';
import Header from "./Header";
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const Profile = () => {
  const {values, setters} = useContext(AppContext)
  const user = useParams();
  let username = user.username
  const nav = useNavigate();

  useEffect(() => {

    fetch(`${ApiUrl}/users`)
      .then(res => res.json())
      .then(data => setters.setUsers(data))
      .then(console.log(values.users))
      .catch(err => console.log(err))
    fetch(`${ApiUrl}/posts`)
      .then(res => res.json())
      .then(data => setters.setPosts(data))
      .then(console.log(values.posts))
      .catch(err => console.log(err))
  }, []);

  let getUserId = values.users.filter(item => item.username === username)
  let filteredBlogs = values.posts.filter(post => post.user_id === getUserId[0].id)
  
  return(
    <div className="background">
      <Header/>
      <div className="profileButtons">
        <button className="profile" onClick={() => {nav('/')}}>Sign Out</button>
        <button className="profile" onClick={() => {nav(`/publicfeed`)}}>Public Feed</button>
      </div>
      <h2 className="profileHeader">Welcome, {user.username}!</h2>
        <div className="newPostContainer">
          <button className="newPostButton" onClick={() => {nav(`/profile/${username}/create`)}}>Create New Post!</button>
        </div>
      <div>
        {filteredBlogs.map(post => (
        <div key={post.id} className="viewAllPosts" onClick={() => {nav(`/profile/${username}/${post.id}`)}}>
          <div className="viewPostsHeader">
            <h2 className="postHeader">{post.title}</h2>
          </div>
          <div className="postBodyContainer">
            <p className="postBody">{post.content.length < 100 ? post.content : post.content.substring(0,100)+'...'}<p>@{username}</p><p>{post.date}</p></p>
          </div>
        </div>))}
      </div>
    </div>
  )
}

export default Profile;