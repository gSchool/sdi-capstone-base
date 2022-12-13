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
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Toast from "react-bootstrap/Toast";

function Approver() {
  const [requestData, setRequestData] = useState([]);
  const [approveConfirmShow, setApproveConfirmShow] = useState(false);
  const [rejectId, setRejectId] = useState("");
  const [approveId, setApproveId] = useState("");
  const [rejectConfirmShow, setRejectConfirmShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const [countState, setCountState] = useState(0);
  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);

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
          .sort((a) => (a.cmd_status === "Pending" ? -1 : 1))
          .map((card) => {
            return card.sme_status !== "Pending" ? (
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
                    <Typography gutterBottom variant="h5" component="div">
                      {card.asset_name}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                      Location: {card.location}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                      Operation {card.mission_title}
                    </Typography>
                    <Button onClick={toggleShowA} bg="info" variant="contained">
                      Show <strong>Justification</strong>
                    </Button>
                    <Toast show={showA} onClose={toggleShowA}>
                      <Toast.Header>
                        <strong className="me-auto">Justification</strong>
                        <small>
                          Requested by {card.User_first} on {card.date}
                        </small>
                      </Toast.Header>
                      <Toast.Body>{card.justification}</Toast.Body>
                    </Toast>
                  </CardContent>
                  {card.sme_status === "Rejected" ? (
                    <Badge bg="danger">SME Non Concurred</Badge>
                  ) : (
                    <Badge bg="success">SME Concurred </Badge>
                  )}
                  {card.cmd_status === "Pending" ? (
                    <div alignitems="center">
                      <Badge bg="warning">{card.cmd_status}</Badge>
                      <CardActions>
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
                      </CardActions>
                    </div>
                  ) : card.cmd_status === "Approved" ? (
                    <h3>
                      <Badge
                        onClick={() => handleClickedReject(card.Request_ID)}
                        pill
                        bg="success"
                      >
                        {card.cmd_status}
                      </Badge>
                      <ModeEditOutlineOutlinedIcon
                        color="error"
                        onClick={() => handleClickedReject(card.Request_ID)}
                      />
                    </h3>
                  ) : (
                    <h3>
                      <Badge
                        onClick={() => handleClickApproved(card.Request_ID)}
                        pill
                        bg="danger"
                      >
                        {card.cmd_status}
                      </Badge>
                      <ModeEditOutlineOutlinedIcon
                        color="success"
                        onClick={() => handleClickApproved(card.Request_ID)}
                      />
                    </h3>
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
