import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlobalContext } from '../_context/AppProvider'
import eHandler, { noCallback } from '../_helpers/eHandler';
import logo from '../_assets/img/logo.png';
import add from '../_assets/icons/plus.png';
import menu from '../_assets/icons/grip.png';
import account from '../_assets/icons/account.png';
import '../_styles/sidebar.css'
import ThemeSwitcher from '../_components/ThemeSwitcher'
import dummySheetAccessData from '../_dummy/sheet-access.json';
import { ClickAwayListener } from '@mui/base';
import smartApi from '../_helpers/smartApi';

const Sidebar = () => {

  const { store } = useContext(GlobalContext)
  const { user, setSheetAccess, refresh } = store
  const { profileImg, sheetAccess, token } = user

  const data = dummySheetAccessData.sheets  
  // get sheet access data
  useEffect(() => {

    const data = dummySheetAccessData
    setSheetAccess(data.sheets);

    smartApi(['GET', 'get_sheets/'], user.token)
      .then(result => {
        const allsheets = [...data.sheets, ...result]
        setSheetAccess(allsheets)
      })
      .catch(error => console.log('error', error));

  }, [])


  const location = useLocation();
  const [view, setView] = useState('desktop')
  const [link, setLink] = useState('/create')
 
  window.onresize = () => {
    if (window.innerWidth < 768) {
      setView('mobile')
    } else {
      setView('desktop')
    }
  }

  useEffect(() => {
        
    const path = window.location.pathname.split('/')

    if (view === 'mobile') {
      if (path.length < 3) {
        // console.log('set to create sheet on mobile')
        setLink('/create')
      } else {
        // console.log('set to new entry on mobile')
        setLink('/sheet/new')
      }
    } else {
      // console.log('set to create sheet on desktop')
      setLink('/create')
    }
  
  }, [location, view])

  const [applyStyle, setApplyStyle] = useState(false)
  const [menuLocation, setMenuLocation] = useState({
    visibility: 'hidden',
    top: 0,
    left: 0
  })

  // open a menu next to the component clicked on
  const openMenu = (e) => {
    const { top, left } = e.target.getBoundingClientRect()
    setApplyStyle(true)
    setMenuLocation({
      visibility: 'visible',
      top: top + 20,
      left: left
    })
  }
  
  // close the menu
  const closeMenu = () => {
    // log('close menu')
    setApplyStyle(false)
    setMenuLocation({
      visibility: "hidden",
      top: 0,
      left: 0
    })
  }


  return (
    <>
      <nav className="sidebar" onMouseOver={(e)=>{eHandler(e, 'showCover', null, noCallback)}} onMouseEnter={(e)=>{eHandler(e, 'showCover', null, noCallback)}} onMouseLeave={(e)=>{closeMenu(); eHandler(e, 'hideCover', null, noCallback)}}>
        <ul className="sidebar-container">
          <li className="sidebar-header">
            <Link to="/" className="sidebar-header-link">
              <img alt='logo' src={logo} className="sidebar-header-logo"/>
              <span className="sidebar-header-text">SmartSheets</span>
            </Link>
            <Link to={link}>
              <img alt='add sheet' src={add} className="sidebar-header-add-sheet" />
            </Link>
          </li>

          <span className="sidebar-add-entry-btn-dummy" />
          
          <span className="sidebar-add-entry-btn">
            <Link to={link}>
              <img alt='add entry' src={add} className="sidebar-add-entry" />
            </Link>
          </span>

          <li className="sidebar-main">

            {/* { data.map((sheet, i) => { */}
            { sheetAccess.map((sheet, i) => {
                return (
                  <span key={i} className="sidebar-sheet">
                    <Link to={`/sheet/${sheet.sheet_id}`} className="sidebar-sheet-item" onClick={()=>{}}>
                      <div className="sidebar-sheet-item-group">
                        <span className="sidebar-sheet-circle">{sheet.short_name}</span>
                        <span className="sidebar-sheet-link-text">{sheet.name}</span>
                      </div>
                      <img alt='Options' src={menu} className="sidebar-sheet-menu" onClick={(e)=>openMenu(e)}/>
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
        <ClickAwayListener
          mouseEvent="onMouseDown"
          touchEvent="onTouchStart"
          onClickAway={closeMenu}
        >
          <div className="sheet-options-menu-container" style={menuLocation}>
            <div className={`sheet-options-menu-item ${applyStyle ? 'options-menu-show' : 'options-menu-hidden'}`}>Edit Sheet</div>
            <div className={`sheet-options-menu-item ${applyStyle ? 'options-menu-show' : 'options-menu-hidden'}`}>Duplicate Sheet</div>
            <div className={`sheet-options-menu-item ${applyStyle ? 'options-menu-show' : 'options-menu-hidden'}`}>Generate Report</div>
            <div className={`sheet-options-menu-item ${applyStyle ? 'options-menu-show' : 'options-menu-hidden'}`}>Download Sheet</div>
            <div className={`sheet-options-menu-item ${applyStyle ? 'options-menu-show' : 'options-menu-hidden'}`}>User Access</div>
            <div className={`sheet-options-menu-item break ${applyStyle ? 'options-menu-show' : 'options-menu-hidden'}`}></div>
            <div className={`sheet-options-menu-item remove ${applyStyle ? 'options-menu-show' : 'options-menu-hidden'}`}>Leave Sheet</div>
          </div>
        </ClickAwayListener>
      </nav>
      <div id="cover" className="page-cover"/>
    </>
  );
}

export default Sidebar