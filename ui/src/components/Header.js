import React, { useState, useContext } from 'react'
import './styles/Header.css'
import { StateContext } from "../App.js";
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'


/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("sidebar") && (document.getElementById("sidebar").style.width = "250px");
  document.getElementById("main-page") && (document.getElementById("main-page").style.marginLeft = "250px");
  document.getElementById("main-page") && (document.getElementById("main-page").style.width = "calc(100vw - 250px)");
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("sidebar") && (document.getElementById("sidebar").style.width = "0");
  document.getElementById("main-page") && (document.getElementById("main-page").style.marginLeft = "0");
  document.getElementById("main-page") && (document.getElementById("main-page").style.width = "100vw");
}


const Header = () => {
  const state = useContext(StateContext)
  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(false);


  const goHome = () => {
    state.setCurrentEvent(null)
    setShowSidebar(false)
    closeNav()
    navigate('/')
  }

  const clickHamburger = () => {
    if (showSidebar) {
      closeNav()
    } else {
      openNav()
    }
    setShowSidebar(!showSidebar)

  }

  return (
    <>
    <Sidebar setShowSidebar={setShowSidebar}/>
    <div className='header'>
      <div className='hamburger' onClick={clickHamburger}>{state.currentEvent ? <>&#9776;</> : ''}</div>
      <h1 className="title" onClick={goHome}>Trojn</h1>
      <div className='spacer'>&nbsp;</div>
    </div>
    </>
  )
}

export default Header;