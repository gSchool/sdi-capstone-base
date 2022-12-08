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
            <button onClick={handleToggle}>{navbarOpen ? (<MdClose className="rotate" style={{ color: "black", width: "50px", height: "50px" }} />) : (
                <MdMenu className="rotate" style={{ color: "black", width: "45px", height: "45px" }} />
            )}
            </button>
            <ul className={`menuNav ${navbarOpen ? " showMenu" : "" }`}>
                <div className ="menuOptions">
                    <Link to={'/Branch/0'} onClick={() => closeMenu()} >
                        <li>All</li>
                    </Link>
                    <Link to='/Branch/1' onClick={() => closeMenu()} >
                        <li>National Guard</li>
                    </Link>
                    <Link to='/Branch/2' onClick={() => closeMenu()} >
                        <li>Army</li>
                    </Link>
                    <Link to='/Branch/3' onClick={() => closeMenu()} >
                        <li>Navy</li>
                    </Link>
                    <Link to='/Branch/4' onClick={() => closeMenu()} >
                        <li>Marines</li>
                    </Link>
                    <Link  to='/Branch/5' onClick={() => closeMenu()} >
                        <li>Coast Guard</li>
                    </Link>
                    <Link to='/Branch/6' onClick={() => closeMenu()} >
                        <li>Air Force</li>
                    </Link>
                    <Link to='/Branch/7' onClick={() => closeMenu()}>
                        <li>Space Force</li>
                    </Link>
                    <Link to='/Branch/8' onClick={() => closeMenu()} >
                        <li>Joint</li>
                    </Link>
                </div>
            </ul>
        </nav>
    )
}

export default SideMenu;
