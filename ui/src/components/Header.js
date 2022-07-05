import React, {useContext} from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import TaskContext from '../App.js'

const Header = () => {

    return (
        <div className='layoutHeader'>
            <Link to="/">
                <div className="buttonToMainContainer">
                    <button className="buttonToMain"> Taskify </button>
                </div>
            </Link>

            <div className="navButtons">
                <Link to="/tasks/orgs/:orgid">
                    <button className='toUnitTasks'> Unit Tasks </button>
                </Link>
                
                <Link to="/war/orgs/:orgid">
                    <button className='toReports'> Reports </button>
                </Link>
                
                <Link to="/tasks/orgs/:orgid">
                    <button className='toArchive'> Archive </button>
                </Link>

                <Link to="/users/:userid">
                    <button className='toProfile'> Profile </button>
                </Link>
            </div> 
        </div>
    )
}


export default Header