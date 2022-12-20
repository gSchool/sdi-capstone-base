import './Home.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import logo1 from '../img/1.jpg';
import logo2 from '../img/2.jpg';
import logo3 from '../img/3.jpg';
import logo4 from '../img/4.jpg';
import logo5 from '../img/5.jpg';
import logo6 from '../img/6.jpg';
import { MdKeyboardArrowUp } from "react-icons/md";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import { useCookies } from 'react-cookie';
import { Parallax } from 'react-parallax';

function Home() {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [hasCookie, setHasCookie] = useState(false);
    const [userCookies] = useCookies(["user"]);
    const scrollTop = React.useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userCookies).length === 0) {
            navigate('/')
        } else {
            setHasCookie(true)
        }
    }, [])

    useEffect(() => {
        function scroll() {
            if (window.scrollY > 50) {
                scrollTop.current.style.display = 'inline-block'
            } else {
                scrollTop.current.style.display = 'none'
            }
        }
        window.addEventListener('scroll', scroll)
        return () => window.removeEventListener('scroll', scroll)
    }, [])

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    })

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Back to top
        </Tooltip>
    )

    return (
        <>
            {hasCookie &&
                <>
                    <Header />
                    <div className="home">
                    <Link to={`/Assets/Communications`} state={{ type: 'Communications', user: userCookies }}>
                            <Parallax strength={400} bgImage={logo2}>
                                <div className="ParallaxContent">
                                    <h2 className="leftText">Communications</h2>
                                </div>
                            </Parallax>
                        </Link>
                        <Link to={`/Assets/ISR`} state={{ type: 'ISR', user: userCookies }}>
                            <Parallax strength={400} bgImage={logo1}>
                                <div className="ParallaxContent">
                                </div>
                                    <h2 className="rightText">ISR</h2>
                            </Parallax>
                        </Link>
                        <Link to={`/Assets/Mobility`} state={{ type: 'Transportation', user: userCookies }}>
                            <Parallax strength={400} bgImage={logo3}>
                                <div className="ParallaxContent">
                                    <h2 className="leftText">Mobility</h2>
                                </div>
                            </Parallax>
                        </Link>
                        <Link to={`/Assets/Medical`} state={{ type: 'Medical', user: userCookies }}>
                            <Parallax strength={400} bgImage={logo4}>
                                <div className="ParallaxContent">
                                    <h2 className="rightText">Medical</h2>
                                </div>
                            </Parallax>
                        </Link>
                        <Link to={`/Assets/Fires`} state={{ type: 'Fires', user: userCookies }}>
                            <Parallax strength={400} bgImage={logo5}>
                                <div className="ParallaxContent">
                                    <h2 className="leftText">Fires</h2>
                                </div>
                            </Parallax>
                        </Link>
                        <Link to={`/Assets/Personnel`} state={{ type: 'Personnel', user: userCookies }}>
                            <Parallax strength={400} bgImage={logo6}>
                                <div className="ParallaxContent">
                                    <h2 className="rightText">Personnel</h2>
                                </div>
                            </Parallax>
                        </Link>
                    </div>
                    <div className="scrollIcon" ref={scrollTop}>
                        <OverlayTrigger placement="left" delay={{ show: 750, hide: 0 }} overlay={renderTooltip}>
                            <Button variant="success" onClick={() => setPosition({ ...position, position: { top: 0, left: 0 } })}>
                                <MdKeyboardArrowUp style={{ width: '80px', height: '70px', color: 'black' }} />
                            </Button>
                        </OverlayTrigger>
                    </div>
                </>
            }
        </>
    )
}

export default Home;




// In order to conditionally render page if user has logged in

// import { useCookies } from 'react-cookie';
// import { useNavigate } from 'react-router-dom';

// const [userCookies] = useCookies(["user"]);
// const [hasCookie, setHasCookie] = useState(false)

// useEffect(() => {
//     if (Object.keys(userCookies).length === 0) {
//         navigate('/')
//     } else {
//         setHasCookie(true)
//     }
// }, [])

// return (
//     <>
//         {hasCookie &&
//             <>
//                 <this is where you put your html>
//             </>
//         }
//     </>
// )