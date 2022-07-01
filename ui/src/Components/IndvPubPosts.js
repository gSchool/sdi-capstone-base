import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './CSS/IndvPubPosts.css'

const IndvPubPosts = () => {

  const params = useParams();
  const nav = useNavigate();
  const id = params.id

  const [post, setPost] = useState([])
  useEffect(() => {
    fetch(`http://localhost:8082/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data[0]))
      .then(console.log(post))
      .catch(err => console.log(err))
  }, []);

  return(
    <div className="background">
      <h1 className="blogTitle">BLOG</h1>
      <button onClick={()=> {nav(`/publicfeed`)}}>Return</button>
      <div className="IndvPosts" >
        <div className="viewPostsHeader">
          <h2 className="postHeader">{post.title}</h2>
        </div>
        <div className="postBodyContainer">
          <p className="indPostBody">{post.content}</p>
        </div>
    </div>
    </div>
  )
}

export default IndvPubPosts;