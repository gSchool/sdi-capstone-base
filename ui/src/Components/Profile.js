import React, { useContext, useEffect} from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../AppContext";
import './Profile.css'

const Profile = () => {
  const {values, setters} = useContext(AppContext)
  const user = useParams();

  useEffect(() => {
    fetch('http://localhost:8082/posts')
      .then(res => res.json())
      .then(data => setters.setPosts(data))
      .then(console.log(values.posts))
      .catch(err => console.log(err))
  }, []);

  const deletePost = (post) => {
    const id = post.id
    fetch(`http://localhost:8082/posts/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
    setters.setPosts((data) => data.filter(info => info.id !== id))
  }
//user.username === username
  const postIt = (title, content) => {
    fetch('http://localhost:8082/users')
    .then(res => res.json())
    .then(data => setters.setUsers(data))
    .then(console.log(values.users))
    .catch(err => console.log(err))

    let getUserId = values.users.filter(item => item.username === user.username)

    console.log(`title: ${title} \n content: ${content}`)
    const newPost = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        content: content,
        user_id: getUserId[0].id
      })
    }
    fetch('http://localhost:8082/posts', newPost)
    .then(res => res.json())
    .then(data => {setters.setPosts(data);})
  }

  return(
    <div className="background">
      <h1 className="profileHeader">Welcome, {user.username}!</h1>
        <div className="newPostContainer">
          <input id="title" className="titleInput" placeholder="Title"></input>
        </div>
        <div className="newPostContainer">
          <input id="post" className="contentInput" placeholder="What's on your mind?"></input>
        </div>
        <div className="newPostContainer">
          <button className="myFeed" onClick={() => {postIt(document.getElementById('title').value, document.getElementById('post').value)}}>Post!</button>
        </div>
    <div>
      {values.posts.map(post => (
      <div key={post.id}className="viewAllPosts">
        <div className="viewPostsHeader">
          <h2 className="postHeader"><button className="delete" onClick={() => {deletePost(post)}}>Hide Post</button><br/>{post.title}</h2>
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