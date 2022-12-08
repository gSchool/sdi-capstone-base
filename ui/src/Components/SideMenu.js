import React, { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import "../SideMenu.css";

function SideMenu() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  const closeMenu = () => {
    setNavbarOpen(false);
  };

  return (
    <nav className="navBar">
      <button onClick={handleToggle}>
        {navbarOpen ? (
          <MdClose
            className="rotate"
            style={{ color: "#5e1722", width: "50px", height: "50px" }}
          />
        ) : (
          <MdMenu
            className="rotate"
            style={{ color: "#5e1722", width: "45px", height: "45px" }}
          />
        )}
      </button>
      <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
        <div className="menuOptions">
          <Link
            style={{ color: "white" }}
            to={"/Home"}
            onClick={() => closeMenu()}
          >
            <li>Home</li>
          </Link>
          <Link
            style={{ color: "white" }}
            to="/Assets/1"
            onClick={() => closeMenu()}
          >
            <li>Request ISR</li>
          </Link>
          <Link
            style={{ color: "white" }}
            to="/Assets/1"
            onClick={() => closeMenu()}
          >
            <li>Request Medical</li>
          </Link>
          <Link
            style={{ color: "white" }}
            to="/Assets/1"
            onClick={() => closeMenu()}
          >
            <li>Request Mobility</li>
          </Link>
          <Link
            style={{ color: "white" }}
            to="/Assets/1"
            onClick={() => closeMenu()}
          >
            <li>Request Fires</li>
          </Link>
          <Link
            style={{ color: "white" }}
            to="/Assets/1"
            onClick={() => closeMenu()}
          >
            <li>Cart</li>
          </Link>
        </div>
      </ul>
    </nav>
  );
}

export default SideMenu;
