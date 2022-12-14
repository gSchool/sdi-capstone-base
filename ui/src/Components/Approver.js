import "../App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import "../Approver.css";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "@fontsource/public-sans";
import Badge from "react-bootstrap/Badge";
import logo from "../img/logo.png";
import Container from "@mui/material/Container";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Header from "./Header";

import { MdArrowCircleDown, MdArrowCircleUp } from "react-icons/md";
import "../Approver.css";

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
    console.log("approveId", rowId);
    setApproveConfirmShow(true);
    setApproveId(rowId);
    setConfirmShow(true);
  };
  const handleClickedReject = (rowId) => {
    console.log("rejectId", rowId);
    setRejectConfirmShow(true);
    setRejectId(rowId);
    setConfirmShow(true);
  };
  const handleConfirmApprove = async (approveId) => {
    await axios.patch(`http://localhost:8080/approvals/${approveId}`, {
      cmd_status: "Approved",
    });
    handleClose();
  };
  const handleConfirmReject = async (rejectId) => {
    await axios.patch(`http://localhost:8080/approvals/${rejectId}`, {
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

  console.log("REQUEST DATA ", requestData);
  return (
    <div>
      <div className="loginheader">
        <img src={logo} alt="alt" />
      </div>
      <Header></Header>
      <h1>
        <Alert variant="warning">
          Welcome! You have {countState} Pending requests
        </Alert>
      </h1>
      <Container
        sx={{
          display: "flex",
          gridColumn: "span 2",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {requestData

          .sort((a, b) =>
            a.cmd_status === "Pending" && a.Request_ID > b.Request_ID ? -1 : 1
          )
          .map((card) => {
            return card.sme_status !== "Pending" ? (
              <div key={card.Request_ID}>
                <Card
                  variant="outlined"
                  sx={() => ({
                    width: 375,
                    height: 550,
                    gridColumn: "span 3",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    margin: "1px",
                    boxShadow: "5px",

                    resize: "horizontal",
                    overflow: "hidden",
                    gap: "clamp(3px, (100% - 360px + 32px) * 999, 16px)",
                    transition: "transform 0.3s, border 0.3s",
                    "&:hover": {
                      border: "3px solid rgb(7, 188, 200)",
                      transform: "translateY(-10px)",
                    },
                    "& > *": {
                      minWidth: "clamp(0px, (360px - 100%) * 999,100%)",
                    },
                  })}
                >
                  <div className="cartImg">
                    <img
                      height="250"
                      width="375"
                      src={card.image_url}
                      alt="where did it go?!"
                    />
                  </div>

                  <CardContent>
                    <Typography
                      className="assetname"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {card.asset_name}
                    </Typography>

                    <Typography
                      className="assetname"
                      gutterBottom
                      variant="h7"
                      component="div"
                    >
                      Location: {card.location}
                    </Typography>
                    <Typography
                      className="assetname"
                      gutterBottom
                      variant="h7"
                      component="div"
                    >
                      Operation {card.mission_title}
                    </Typography>
                    <div>
                      <div className="requestTitle">
                        <h2>
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
                                  color: "black",
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
                                  color: "black",
                                }}
                              />
                            </button>
                          )}
                        </h2>
                      </div>
                      {show.includes(card.Request_ID) ? (
                        <div>
                          <Typography
                            className="assetname"
                            gutterBottom
                            component="div"
                          >
                            Requested by: {card.User_first}
                          </Typography>
                          <Typography>{card.justification}</Typography>{" "}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </CardContent>
                  <div className="buttonContainer">
                    {card.sme_status === "Rejected" ? (
                      <Badge bg="danger">SME Non Concurred</Badge>
                    ) : (
                      <Badge bg="success">SME Concurred </Badge>
                    )}
                  </div>
                  {card.cmd_status === "Pending" ? (
                    <div alignitems="center">
                      <Badge bg="warning">{card.cmd_status} Approval</Badge>
                      <div className="buttonGroup">
                        <Button
                          color="error"
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            handleClickedReject(card.Request_ID);
                          }}
                        >
                          Reject
                        </Button>
                        <Button
                          onClick={() => {
                            handleClickApproved(card.Request_ID);
                          }}
                          color="success"
                          variant="outlined"
                          size="small"
                        >
                          Approve
                        </Button>
                      </div>
                    </div>
                  ) : card.cmd_status === "Approved" ? (
                    <h6 className="commanderStatus">
                      <Badge
                        onClick={() => handleClickedReject(card.Request_ID)}
                        bg="success"
                      >
                        You {card.cmd_status}
                      </Badge>
                      <ModeEditOutlineOutlinedIcon
                        onClick={() => handleClickedReject(card.Request_ID)}
                      />
                    </h6>
                  ) : (
                    <h6 className="commanderStatus">
                      <Badge
                        onClick={() => handleClickApproved(card.Request_ID)}
                        pill
                        bg="danger"
                      >
                        You {card.cmd_status}
                      </Badge>
                      <ModeEditOutlineOutlinedIcon
                        onClick={() => handleClickApproved(card.Request_ID)}
                      />
                    </h6>
                  )}
                </Card>
              </div>
            ) : (
              ""
            );
          })}
        <Modal show={rejectConfirmShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Reject!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to Reject this request?</Modal.Body>
          <Button
            color="error"
            variant="contained"
            onClick={() => handleConfirmReject(rejectId)}
          >
            Confirm
          </Button>
          <Button color="error" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Modal>
        <Modal show={approveConfirmShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Approve!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to Approve this request?
          </Modal.Body>
          <Button
            color="success"
            variant="contained"
            onClick={() => handleConfirmApprove(approveId)}
          >
            Confirm
          </Button>
          <Button color="error" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Modal>
      </Container>
    </div>
  );
}

export default Approver;
