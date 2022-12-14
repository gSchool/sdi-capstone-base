import "../App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "@fontsource/public-sans";
import Badge from "react-bootstrap/Badge";
import AspectRatio from "@mui/joy/AspectRatio";
import Container from "@mui/material/Container";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { MdArrowCircleDown, MdArrowCircleUp } from "react-icons/md";
import { useCookies } from "react-cookie";

function SME() {
  const [requestData, setRequestData] = useState([]);
  const [approveConfirmShow, setApproveConfirmShow] = useState(false);
  const [nonConcurId, setNonConcurId] = useState("");
  const [concurId, setConcurId] = useState("");
  const [rejectConfirmShow, setRejectConfirmShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const [countState, setCountState] = useState(0);
  const [smeCookie, setSmeCookie] = useCookies(["sme"]);
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

  const handleClickedConcur = (rowId) => {
    console.log("concurId", rowId);
    setApproveConfirmShow(true);
    setConcurId(rowId);
    setConfirmShow(true);
  };
  const handleClickedNonConcur = (rowId) => {
    console.log("nonConcurId", rowId);
    setRejectConfirmShow(true);
    setNonConcurId(rowId);
    setConfirmShow(true);
  };
  const handleConfirmConcur = async (concurId) => {
    await axios.patch(`http://localhost:8080/approvals/SME/${concurId}`, {
      sme_status: "Approved",
    });
    handleClose();
  };
  const handleConfirmNonConcur = async (nonConcurId) => {
    await axios.patch(`http://localhost:8080/approvals/SME/${nonConcurId}`, {
      sme_status: "Rejected",
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
          data[i].sme_status === "Pending" &&
          smeCookie.sme[0] === data[i].SME_ID
        )
          count.push(data[i]);
        setCountState(count.length);
      }
      setRequestData(data);
    };
    getRequestData();
  }, [confirmShow]);
  return (
    <div>
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
          .sort((a) => (a.sme_status === "Pending" ? -1 : 1))
          .map((card) => {
            return card.SME_ID === smeCookie.sme[0] ? (
              <div key={card.Request_ID}>
                <Card
                  variant="outlined"
                  sx={() => ({
                    width: 375,
                    height: 525,
                    gridColumn: "span 3",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    margin: "1px",
                    resize: "horizontal",
                    overflow: "hidden",
                    gap: "clamp(3px, (100% - 360px + 32px) * 999, 16px)",
                    transition: "transform 0.3s, border 0.3s",
                    "&:hover": {
                      borderColor: "lightBlue",
                      border: "5px",
                      transform: "translateY(-10px)",
                    },
                    "& > *": {
                      minWidth: "clamp(0px, (360px - 100%) * 999,100%)",
                    },
                  })}
                >
                  <AspectRatio
                    variant="soft"
                    sx={{
                      flexGrow: 3,
                      display: "contents",
                      "--AspectRatio-paddingBottom":
                        "clamp(0px, (100% - 360px) * 999, min(calc(100% / (16 / 9)), 300px))",
                    }}
                  >
                    <img src={card.image_url} loading="lazy" alt="sdfa" />
                  </AspectRatio>
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
                        <Typography>{card.justification}</Typography>
                      ) : (
                        ""
                      )}
                    </div>
                  </CardContent>
                  {card.sme_status === "Rejected" ? (
                    <Badge bg="danger">SME Non Concurred</Badge>
                  ) : card.sme_status === "Pending" ? (
                    <Badge bg="warning">Pending SME Concurence </Badge>
                  ) : (
                    <Badge bg="success">SME Concurred </Badge>
                  )}
                  {card.sme_status === "Pending" ? (
                    <div alignitems="center">
                      <CardActions>
                        <div className="buttonGroup">
                          <Button
                            color="error"
                            variant="outlined"
                            size="small"
                            onClick={() => {
                              handleClickedNonConcur(card.Request_ID);
                            }}
                          >
                            Reject
                          </Button>
                          <Button
                            onClick={() => {
                              handleClickedConcur(card.Request_ID);
                            }}
                            color="success"
                            variant="outlined"
                            size="small"
                          >
                            Approve
                          </Button>
                        </div>
                      </CardActions>
                    </div>
                  ) : card.cmd_status === "Approved" ? (
                    <h6 className="commanderStatus">
                      <Badge bg="success">Commander {card.cmd_status}</Badge>
                    </h6>
                  ) : card.cmd_status === "Pending" ? (
                    <h6 className="commanderStatus">
                      <Badge bg="warning">
                        Commander Approval is {card.cmd_status}
                      </Badge>
                    </h6>
                  ) : (
                    <h6 className="commanderStatus">
                      <Badge bg="danger">Commander {card.cmd_status}</Badge>
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
            onClick={() => handleConfirmNonConcur(nonConcurId)}
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
            onClick={() => handleConfirmConcur(concurId)}
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

export default SME;
