import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './CSS/PrivPosts.css'
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const PrivPost = () => {
  const params = useParams();
  const nav = useNavigate();
  const id = params.post
  const username = params.username
  const [post, setPost] = useState([])
  
  useEffect(() => {
    fetch(`${ApiUrl}/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data[0]))
      .then(console.log(post))
      .catch(err => console.log(err))
  }, []);

  const editPost = (title, content) => {
    if(confirm('Ready to submit?')) {
      const updated = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: title,
          content: content,
        })
      }
      fetch(`${ApiUrl}/posts/${id}`, updated)
      .then(res => res.json)
      .then(data => setPost(data))
      nav(`/profile/${username}`)
      }
  }

  const deletePost = () => {
      const deleted = {
        method: 'DELETE'
      }
      fetch(`${ApiUrl}/posts/${id}`, deleted)
      .then(res => res.json)
      .then(data => console.log(data))
      nav(`/profile/${username}`)
  }

  return(
    <div className="background">
      <h1 className="blogTitle">BLOG</h1>
      <button className="signInButton" onClick={()=> {nav(`/profile/${username}`)}}>Return</button>
      <div className="IndvPosts">
      <div className="encapped">
          <button className="signInButton" onClick={() =>{deletePost()}}>Delete</button>
      </div>
        <div className="viewPostsHeader">
          <textarea className="postHeader" defaultValue={post.title} id="titleInput"/>
        </div>
        <div className="postBodyContainer">
          <textarea className="indPostBody" defaultValue={post.content} id="contentInput"/>
        </div>
        <div className="postBodyContainer">
          <button className="signInButton" onClick={() => {editPost(document.getElementById('titleInput').value, document.getElementById('contentInput').value)}}>Submit Edits</button>
        </div>
    </div>
    </div>
  )
}

export default PrivPost;