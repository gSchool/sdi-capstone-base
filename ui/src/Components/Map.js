import "./map.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import BlurCircularSharpIcon from "@mui/icons-material/BlurCircularSharp";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import PublicIcon from "@mui/icons-material/Public";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";

function Map() {
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [requestData, setRequestData] = useState([]);

  const [viewState, setViewState] = useState({
    latitude: 50.196,
    longitude: 6.8712,
    zoom: 2,
  });

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewState({ ...viewState, latitude: lat, longitude: long, zoom: 5 });
  };

  const handleCoordClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewState({ ...viewState, latitude: lat, longitude: long, zoom: 5 });
  };
  const handleZoomOut = () => {
    setViewState({
      ...viewState,
      latitude: 50.196,
      longitude: 6.8712,
      zoom: 2,
    });
  };

  let pins = [];
  const assignPins = (requestData) => {
    for (let i = 0; i < requestData.length; i++) {
      if (requestData[i].location === "Afghanistan") {
        pins.push(...pins, {
          _id: requestData[i].Request_ID,
          Operation: requestData[i].mission_title,
          Country: requestData[i].location,
          SMECONC: requestData[i].sme_status,
          User_first: requestData[i].User_first,
          ApprovalStatus: requestData[i].cmd_status,
          image: requestData[i].image_url,
          long: 67.7561,
          lat: 33.9391,
        });
      } else if (requestData[i].location === "Mexico City") {
        pins.push({
          _id: requestData[i].Request_ID,
          Operation: requestData[i].mission_title,
          Country: requestData[i].location,
          SMECONC: requestData[i].sme_status,
          User_first: requestData[i].User_first,
          ApprovalStatus: requestData[i].cmd_status,
          image: requestData[i].image_url,
          location: requestData[i].location,
          long: -99.1332,
          lat: 19.4326,
        });
      } else if (requestData[i].location === "Greece") {
        pins.push({
          _id: requestData[i].Request_ID,
          Operation: requestData[i].mission_title,
          Country: requestData[i].location,
          SMECONC: requestData[i].sme_status,
          User_first: requestData[i].User_first,
          ApprovalStatus: requestData[i].cmd_status,
          image: requestData[i].image_url,
          location: requestData[i].location,
          long: 21.8243,
          lat: 39.0742,
        });
      } else if (requestData[i].location === "Virgin Islands") {
        pins.push({
          _id: requestData[i].Request_ID,
          Operation: requestData[i].mission_title,
          Country: requestData[i].location,
          SMECONC: requestData[i].sme_status,
          User_first: requestData[i].User_first,
          ApprovalStatus: requestData[i].cmd_status,
          image: requestData[i].image_url,
          location: requestData[i].location,
          long: -64,
          lat: 18.297878,
        });
      } else if (requestData[i].location === "Cancun") {
        pins.push({
          _id: requestData[i].Request_ID,
          Operation: requestData[i].mission_title,
          Country: requestData[i].location,
          User_first: requestData[i].User_first,
          ApprovalStatus: requestData[i].cmd_status,
          image: requestData[i].image_url,
          location: requestData[i].location,
          long: -86.8466,
          lat: 21.1743,
        });
      } else if (requestData[i].location === "Spain") {
        pins.push({
          _id: requestData[i].Request_ID,
          Operation: requestData[i].mission_title,
          Country: requestData[i].location,
          SMECONC: requestData[i].sme_status,
          User_first: requestData[i].User_first,
          ApprovalStatus: requestData[i].cmd_status,
          image: requestData[i].image_url,
          location: requestData[i].location,
          long: 3.7492,
          lat: 40.4637,
        });
      } else if (requestData[i].location === "Hawaii") {
        pins.push({
          _id: requestData[i].Request_ID,
          Operation: requestData[i].mission_title,
          Country: requestData[i].location,
          SMECONC: requestData[i].sme_status,
          User_first: requestData[i].User_first,
          ApprovalStatus: requestData[i].cmd_status,
          image: requestData[i].image_url,
          location: requestData[i].location,
          long: 95.7129,
          lat: 37.0902,
        });
      } else if (requestData[i].location === "Greenland") {
        pins.push({
          _id: requestData[i].Request_ID,
          Operation: requestData[i].mission_title,
          Country: requestData[i].location,
          SMECONC: requestData[i].sme_status,
          User_first: requestData[i].User_first,
          ApprovalStatus: requestData[i].cmd_status,
          image: requestData[i].image_url,
          location: requestData[i].location,
          long: 42.6043,
          lat: 71.7069,
        });
      }
    }
  };

  useEffect(() => {
    const getRequestData = async () => {
      const response = await axios.get("http://localhost:8080/approvals");
      const data = await response.data;
      setRequestData(data);
    };
    getRequestData();
  }, []);
  assignPins(requestData);
  return (
    <div className="mapStyle">
      <div className="mapheader">
        {" "}
        <Link to={"/approver"}>
          <img src={logo} alt="alt"></img>
        </Link>
        <Link to={`/map`}>
          {" "}
          <PublicIcon
            style={{ marginLeft: "100px", fontSize: 50, color: "#904E55" }}
            onClick={() => handleZoomOut()}
          />
        </Link>
      </div>
      <div
        className="map-Container"
        style={{ height: "100vh", width: "100vw" }}
      >
        <ReactMapGL
          // initialViewState={{
          //   longitude: 30,
          //   latitude: 30,
          //   zoom: 2,
          // }}

          mapboxAccessToken="pk.eyJ1Ijoicm9tbWF0dDQiLCJhIjoiY2xicDk1N296MDV1cjNvbndrb2E1ZG52dCJ9.gRKG6MbVOmJ-hw2a421DSQ"
          {...viewState}
          onMove={(newview) => setViewState(newview.viewState)}
          width="100%"
          height="100%"
          projection="globe"
          mapStyle="mapbox://styles/rommatt4/clbqziswh000114oa65bu1hws"
        >
          <div className="sidebar">
            {pins.map((p) => {
              console.log("2", p);
              return (
                <div key={p._id}>
                  Operation:{" "}
                  {p.ApprovalStatus === "Approved" ? (
                    <div>
                      <div style={{ color: "green" }}>{p.Operation}</div>
                      <ZoomInMapIcon
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleCoordClick(p._id, p.lat, p.long);
                        }}
                      />{" "}
                    </div>
                  ) : p.ApprovalStatus === "Pending" ? (
                    <div>
                      <div style={{ color: "yellow" }}>{p.Operation}</div>
                      <ZoomInMapIcon
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleCoordClick(p._id, p.lat, p.long);
                        }}
                      />{" "}
                    </div>
                  ) : (
                    <div>
                      <div style={{ color: "red" }}>{p.Operation}</div>
                      <ZoomInMapIcon
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleCoordClick(p._id, p.lat, p.long);
                        }}
                      />{" "}
                    </div>
                  )}
                </div>
              );
            })}{" "}
          </div>

          {pins.map((p, i) => {
            console.log("p", p);
            return (
              <div className="class" key={i}>
                <Marker
                  latitude={p.lat}
                  longitude={p.long}
                  offsetLeft={-3.5 * viewState.zoom}
                  offsetTop={-7 * viewState.zoom}
                >
                  <BlurCircularSharpIcon
                    style={{
                      fontSize: 10 * viewState.zoom,
                      color:
                        p.ApprovalStatus === "Rejected"
                          ? "red"
                          : p.ApprovalStatus === "Pending"
                          ? "yellow"
                          : "green",
                      cursor: "pointer",
                    }}
                    onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                  />
                </Marker>
                {p._id === currentPlaceId && (
                  <Popup
                    key={p._id}
                    latitude={p.lat}
                    longitude={p.long}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setCurrentPlaceId(null)}
                    anchor="left"
                    style={{
                      background:
                        p.ApprovalStatus === "Approved"
                          ? "green"
                          : p.ApprovalStatus === "Pending"
                          ? "yellow"
                          : "red",
                    }}
                  >
                    <Card
                      variant="contained"
                      sx={() => ({
                        width: 140,
                        height: 140,
                        background: "whitesmoke",
                        gridColumn: "4",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        boxShadow: 30,
                        margin: "3px",
                        padding: 0,
                        border: "3px solid black",
                        resize: "horizontal",
                        overflow: "hidden",
                        gap: "clamp(3px, (100% - 360px + 32px) * 999, 16px)",
                        transition: "transform 1s, border 0.3s",
                        "&:hover": {
                          border: "3px solid rgb(7, 188, 200)",
                        },
                        "& > *": {
                          minWidth: "clamp(0px, (360px - 100%) * 999,100%)",
                        },
                      })}
                    >
                      <div
                        className="mapcartimg"
                        style={{ marginLeft: "20px" }}
                      >
                        <img
                          height="50"
                          width="100"
                          src={p.image}
                          alt="where did it go?!"
                        />
                      </div>

                      <CardContent>
                        <Typography
                          className="assetname"
                          gutterBottom
                          variant="h10"
                          component="div"
                        >
                          Location: {p.location}
                        </Typography>
                        <Typography
                          className="assetname"
                          gutterBottom
                          variant="h10"
                          component="div"
                        >
                          Operation {p.Operation}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Popup>
                )}
              </div>
            );
          })}
        </ReactMapGL>
      </div>
    </div>
  );
}

export default Map;
