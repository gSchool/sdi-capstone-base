import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './CSS/global.css';
import config from '../config';
import Header from "./Header";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const IndvPubPosts = () => {

  const params = useParams();
  const nav = useNavigate();
  const id = params.id

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
      <Header/>
      <button className="signInButton" onClick={()=> {nav(`/publicfeed`)}}>Return</button>
      <div className="IndvPosts" >
        <h2 className="postHeader">{post.title}</h2>
        <p className="postBody">{post.content}<p>{post.date}</p></p>
      </div>
    </div>
  )
}

export default IndvPubPosts;