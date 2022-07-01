import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../_assets/img/logo.png';
import newsheet from '../_assets/icons/plus.png';
import menu from '../_assets/icons/grip.png';
import account from '../_assets/icons/account.png';
import '../_styles/sidebar.css'

const Sidebar = () => {

  function showCover() {
    document.getElementById('page').classList.toggle('extend');
    document.getElementById('cover').classList.toggle('show');
  }

  return (
    <>
      <nav className="sidebar" onMouseEnter={showCover} onMouseLeave={showCover}>
        <ul className="sidebar-container">
          <li className="sidebar-header">
            <Link to="/" className="sidebar-header-link">
              <img alt='logo' src={logo} className="sidebar-header-logo"/>
              <span className="sidebar-header-text">SmartSheets</span>
            </Link>
            <Link to="/">
              <img alt='add sheet' src={newsheet} className="sidebar-header-add-sheet" />
            </Link>
          </li>

          <li className="sidebar-main">
            <div className="sidebar-sheet">
              <Link to="/sheets" className="sidebar-sheet-item">
                <span className="sidebar-sheet-circle">MQ9</span>
                <span className="sidebar-sheet-link-text">MQ-9 Reaper Parts Inventory</span>
                <img alt='logo' src={menu} className="sidebar-sheet-menu"/>
              </Link>
            </div>
            <span className="sidebar-sheet">
              <Link to="/sheets" className="sidebar-sheet-item">
                <span className="sidebar-sheet-circle">MQ9</span>
                <span className="sidebar-sheet-link-text">MQ-9 Reaper Parts Inventory</span>
              </Link>
            </span>
          </li>

          <li className="sidebar-footer">
            <Link to="/account" className="sidebar-footer-link">
              <img alt='logo' src={account}/>
              <span className="sidebar-footer-link-text">Account</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div id="cover" className="page-cover" />
    </>
  );
}

export default Sidebar;