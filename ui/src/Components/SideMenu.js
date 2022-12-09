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
                    <Link to={'/Assets/ISR'} onClick={() => closeMenu()} >
                        <li>ISR</li>
                    </Link>
                    <Link to='/Assets/Communications' onClick={() => closeMenu()} >
                        <li>Communications</li>
                    </Link>
                    <Link to='/Assets/Mobility' onClick={() => closeMenu()} >
                        <li>Mobility</li>
                    </Link>
                    <Link to='/Assets/Medical' onClick={() => closeMenu()} >
                        <li>Medical</li>
                    </Link>
                    <Link to='/Assets/Fires' onClick={() => closeMenu()} >
                        <li>Fires</li>
                    </Link>
                    <Link  to='/Assets/Personel' onClick={() => closeMenu()} >
                        <li>Personel</li>
                    </Link>
                </div>
            </ul>
        </nav>
    )
}

export default SideMenu;
