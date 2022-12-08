
import '../App.css';
import React from 'react'
import { Link } from 'react-router-dom';
import Header from './Header';
import logo1 from '../img/1.jpg'
import logo2 from '../img/2.jpg'
import logo3 from '../img/3.jpg'
import logo4 from '../img/4.jpg'
import logo5 from '../img/5.jpg'
import logo6 from '../img/6.jpg'

function Home() {
    return (
        <>
        <Header/>
        <div className="home">
            <Link to={`/Assets/ISR`}>
            <img src={logo1} alt="alt"/>
            <h2 className="ISR">ISR</h2>
            </Link>
            <Link to={`/Assets/Communications`}>
            <img src={logo2} alt="alt"/>
            <h2 className="Comms">Communications</h2>
            </Link>
            <Link to={`/Assets/Mobility`}>
            <img src={logo3} alt="alt"/>
            <h2 className="Mobility">Mobility</h2>
            </Link>
            <Link to={`/Assets/Medical`}>
            <img src={logo4} alt="alt"/>
            <h2 className="Medical">Medical</h2>
            </Link>
            <Link to={`/Assets/Fires`}>
            <img src={logo5} alt="alt"/>
            <h2 className="Fires">Fires</h2>
            </Link>
            <Link to={`/Assets/Personel`}>
            <img src={logo6} alt="alt"/>
            <h2 className="Personel">Personel</h2>
            </Link>
        </div>
        </>
    )

export default Home;
