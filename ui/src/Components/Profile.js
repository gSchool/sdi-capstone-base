import React, { useContext, useEffect} from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";
import './CSS/Profile.css'

const Profile = () => {
  const {values, setters} = useContext(AppContext)
  const user = useParams();
  let username = user.username
  const nav = useNavigate();

  useEffect(() => {

    fetch('http://localhost:8082/users')
      .then(res => res.json())
      .then(data => setters.setUsers(data))
      .then(console.log(values.users))
      .catch(err => console.log(err))
    fetch('http://localhost:8082/posts')
      .then(res => res.json())
      .then(data => setters.setPosts(data))
      .then(console.log(values.posts))
      .catch(err => console.log(err))
  }, []);

  let getUserId = values.users.filter(item => item.username === username)
  let filteredBlogs = values.posts.filter(post => post.user_id === getUserId[0].id)
  console.log(getUserId[0])
  console.log(filteredBlogs)
  
  return(
    <div className="background">
      <h1 className="blogTitle">BLOG</h1>
      <button onClick={() => {nav('/')}}>Sign Out</button>
      <button onClick={() => {nav(`/publicfeed`)}}>Public Feed</button>
      <h1 className="profileHeader">Welcome, {user.username}!</h1>
        <div className="newPostContainer">
          <button className="myFeed" onClick={() => {nav(`/profile/${username}/create`)}}>Create New Post!</button>
        </div>
    <div>
      {filteredBlogs.map(post => (
      <div key={post.id}className="viewAllPosts" onClick={() => {nav(`/profile/${username}/${post.id}`)}}>
        <div className="viewPostsHeader">
          <h2 className="postHeader">{post.title}</h2>
        </div>
        <div className="postBodyContainer">
          <p className="postBody">{post.content}</p>
        </div>
      </div>))}
    </div>
    </div>
  )
}

export default Profile;