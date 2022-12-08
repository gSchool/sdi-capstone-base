import "../App.css";
import React from "react";
import { Link } from "react-router-dom";
import Header1 from "./Header1";
import logo from "../1.jpg";

function Home() {
  return (
    <>
      <Header1 />
      <div>
        <Link to={`/Assets/1`}>
          <img src={logo} alt="alt"></img>
          <h1>
            This is where asset types will be displayed as images, and the image
            will be clickable links to assets page
          </h1>
        </Link>
      </div>
    </>
  );
}

export default Home;
