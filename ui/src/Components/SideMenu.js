import React, { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import "../SideMenu.css";
import { useCookies } from 'react-cookie';

function SideMenu() {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [userCookies] = useCookies(["user"]);

    const handleToggle = () => {
        setNavbarOpen(!navbarOpen);
    };

    const closeMenu = () => {
        setNavbarOpen(false);
    };

    return (
        <nav className="navBar">
            <button onClick={handleToggle}>{navbarOpen ? (<MdClose className="rotate" style={{ color: "#904E55", width: "50px", height: "50px" }} />) : (
                <MdMenu className="rotate" style={{ color: "#904E55", width: "45px", height: "45px" }} />
            )}
            </button>
            <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
                <div className="menuOptions">
                    <Link to={'/Requests'} onClick={() => closeMenu()} >
                        <li>Your Requests</li>
                    </Link>
                    <Link to={'/Assets/ISR'} state={{ type: 'ISR', user: userCookies }} onClick={() => closeMenu()} >
                        <li>ISR</li>
                    </Link>
                    <Link to='/Assets/Communications' state={{ type: 'Communications', user: userCookies }} onClick={() => closeMenu()} >
                        <li>Communications</li>
                    </Link>
                    <Link to='/Assets/Mobility' state={{ type: 'Transportation', user: userCookies }} onClick={() => closeMenu()} >
                        <li>Mobility</li>
                    </Link>
                    <Link to='/Assets/Medical' state={{ type: 'Medical', user: userCookies }} onClick={() => closeMenu()} >
                        <li>Medical</li>
                    </Link>
                    <Link to='/Assets/Fires' state={{ type: 'Fires', user: userCookies }} onClick={() => closeMenu()} >
                        <li>Fires</li>
                    </Link>
                    <Link to='/Assets/Personnel' state={{ type: 'Personnel', user: userCookies }} onClick={() => closeMenu()} >
                        <li>Personnel</li>
                    </Link>
                </div>
            </ul>
        </nav>
    )
}

export default SideMenu;
