import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import './Profile.css'

const Profile = () => {
  const {values} = useContext(AppContext);
  return(
    <div className="background">
      <h1 className="profileHeader">Welcome, {values.user[0].username}!</h1>
    </div>
  )
}

export default Profile;