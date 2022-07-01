import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../AppContext";

const CreatePost = () => {

  const params = useParams();
  const nav = useNavigate();
  const username = params.username
  const {values, setters} = useContext(AppContext);
  
  useEffect(() => {
    fetch(`http://localhost:8082/users/`)
      .then(res => res.json())
      .then(data => setters.setUsers(data))
      .then(console.log(values.users))
      .catch(err => console.log(err))
  }, []);
  let userId = values.users.filter(user => user.username === params.username)
  const postIt = (title, content) => {
    const newPost = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        content: content,
        user_id: userId[0].id
      })
    }
    fetch('http://localhost:8082/posts', newPost)
    .then(res => res.json())
    .then(data => {setters.setPosts(data)})
    let date = Date.now()
    console.log(date)
    setters.setDate(date)    
    nav(`/profile/${username}`)
  }

  return(
    <div className="background">
      <h1 className="blogTitle">BLOG</h1>
      <button onClick={()=> {nav(`/profile/${username}`)}}>Return</button>
      <div className="IndvPosts">
      <div className="encapped">
      </div>
        <div className="viewPostsHeader">
          <textarea className="postHeader" placeholder="Your Title Goes Here" id="titleInput"/>
        </div>
        <div className="postBodyContainer">
          <textarea className="indPostBody" placeholder="...What's on your mind?" id="contentInput"/>
        </div>
        <button onClick={() => {postIt(document.getElementById('titleInput').value, document.getElementById('contentInput').value)}}>Publish</button>
    </div>
    </div>
  )
}

export default CreatePost;