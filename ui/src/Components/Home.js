import '../App.css';
import React from 'react'
import { Link } from 'react-router-dom';
import Header1 from './Header1';

function Home() {
    return (
        <>
        <Header1/>
        <div>
            <Link to={`/Assets/1`}>
            <img src= {`/1.jpg`} alt="alt"></img>
            <h1>This is where asset types will be displayed as images, and the image will be clickable links to assets page</h1>
            </Link>
        </div>
        </>
    )
}

export default Home;