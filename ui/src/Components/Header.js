
import '../App.css';
import React from 'react'
import { Link } from 'react-router-dom';
import SideMenu from './SideMenu';
import { MdOutlineShoppingCart } from 'react-icons/md'
import Badge from '@material-ui/core/Badge'
import logo from '../img/logo.png'

function Header() {
    return (
        <div className="Header">
            <div className="grid1">
                <SideMenu />
            </div>
            <div className="grid2">
                <Link to={`/Home`}>
                    <img src={logo} alt="alt" />
                    {/* <h1>FORTIS BELLATOR</h1> */}
                </Link>
            </div>
            <div className="grid3">
                <Link to={`/ShoppingCart`}>
                    <MdOutlineShoppingCart style={{ color: "black", width: "38px", height: "38px" }} />
                    <span className="tooltiptext">Click to finalize your request</span>
                    <Badge overlap="rectangular" color="secondary" />
                </Link>
            </div>
        </div>
    )

}

export default Header;
