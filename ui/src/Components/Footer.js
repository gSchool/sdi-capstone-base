import '../App.css';
import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="Footer">
            <div>
                <Link to={`/FAQ`}>
                    <p>FAQ</p>
                </Link>
            </div>
            <div>
                <a className="FooterIcons" href="https://fb.me/GalvanizeHQ/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                <a className="FooterIcons" href="https://twitter.com/galvanize/" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a className="FooterIcons" href="https://instagr.am/GalvanizeHQ/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a className="FooterIcons" href="https://www.youtube.com/@Galvanize_HackReactor/videos/" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                <a className="FooterIcons" href="mailto:marketing@galvanize.com" rel="noopener noreferrer"><MdEmail /></a>
            </div>
            <div>
                <Link to={`/Admin`}>
                    <p>Admin</p>
                </Link>
            </div>
        </div>
    )
}

export default Home;