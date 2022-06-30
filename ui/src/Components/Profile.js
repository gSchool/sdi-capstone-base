import React, { useContext, useEffect} from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../AppContext";
import './Profile.css'

const Profile = () => {
  const {values, setters} = useContext(AppContext)
  const user = useParams();

  useEffect(() => {
    fetch('http://localhost:8082/posts')
      .then(response => response.json())
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

  return(
    <div className="background">
      <h1 className="profileHeader">Welcome, {user.username}!</h1>
      <div className="myFeedContainer">
        <button className="myFeed">Write new post!</button>
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