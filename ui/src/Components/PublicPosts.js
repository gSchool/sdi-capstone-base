import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const PublicPosts = () => {
  const nav = useNavigate();
  const {values, setters} = useContext(AppContext);

  useEffect(() => {
    fetch(`${ApiUrl}/posts`)
    .then(res => res.json())
    .then(data => setters.setPosts(data))
    .then(console.log(values.posts))
    .catch(err => console.log(err))
  }, []);
  return(
    <div className="background">
      <h1 className="blogTitle">BLOG</h1>
      {values.posts.map(post => (
      <div key={post.id}className="viewAllPosts" onClick={()=> {nav(`/publicfeed/${post.id}`)}}>
        <div className="viewPostsHeader">
          <h2 className="postHeader">{post.title}</h2>
        </div>
        <div className="postBodyContainer">
          <p className="postBody">{post.content.length < 100 ? post.content : post.content.substring(0,100)+'...'}<p>{post.date}</p></p>
        </div>
      </div>))}
    </div>
  )
}

export default PublicPosts;