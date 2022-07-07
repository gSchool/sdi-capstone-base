import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../_context/AppProvider'
import eHandler, { noCallback } from '../_helpers/eHandler';
import logo from '../_assets/img/logo.png';
import add from '../_assets/icons/plus.png';
import menu from '../_assets/icons/grip.png';
import account from '../_assets/icons/account.png';
import '../_styles/sidebar.css'
import ThemeSwitcher from '../_components/ThemeSwitcher'
import { Portal } from './Portal';
import dummySheetAccessData from '../_dummy/sheet-access.json';

const Sidebar = () => {

  const { store } = useContext(GlobalContext)
  const { user, setSheetAccess } = store
  const { profileImg, sheetAccess } = user

  const test = [1, 100]

  useEffect(() => {
    // get user's sheet access and set it
    setSheetAccess(dummySheetAccessData.sheets);
  }, [])
  
  return (
    <>
      <nav className="sidebar" onMouseOver={(e)=>eHandler(e, 'showCover', null, noCallback)} onMouseEnter={(e)=>eHandler(e, 'showCover', null, noCallback)} onMouseLeave={(e)=>eHandler(e, 'hideCover', null, noCallback)}>
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

            { sheetAccess.map((sheet, i) => {
                return (
                  <span key={i} className="sidebar-sheet">
                    <Link to={`/sheet/${sheet.sheet_id}`} className="sidebar-sheet-item" onClick={()=>{console.log('clicked')}}>
                      <div className="sidebar-sheet-item-group">
                        <span className="sidebar-sheet-circle">{sheet.short_name}</span>
                        <span className="sidebar-sheet-link-text">{sheet.name}</span>
                      </div>
                      <img alt='logo' src={menu} className="sidebar-sheet-menu" onClick={() => {console.log('sheet id: ', sheet.sheet_id)}}/>
                    </Link>
                  </span>
                )
              })
            }

          </li>

          <li className="sidebar-footer">
            <Link to="/account" className="sidebar-footer-link">
              { profileImg ? <img className='profile-img-small' alt='profile' src={profileImg} />
              : <img alt='profile' src={account} /> }
              <div className="sidebar-footer-link-text">Account</div>
            </Link>
            <div className="sidebar-footer-theme">
              <ThemeSwitcher/>
            </div>
          </li>
        </ul>
      </nav>
      <div id="cover" className="page-cover" />
      {/* <Portal>
        <div className="sidebar-sheet-options">
          MENU
        </div>
      </Portal> */}
    </>
  );
}

export default Sidebar;