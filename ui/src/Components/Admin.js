import '../App.css';
import React, { useState, useEffect } from 'react'
import logo from "../img/logo.png";
import { MdArrowCircleDown, MdArrowCircleUp } from "react-icons/md";
import Button from 'react-bootstrap/Button';

function Admin() {
    const [user, setUser] = useState([]); //user table fetch
    const [sme, setSME] = useState([]); //sme table fetch
    const [cmd, setCMD] = useState([]); //cmd table fetch
    const [request, setRequests] = useState([])
    const [showUser, setShowUser] = useState([]);
    const [showSME, setShowSME] = useState([]);
    const [showCMD, setShowCMD] = useState([]);
    const [showRequest, setShowRequest] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/login")
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
            });
        fetch("http://localhost:8080/sme")
            .then((response) => response.json())
            .then((data) => {
                setSME(data);
            });
        fetch("http://localhost:8080/cmd")
            .then((response) => response.json())
            .then((data) => {
                setCMD(data);
            });
        fetch("http://localhost:8080/approvals")
            .then((response) => response.json())
            .then((data) => {
                setRequests(data);
            });
    }, []);

    function toggleUserHandler(id) {
        if (showUser.includes(id)) {
            setShowUser(
                showUser.filter(function (newShow) {
                    return newShow !== id;
                })
            );
        } else {
            setShowUser((showUser) => [...showUser, id]);
        }
    }

    function toggleSMEHandler(id) {
        if (showSME.includes(id)) {
            setShowSME(
                showSME.filter(function (newShow) {
                    return newShow !== id;
                })
            );
        } else {
            setShowSME((showSME) => [...showSME, id]);
        }
    }

    function toggleCMDHandler(id) {
        if (showCMD.includes(id)) {
            setShowCMD(
                showCMD.filter(function (newShow) {
                    return newShow !== id;
                })
            );
        } else {
            setShowCMD((showCMD) => [...showCMD, id]);
        }
    }

    function toggleRequestHandler(id) {
        if (showRequest.includes(id)) {
            console.log(id)
            setShowRequest(
                showRequest.filter(function (newShow) {
                    return newShow !== id;
                })
            );
        } else {
            setShowRequest((showRequest) => [...showRequest, id]);
        }
    }

    function userDeleteHandler(users) {
        console.log(users.id)
        fetch(`http://localhost:8080/login/${users.id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(users)
        })
            .then(res => console.log(res));
            setTimeout(() => {
                window.location.reload()
              }, 1000)
    }

    function smeDeleteHandler(smes) {
        console.log(smes.id)
        fetch(`http://localhost:8080/sme/${smes.id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(smes)
        })
            .then(res => console.log(res));
            setTimeout(() => {
                window.location.reload()
              }, 1000)
    }

    function cmdDeleteHandler(cmds) {
        console.log(cmds.id)
        fetch(`http://localhost:8080/cmd/${cmds.id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(cmds)
        })
            .then(res => console.log(res));
            setTimeout(() => {
                window.location.reload()
              }, 1000)
    }

    function requestDeleteHandler(requests) {
        console.log(requests.Request_ID)
        fetch(`http://localhost:8080/approvals/${requests.Request_ID}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(requests)
        })
            .then(res => console.log(res));
            setTimeout(() => {
                window.location.reload()
              }, 1000)
    }

    console.log("request id", request)
    return (
        <div className="adminWholePage">
            <div className="loginheader">
                <img src={logo} alt="alt" />
            </div>
            <div className="adminHeader">
                <h1>Administration</h1>
            </div>
            <div className="adminPage">
                <div className="adminGrid">
                    <h1>User's</h1>
                    {user.map((users, index) =>
                        <div className="individual" key={index}>
                            <h3>{users.username} |
                                {showUser.includes(users.id) ?
                                    <button className="cartIcon" type="submit" onClick={() => { toggleUserHandler(users.id) }}>
                                        <MdArrowCircleUp style={{ width: '24px', height: '24px', color: '#252627' }} />
                                    </button>
                                    :
                                    <button className="cartIcon" type="submit" onClick={() => { toggleUserHandler(users.id) }}>
                                        <MdArrowCircleDown style={{ width: '24px', height: '24px', color: '#252627' }} />
                                    </button>
                                }
                            </h3>
                            {showUser.includes(users.id) ?
                                <>
                                    <p>{users.first_name}</p>
                                    <p>{users.last_name}</p>
                                    <p>{users.phone_number}</p>
                                    <p>{users.email}</p>
                                    <Button variant="primary" type="submit" onClick={() => { userDeleteHandler(users) }}>
                                        Delete
                                    </Button>
                                </>
                                : ""}
                        </div>
                    )}
                </div>
                <div className="adminGrid">
                    <h1>SME's</h1>
                    {sme.map((smes, index) =>
                        <div className="individual" key={index}>
                            <h3>{smes.username} |
                                {showSME.includes(smes.id) ?
                                    <button className="cartIcon" type="submit" onClick={() => { toggleSMEHandler(smes.id) }}>
                                        <MdArrowCircleUp style={{ width: '24px', height: '24px', color: '#252627' }} />
                                    </button>
                                    :
                                    <button className="cartIcon" type="submit" onClick={() => { toggleSMEHandler(smes.id) }}>
                                        <MdArrowCircleDown style={{ width: '24px', height: '24px', color: '#252627' }} />
                                    </button>
                                }
                            </h3>
                            {showSME.includes(smes.id) ?
                                <>
                                    <p>{smes.first_name}</p>
                                    <p>{smes.last_name}</p>
                                    <p>{smes.phone_number}</p>
                                    <p>{smes.email}</p>
                                    <Button variant="primary" type="submit" onClick={() => { smeDeleteHandler(smes) }}>
                                        Delete
                                    </Button>
                                </>
                                : ""}
                        </div>
                    )}
                </div>
                <div className="adminGrid">
                    <h1>Commander's</h1>
                    {cmd.map((cmds, index) =>
                        <div className="individual" key={index}>
                            <h3>{cmds.username} |
                                {showCMD.includes(cmds.id) ?
                                    <button className="cartIcon" type="submit" onClick={() => { toggleCMDHandler(cmds.id) }}>
                                        <MdArrowCircleUp style={{ width: '24px', height: '24px', color: '#252627' }} />
                                    </button>
                                    :
                                    <button className="cartIcon" type="submit" onClick={() => { toggleCMDHandler(cmds.id) }}>
                                        <MdArrowCircleDown style={{ width: '24px', height: '24px', color: '#252627' }} />
                                    </button>
                                }
                            </h3>
                            {showCMD.includes(cmds.id) ?
                                <>
                                    <p>{cmds.first_name}</p>
                                    <p>{cmds.last_name}</p>
                                    <p>{cmds.phone_number}</p>
                                    <p>{cmds.email}</p>
                                    <Button variant="primary" type="submit" onClick={() => { cmdDeleteHandler(cmds) }}>
                                        Delete
                                    </Button>
                                </>
                                : ""}
                        </div>
                    )}
                </div>
                <div className="adminGrid">
                    <h1>Requests</h1>
                    {request.map((requests, index) =>
                        <div className="individual" key={index}>
                            <h3>{requests.mission_title} |
                                {showRequest.includes(requests.Request_ID) ?
                                    <button className="cartIcon" type="submit" onClick={() => { toggleRequestHandler(requests.Request_ID) }}>
                                        <MdArrowCircleUp style={{ width: '24px', height: '24px', color: '#252627' }} />
                                    </button>
                                    :
                                    <button className="cartIcon" type="submit" onClick={() => { toggleRequestHandler(requests.Request_ID) }}>
                                        <MdArrowCircleDown style={{ width: '24px', height: '24px', color: '#252627' }} />
                                    </button>
                                }
                            </h3>
                            {showRequest.includes(requests.Request_ID) ?
                                <>
                                    <p>{requests.date}</p>
                                    <p>{requests.location}</p>
                                    <p>{requests.justification}</p>
                                    <Button variant="primary" type="submit" onClick={() => { requestDeleteHandler(requests) }}>
                                        Delete
                                    </Button>
                                </>
                                : ""}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Admin;
