import "../App.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useEffect, useState } from "react";
import axios from "axios";
import RoomIcon from "@mui/icons-material/Room";
import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";

function Map() {
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [requestData, setRequestData] = useState([]);
  const [newPlace, setNewPlace] = useState(null);

  const [viewport, setViewport] = useState({
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: -1,
  });

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
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
          long: 67.7561 + Math.floor(Math.random() * 2),
          lat: 33.9391 + Math.floor(Math.random() * 3),
        });
      } else if (requestData[i].location === "Mexico City") {
        pins.push({
          _id: requestData[i].Request_ID,
          Operation: requestData[i].mission_title,
          Country: requestData[i].location,
          SMECONC: requestData[i].sme_status,
          User_first: requestData[i].User_first,
          ApprovalStatus: requestData[i].cmd_status,
          long: -99.1332 + Math.floor(Math.random() * 2),
          lat: 19.4326 + Math.floor(Math.random() * 3),
        });
      } else if (requestData[i].location === "Greece") {
        pins.push({
          _id: requestData[i].Request_ID,
          Operation: requestData[i].mission_title,
          Country: requestData[i].location,
          SMECONC: requestData[i].sme_status,
          User_first: requestData[i].User_first,
          ApprovalStatus: requestData[i].cmd_status,
          long: 21.8243 + Math.floor(Math.random() * 3),
          lat: 39.0742 + Math.floor(Math.random() * 2),
        });
      } else if (requestData[i].location === "Virgin Islands") {
        pins.push({
          _id: requestData[i].Request_ID,
          Operation: requestData[i].mission_title,
          Country: requestData[i].location,
          SMECONC: requestData[i].sme_status,
          User_first: requestData[i].User_first,
          ApprovalStatus: requestData[i].cmd_status,
          long: 64.8963 + Math.floor(Math.random() * 2),
          lat: 18.3358 + Math.floor(Math.random() * 3),
        });
      } else if (requestData[i].location === "Cancun") {
        pins.push({
          _id: requestData[i].Request_ID,
          Operation: requestData[i].mission_title,
          Country: requestData[i].location,
          User_first: requestData[i].User_first,
          ApprovalStatus: requestData[i].cmd_status,
          long: -86.8466 + Math.floor(Math.random() * 3),
          lat: 21.1743 + Math.floor(Math.random() * 2),
        });
      } else if (requestData[i].location === "Spain") {
        pins.push({
          _id: requestData[i].Request_ID,
          Operation: requestData[i].mission_title,
          Country: requestData[i].location,
          SMECONC: requestData[i].sme_status,
          User_first: requestData[i].User_first,
          ApprovalStatus: requestData[i].cmd_status,
          long: 3.7492 + Math.floor(Math.random() * 3),
          lat: 40.4637 + Math.floor(Math.random() * 4),
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
    <div style={{ marginLeft: "200px", height: "100vh", width: "100%" }}>
      <ReactMapGL
        mapboxAccessToken="pk.eyJ1Ijoicm9tbWF0dDQiLCJhIjoiY2xicDk1N296MDV1cjNvbndrb2E1ZG52dCJ9.gRKG6MbVOmJ-hw2a421DSQ"
        width="100%"
        height="100%"
        transitionDuration="200"
        projection="globe"
        mapStyle="mapbox://styles/rommatt4/clbqziswh000114oa65bu1hws"
        onViewportChange={(newview) => setViewport(newview)}
      >
        {pins.map((p, i) => {
          console.log("p", p);
          return (
            <div className="class" key={i}>
              <Marker
                latitude={p.lat}
                longitude={p.long}
                offsetLeft={-3.5 * viewport.zoom}
                offsetTop={-7 * viewport.zoom}
              >
                <RoomIcon
                  style={{
                    fontSize: 3 * viewport.zoom,
                    color: "white",
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
                >
                  <div className="card">
                    <label>Operation</label>
                    <h4 className="place">{p.Operation}</h4>
                    <label>SME {p.SMECONC}</label>
                    <p className="desc"> SME {p.SMECONC}</p>
                    <label>Approval Status</label>
                    <p className="desc">{p.ApprovalStatus}</p>
                    <label>Requested by:</label>
                    <p className="desc">{p.User_first}</p>
                  </div>
                </Popup>
              )}
            </div>
          );
        })}
      </ReactMapGL>
    </div>
  );
}

export default Map;
