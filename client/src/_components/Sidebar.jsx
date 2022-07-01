import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import eHandler, { noCallback } from '../_helpers/eHandler';
import logo from '../_assets/img/logo.png';
import add from '../_assets/icons/plus.png';
import menu from '../_assets/icons/grip.png';
import account from '../_assets/icons/account.png';
import '../_styles/sidebar.css'

const Sidebar = () => {

  return (
    <>
      <nav className="sidebar" onMouseEnter={(e)=>eHandler(e, 'showCover', null, noCallback)} onMouseLeave={(e)=>eHandler(e, 'showCover', null, noCallback)}>
        <ul className="sidebar-container">
          <li className="sidebar-header">
            <Link to="/" className="sidebar-header-link">
              <img alt='logo' src={logo} className="sidebar-header-logo"/>
              <span className="sidebar-header-text">SmartSheets</span>
            </Link>
            <Link to="/add">
              <img alt='add sheet' src={add} className="sidebar-header-add-sheet" />
            </Link>
          </li>

          <span className="sidebar-add-entry-btn-dummy" />
          
          <span className="sidebar-add-entry-btn">
            <img alt='add entry' src={add} className="sidebar-add-entry" />
          </span>

          <li className="sidebar-main">
            
            <span className="sidebar-sheet">
              <Link to="/sheets" className="sidebar-sheet-item">
                <div className="sidebar-sheet-item-group">
                  <span className="sidebar-sheet-circle">B2</span>
                  <span className="sidebar-sheet-link-text">B-2 Parts Inventory</span>
                </div>
                <img alt='logo' src={menu} className="sidebar-sheet-menu"/>
              </Link>
            </span>

            <span className="sidebar-sheet">
              <Link to="/sheets" className="sidebar-sheet-item">
                <div className="sidebar-sheet-item-group">
                  <span className="sidebar-sheet-circle">C5</span>
                  <span className="sidebar-sheet-link-text">C-5M Parts Inventory</span>
                </div>
                <img alt='logo' src={menu} className="sidebar-sheet-menu"/>
              </Link>
            </span>

            <span className="sidebar-sheet">
              <Link to="/sheets" className="sidebar-sheet-item">
                <div className="sidebar-sheet-item-group">
                  <span className="sidebar-sheet-circle">COM</span>
                  <span className="sidebar-sheet-link-text">Computer Parts Inventory</span>
                </div>
                <img alt='logo' src={menu} className="sidebar-sheet-menu"/>
              </Link>
            </span>

            <span className="sidebar-sheet">
              <Link to="/sheets" className="sidebar-sheet-item">
                <div className="sidebar-sheet-item-group">
                  <span className="sidebar-sheet-circle">135</span>
                  <span className="sidebar-sheet-link-text">KC-135 Parts Inventory</span>
                </div>
                <img alt='logo' src={menu} className="sidebar-sheet-menu"/>
              </Link>
            </span>

            <span className="sidebar-sheet">
              <Link to="/sheets" className="sidebar-sheet-item">
                <div className="sidebar-sheet-item-group">
                  <span className="sidebar-sheet-circle">MQ9</span>
                  <span className="sidebar-sheet-link-text">MQ-9 Reaper Parts Inventory</span>
                </div>
                <img alt='logo' src={menu} className="sidebar-sheet-menu"/>
              </Link>
            </span>

            <span className="sidebar-sheet">
              <Link to="/sheets" className="sidebar-sheet-item">
                <div className="sidebar-sheet-item-group">
                  <span className="sidebar-sheet-circle">SAT</span>
                  <span className="sidebar-sheet-link-text">Satellite Database</span>
                </div>
                <img alt='logo' src={menu} className="sidebar-sheet-menu"/>
              </Link>
            </span>

          </li>

          <li className="sidebar-footer">
            <Link to="/account" className="sidebar-footer-link">
              <img alt='logo' src={account}/>
              <div className="sidebar-footer-link-text">Account</div>
            </Link>
          </li>
        </ul>
      </nav>
      <div id="cover" className="page-cover" />
    </>
  );
}

export default Sidebar;