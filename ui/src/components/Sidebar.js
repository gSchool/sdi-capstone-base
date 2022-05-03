import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StateContext } from '../App.js'
import './styles/Sidebar.css'

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("main-page").style.marginLeft = "0";
}

const Sidebar = ({ setShowSidebar }) => {
  const state = useContext(StateContext)

  const clickHandler = () => {
    setShowSidebar(false)
    closeNav()
  }

 return ( state.currentEvent ?
  <div className='sidebar' id='sidebar'>
    <div className='links'>
      <Link to={`/events/${state.currentEvent.id}`} onClick={clickHandler}> Event Home </Link>
      <Link to={`/events/${state.currentEvent.id}/teams`} onClick={clickHandler}> Teams </Link>
      <Link to={`/events/${state.currentEvent.id}/tasks`} onClick={clickHandler}> Tasks </Link>
      <Link to={`/events/${state.currentEvent.id}/attacks`} onClick={clickHandler}> Attacks </Link>
      <Link to={`/events/${state.currentEvent.id}/report`} onClick={clickHandler}> Report </Link>
      <Link to={`/events/${state.currentEvent.id}/settings`} onClick={clickHandler}> Settings </Link>
    </div>
  </div> :
  <></>
 )
}

export default Sidebar;