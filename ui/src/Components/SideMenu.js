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
            <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
                <div className="menuOptions">
                    <Link to={'/Assets/ISR'} state={{ type: 'ISR' }} onClick={() => closeMenu()} >
                        <li>ISR</li>
                    </Link>
                    <Link to='/Assets/Communications' state={{ type: 'Communications' }} onClick={() => closeMenu()} >
                        <li>Communications</li>
                    </Link>
                    <Link to='/Assets/Mobility' state={{ type: 'Transportation' }} onClick={() => closeMenu()} >
                        <li>Mobility</li>
                    </Link>
                    <Link to='/Assets/Medical' state={{ type: 'Medical' }} onClick={() => closeMenu()} >
                        <li>Medical</li>
                    </Link>
                    <Link to='/Assets/Fires' state={{ type: 'Fires' }} onClick={() => closeMenu()} >
                        <li>Fires</li>
                    </Link>
                    <Link to='/Assets/Personnel' state={{ type: 'Personnel' }} onClick={() => closeMenu()} >
                        <li>Personnel</li>
                    </Link>
                </div>
            </ul>
        </nav>
    )
}

export default SideMenu;
