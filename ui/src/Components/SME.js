import "./SME.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "@fontsource/public-sans";
import logo from "../img/logo.png";
import Container from "@mui/material/Container";
import Modal from "react-bootstrap/Modal";
import { MdArrowCircleDown, MdArrowCircleUp } from "react-icons/md";
import { useCookies } from "react-cookie";
import GppBadTwoToneIcon from "@mui/icons-material/GppBadTwoTone";
import GppGoodIcon from "@mui/icons-material/GppGood";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function SME() {
    const [requestData, setRequestData] = useState([]);
    const [rejected, setRejected] = useState([])
    const [approved, setApproved] = useState([])
    const [rejectConfirmShow, setRejectConfirmShow] = useState(false);
    const [approveConfirmShow, setApproveConfirmShow] = useState(false);
    const [showRejected, setShowRejected] = useState(false);
    const [showApproved, setShowApproved] = useState(false);
    const [nonConcurId, setNonConcurId] = useState([]);
    const [concurId, setConcurId] = useState([]);
    const [confirmShow, setConfirmShow] = useState(false);
    const [show, setShow] = useState([]);
    const [countState, setCountState] = useState(0);
    const [smeCookie] = useCookies(["sme"]);

    const handleShowRejected = () => {
        setShowRejected(!showRejected);
    };

    const handleShowApproved = () => {
        setShowApproved(!showApproved);
    };

    function toggleHandler(id) {
        if (show.includes(id)) {
            setShow(
                show.filter(function (newShow) {
                    return newShow !== id;
                })
            );
        } else {
            setShow((show) => [...show, id]);
        }
    }

    const handleClose = () => {
        setConfirmShow(false);
        setApproveConfirmShow(false);
        setRejectConfirmShow(false);
    };

    const handleClickedConcur = (card) => {
        setApproveConfirmShow(true);
        setConcurId(card);
        setConfirmShow(true);
    };

    const handleClickedNonConcur = (card) => {
        setRejectConfirmShow(true);
        setNonConcurId(card);
        setConfirmShow(true);
    };

    const handleConfirmConcur = async (concurId) => {
        await axios.patch(`http://localhost:8080/approvals/sme/${concurId.Request_ID}`, {
            sme_status: "Approved",
        });
        handleClose();
    };

    const handleConfirmNonConcur = async (nonConcurId) => {
        await axios.patch(`http://localhost:8080/approvals/sme/${nonConcurId.Request_ID}`, {
            sme_status: "Rejected",
        });
        handleClose();
    };

    useEffect(() => {
        fetch("http://localhost:8080/approvals")
            .then((response) => response.json())
            .then((data) => {
                let count = [];
                let thesePendings = []
                let theseRejected = []
                let theseApproved = []
                for (let i = 0; i < data.length; i++) {
                    if (data[i].sme_status === "Pending" && smeCookie.sme[0] === data[i].sme_asset && data[i].SME_ID === data[i].sme_asset) {
                        count.push(data[i]);
                        thesePendings.push(data[i])
                    }
                    if (data[i].sme_status === "Rejected" && smeCookie.sme[0] === data[i].sme_asset && data[i].SME_ID === data[i].sme_asset) {
                        theseRejected.push(data[i])
                    }
                    if (data[i].sme_status === "Approved" && smeCookie.sme[0] === data[i].sme_asset && data[i].SME_ID === data[i].sme_asset) {
                        theseApproved.push(data[i])
                    }
                }
                setCountState(count.length);
                setRequestData(thesePendings);
                setRejected(theseRejected)
                setApproved(theseApproved)
            });
    }, [confirmShow]);

    const renderRejectedTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Your Rejections
        </Tooltip>
    );

    const renderApprovedTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Your Approvals
        </Tooltip>
    );

    console.log(requestData)

    return (
        <div className="smePage">
            <div className="smeheader">
                <nav className="rejectedNav">
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 300, hide: 400 }}
                        overlay={renderRejectedTooltip}
                    >
                        <button onClick={handleShowRejected}>
                            <GppBadTwoToneIcon style={{ height: "40px", width: "40px", color: "#904E55" }} />
                        </button>
                    </OverlayTrigger>
                    <ul className={`rejectedMenuNav ${showRejected ? "RejectedshowMenu" : ""}`}>
                        {rejected.map((rejects) => {
                            return (
                                <div className="rejectedList">
                                    <div className="rejectedListLine"></div>
                                    <li>Operation: {rejects.mission_title}</li>
                                    <li>Submitted by: {rejects.User_first} {rejects.User_last}</li>
                                </div>
                            )
                        })}
                    </ul>
                </nav>
                <img src={logo} alt="alt" />
                <nav className="approvedNav">
                    <OverlayTrigger
                        placement="left"
                        delay={{ show: 300, hide: 400 }}
                        overlay={renderApprovedTooltip}
                    >
                        <button onClick={handleShowApproved}>
                            <GppGoodIcon style={{ height: "40px", width: "40px", color: "#904E55" }} />
                        </button>
                    </OverlayTrigger>
                    <ul className={`approvedMenuNav ${showApproved ? "approvedShowMenu" : ""}`}>
                        {approved.map((approvals) => {
                            return (
                                <div className="approvedList">
                                    <div className="approvedListLine"></div>
                                    <li>Operation: {approvals.mission_title}</li>
                                    <li>Submitted by: {approvals.User_first} {approvals.User_last}</li>
                                </div>
                            )
                        })}
                    </ul>
                </nav>
            </div>
            <h1>
                Welcome! You have {countState} Pending requests
            </h1>
            <div className="smeCardContainer">
                {requestData.map((card) => {
                    return (
                        <div className="smecard" key={card.Request_ID}>
                            <div>
                                <div className="smeImg">
                                    <img
                                        src={card.image_url}
                                        alt="where did it go?!"
                                    />
                                </div>
                                <h2>{card.asset_name}</h2>
                                <h4>Mission: {card.mission_title}</h4>
                                <h4>Location: {card.location}</h4>
                                <h4>Dates: {card.date}</h4>
                                <h5>Submitted by: {card.User_first} {card.User_last}</h5>
                                <div>
                                    <div className="smejustification">
                                        <h5>
                                            Justification
                                            {show.includes(card.Request_ID) ? (
                                                <button
                                                    type="submit"
                                                    onClick={() => {
                                                        toggleHandler(card.Request_ID);
                                                    }}
                                                >
                                                    <MdArrowCircleUp
                                                        style={{
                                                            width: "20px",
                                                            height: "20px",
                                                            color: "#252627",
                                                        }}
                                                    />
                                                </button>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    onClick={() => {
                                                        toggleHandler(card.Request_ID);
                                                    }}
                                                >
                                                    <MdArrowCircleDown
                                                        style={{
                                                            width: "20px",
                                                            height: "20px",
                                                            color: "#252627",
                                                        }}
                                                    />
                                                </button>
                                            )}
                                        </h5>
                                    </div>
                                    {show.includes(card.Request_ID) ? (
                                        <>
                                            <p>{card.justification}</p>
                                            <a href={`http://localhost:8080/uploads/${card.file}`}>Supporting Docs</a>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="concurButtons">
                                    <button className="reject" onClick={() => { handleClickedNonConcur(card) }}>
                                        Reject
                                    </button>
                                    <button className="approve" onClick={() => { handleClickedConcur(card) }}>
                                        Approve
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <Modal className="text-center" centered show={rejectConfirmShow} onHide={handleClose}>
                    <Modal.Body>Are you sure you want to REJECT this request?</Modal.Body>
                    <div className="smeAlert">
                        <Button onClick={() => handleConfirmNonConcur(nonConcurId)} variant="outline-success">
                            Yes
                        </Button>
                        <Button onClick={handleClose} variant="outline-danger">
                            No
                        </Button>
                    </div>
                </Modal>
                <Modal className="text-center" centered show={approveConfirmShow} onHide={handleClose}>
                    <Modal.Body>Are you sure you want to APPROVE this request?</Modal.Body>
                    <div className="smeAlert">
                        <Button onClick={() => handleConfirmConcur(concurId)} variant="outline-success">
                            Yes
                        </Button>
                        <Button onClick={handleClose} variant="outline-danger">
                            No
                        </Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default SME;
