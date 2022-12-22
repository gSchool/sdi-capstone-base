import "../App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Approver.css";
import "@fontsource/public-sans";
import logo from "../img/logo.png";
import Modal from "react-bootstrap/Modal";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Link } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import Button from 'react-bootstrap/Button';

import { MdArrowCircleDown, MdArrowCircleUp } from "react-icons/md";

function Approver() {
    const [requestData, setRequestData] = useState([]);
    const [approveConfirmShow, setApproveConfirmShow] = useState(false);
    const [rejectId, setRejectId] = useState("");
    const [approveId, setApproveId] = useState("");
    const [rejectConfirmShow, setRejectConfirmShow] = useState(false);
    const [confirmShow, setConfirmShow] = useState(false);
    const [countState, setCountState] = useState(0);

    const [show, setShow] = useState([]);

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

    const handleClickApproved = (rowId) => {
        setApproveConfirmShow(true);
        setApproveId(rowId);
        setConfirmShow(true);
    };
    const handleClickedReject = (rowId) => {
        setRejectConfirmShow(true);
        setRejectId(rowId);
        setConfirmShow(true);
    };
    const handleConfirmApprove = async (approveId) => {
        await axios.patch(`http://localhost:8080/approvals/cmd/${approveId}`, {
            cmd_status: "Approved",
        });
        handleClose();
    };
    const handleConfirmReject = async (rejectId) => {
        await axios.patch(`http://localhost:8080/approvals/cmd/${rejectId}`, {
            cmd_status: "Rejected",
        });
        handleClose();
    };

    useEffect(() => {
        const getRequestData = async () => {
            let count = [];
            const response = await axios.get("http://localhost:8080/approvals");
            const data = await response.data;
            //looping to show the CDR how many pending requests he has
            for (let i = 0; i < data.length; i++) {
                if (
                    data[i].cmd_status === "Pending" &&
                    data[i].sme_status !== "Pending"
                )
                    count.push(data[i]);
                setCountState(count.length);
            }
            setRequestData(data);
        };
        getRequestData();
    }, [confirmShow]);

    console.log(requestData)

    return (
        <div className="ApproverPage">
            <div className="approverHeader">
                <img src={logo} alt="alt" />
                <Link to={`/map`}>
                    {" "}
                    <PublicIcon
                        style={{ marginLeft: "100px", fontSize: 45, color: "#904E55" }}
                    />
                </Link>
            </div>
            <h1>
                Welcome! You have {countState} Pending requests
            </h1>
            <div>
                {requestData

                    .sort((a, b) =>
                        a.cmd_status === "Pending" && a.Request_ID > b.Request_ID ? -1 : ""
                    )
                    .map((card) => {
                        return card.sme_status !== "Pending" ? (
                            <>
                                <div className="approverGrid" key={card.Request_ID}>
                                    <div className="approverGridStart">
                                        <h4>Mission: {card.mission_title}</h4>
                                        <h4>Location: {card.location}</h4>
                                        <div>
                                            <div className="approverJustification">
                                                <h4>
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
                                                                    width: "25px",
                                                                    height: "25px",
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
                                                                    width: "25px",
                                                                    height: "25px",
                                                                    color: "#252627",
                                                                }}
                                                            />
                                                        </button>
                                                    )}
                                                </h4>
                                            </div>
                                            {show.includes(card.Request_ID) ? (
                                                <div>
                                                    <p>{card.justification}</p> 
                                                    <p>{card.file === "No File Uploaded" ? "" : <a href={`http://localhost:8080/uploads/${card.file}`}>Supporting Docs</a>}</p>
                                                    <p>{card.date}</p>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div className="approverGridMid">
                                        <h2>{card.asset_name}</h2>
                                        <img
                                            height="250"
                                            width="375"
                                            src={card.image_url}
                                            alt="where did it go?!"
                                        />
                                    </div>
                                    <div className="approverGridEnd">
                                        <h4>
                                            Requested by: {card.User_first} {card.User_last}
                                        </h4>
                                        {card.sme_status === "Rejected" ? (
                                            <h4 style={{color:"#904E55"}}>SME Non Concurred</h4>
                                        ) : (
                                            <h4 style={{color:"#5b904e"}}>SME Concurred </h4>
                                        )}
                                        {card.cmd_status === "Pending" ? (
                                            <div alignitems="center">
                                                <div className="concurButtons">
                                                    <button className="reject" onClick={() => {
                                                        handleClickedReject(card.Request_ID);
                                                    }}>
                                                        Reject
                                                    </button>
                                                    <button className="approve" onClick={() => {
                                                        handleClickApproved(card.Request_ID);
                                                    }}>
                                                        Approve
                                                    </button>
                                                </div>
                                            </div>
                                        ) : card.cmd_status === "Approved" ? (
                                            <div className="approval">
                                                <button className="approved" disabled="disabled">
                                                    You Approved
                                                </button>

                                                <ModeEditOutlineOutlinedIcon cursor="pointer"
                                                    onClick={() => handleClickedReject(card.Request_ID)}
                                                />
                                            </div>
                                        ) : (
                                            <div className="approval">
                                                <button className="rejected" disabled="disabled">
                                                    You Rejected
                                                </button>

                                                <ModeEditOutlineOutlinedIcon cursor="pointer"
                                                    onClick={() => handleClickApproved(card.Request_ID)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            ""
                        );
                    })}
                <Modal className="text-center" centered show={rejectConfirmShow} onHide={handleClose}>
                    <Modal.Body>Are you sure you want to REJECT this request?</Modal.Body>
                    <div className="smeAlert">
                        <Button onClick={() => handleConfirmReject(rejectId)} variant="outline-success">
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
                        <Button onClick={() => handleConfirmApprove(approveId)}variant="outline-success">
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

export default Approver;
