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

  const handleClose = () => {
    setConfirmShow(false);
    setApproveConfirmShow(false);
    setRejectConfirmShow(false);
  };

  const handClickedConcur = (rowId) => {
    console.log("concurId", rowId);
    setApproveConfirmShow(true);
    setConcurId(rowId);
    setConfirmShow(true);
  };
  const handleClickednonConcurId = (rowId) => {
    console.log("nonConcurId", rowId);
    setRejectConfirmShow(true);
    setNonConcurId(rowId);
    setConfirmShow(true);
  };
  const handleConcurApprove = async (concurId) => {
    await axios.patch(`http://localhost:8080/approvals/${concurId}`, {
      status: "Approved",
    });
    handleClose();
  };
  const handConfirmnonConcurId = async (nonConcurId) => {
    await axios.patch(`http://localhost:8080/approvals/${nonConcurId}`, {
      status: "Rejected",
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
        if (data[i].status === "Pending") count.push(data[i]);
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
          .sort((a) => (a.status === "Pending" ? -1 : 1))
          .map((card) => {
            return (
              <div key={card.Request_ID}>
                <Card
                  variant="outlined"
                  sx={() => ({
                    width: 375,
                    height: 450,
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
                    <Typography variant="body2" color="text.secondary">
                      {card.justification}
                    </Typography>
                  </CardContent>

                  {card.status === "Pending" ? (
                    <div alignitems="center">
                      <Badge pill bg="warning">
                        {card.status}
                      </Badge>
                      <CardActions>
                        <Button
                          color="error"
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            handleClickednonConcurId(card.Request_ID);
                          }}
                        >
                          Non Concur
                        </Button>
                        <Button
                          onClick={() => {
                            handClickedConcur(card.Request_ID);
                          }}
                          color="success"
                          variant="outlined"
                          size="small"
                        >
                          Concur
                        </Button>
                      </CardActions>
                    </div>
                  ) : card.status === "Approved" ? (
                    <h3>
                      <Badge
                        onClick={() =>
                          handleClickednonConcurId(card.Request_ID)
                        }
                        pill
                        bg="success"
                      >
                        {card.status}
                      </Badge>
                      <ModeEditOutlineOutlinedIcon
                        color="error"
                        onClick={() =>
                          handleClickednonConcurId(card.Request_ID)
                        }
                      />
                    </h3>
                  ) : (
                    <h3>
                      <Badge
                        onClick={() => handClickedConcur(card.Request_ID)}
                        pill
                        bg="danger"
                      >
                        {card.status}
                      </Badge>
                      <ModeEditOutlineOutlinedIcon
                        color="success"
                        onClick={() => handClickedConcur(card.Request_ID)}
                      />
                    </h3>
                  )}
                </Card>
              </div>
            );
          })}
        <Modal show={rejectConfirmShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Non Concur!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to Non Concur with this request?
          </Modal.Body>
          <Button
            color="error"
            variant="contained"
            onClick={() => handConfirmnonConcurId(nonConcurId)}
          >
            Confirm
          </Button>
          <Button color="error" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Modal>
        <Modal show={approveConfirmShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Concur!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to Concur with this request?
          </Modal.Body>
          <Button
            color="success"
            variant="contained"
            onClick={() => handleConcurApprove(concurId)}
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
