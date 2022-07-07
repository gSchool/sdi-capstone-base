import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { TaskContext } from "../App.js";

const Header = () => {
  const tc = useContext(TaskContext);

  return (
    <div className="layoutHeader">

      <Link to="/">
        <div className="buttonToMainContainer">
          <button className="buttonToMain"> Taskify </button>
        </div>
      </Link>

      <div className="navButtons">
        {
          tc.isAdmin ?
            <Link to={`/menu`}>
              <button className="toAdminMenu">Admin Menu</button>
            </Link>
            :
            <></>
        }
        <Link to={`/unit`}>
          <button className="toUnitTasks"> Unit Tasks </button>
        </Link>

        <Link to={`/reports`}>
          <button className="toReports"> Reports </button>
        </Link>

        <Link to={`/archive`}>
          <button className="toArchive"> Archive </button>
        </Link>

        <Link to={`/profile`}>
          <button className="toProfile"> Profile </button>
        </Link>
        <Link to={`/admin`}>
          <button className="toProfile"> Admin </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
