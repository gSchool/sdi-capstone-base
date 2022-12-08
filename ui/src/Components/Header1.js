import '../App.css';
import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="Header">
            <div className="grid1">
            <p>sidemenu</p>
            </div>
            <div className="grid2">
            <Link to={`/Home`}>
            <h1>Fortis Bellator</h1>
            </Link>
            </div>
            <div className="grid3">
            <Link to={`/Requests`}>
            <p>Requests</p>
            </Link>
            </div>
        </div>
    )
}

export default Header;