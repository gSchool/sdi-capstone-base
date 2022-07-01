import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MyPost = () => {
  const params = useParams();
  const nav = useNavigate();
  const username = params.username;
  const id = params.post;

  console.log(params);
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
      <button onClick={()=> {nav(`/profile/${username}`)}}>Return</button>
      <div className="IndvPosts" >
        <div className="viewPostsHeader">
          <h2 className="postHeader"><button onClick={() => {nav(`/profile/${username}/edit/${id}`)}}>Edit</button><br/>{post.title}</h2>
        </div>
        <div className="postBodyContainer">
          <p className="indPostBody">{post.content}</p>
        </div>
    </div>
    </div>
  )
}


export default MyPost;