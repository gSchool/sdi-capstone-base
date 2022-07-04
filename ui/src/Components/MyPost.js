import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const MyPost = () => {
  const params = useParams();
  const nav = useNavigate();
  const username = params.username;
  const id = params.post;

  console.log(params);
  const [post, setPost] = useState([])
  useEffect(() => {
    fetch(`${ApiUrl}/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data[0]))
      .then(console.log(post))
      .catch(err => console.log(err))
  }, []);

  return(
    <div className="background">
      <h1 className="blogTitle">BLOG</h1>
      <button className="signInButton" onClick={()=> {nav(`/profile/${username}`)}}>Return</button>
      <div className="IndvPosts" >
        <div className="viewPostsHeader">
          <h2 className="postHeader"><button className="signInButton"onClick={() => {nav(`/profile/${username}/edit/${id}`)}}>Edit</button><br/>{post.title}</h2>
        </div>
        <div className="postBodyContainer">
          <p className="indPostBody">{post.content}<p>@{username}</p><p>{post.date}</p></p>
        </div>
    </div>
    </div>
  )
}


export default MyPost;