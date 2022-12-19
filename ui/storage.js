


//////

import "../App.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useEffect, useState } from "react";
import axios from "axios";
import RoomIcon from "@mui/icons-material/Room";
import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";

function Map() {
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [requestData, setRequestData] = useState([]);

  const [viewport, setViewport] = useState({
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 4,
  });

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
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
          ApprovalStatus: requestData[i].cmd_status,
          long: 33.9391,
          lat: 67.71,
        });
      } else if (requestData[i].location === "Mexico City") {
        pins.push({
          _id: requestData[i].Request_ID,
          Operation: requestData[i].mission_title,
          Country: requestData[i].location,
          SMECONC: requestData[i].sme_status,
          ApprovalStatus: requestData[i].cmd_status,
          long: 19.4326,
          lat: 99.1332,
        });
      } else if (requestData[i].location === "Greece") {
        pins.push({
          _id: requestData[i].Request_ID,
          Operation: requestData[i].mission_title,
          Country: requestData[i].location,
          SMECONC: requestData[i].sme_status,
          ApprovalStatus: requestData[i].cmd_status,
          long: 39.0742,
          lat: 21.8243,
        });
      } else if (requestData[i].location === "Virgin Islands") {
        pins.push({
          _id: requestData[i].Request_ID,
          Operation: requestData[i].mission_title,
          Country: requestData[i].location,
          SMECONC: requestData[i].sme_status,
          ApprovalStatus: requestData[i].cmd_status,
          long: 18.3358,
          lat: 64.8963,
        });
      } else if (requestData[i].location === "Cancun") {
        pins.push({
          _id: requestData[i].Request_ID,
          Operation: requestData[i].mission_title,
          Country: requestData[i].location,
          SMECONC: requestData[i].sme_status,
          ApprovalStatus: requestData[i].cmd_status,
          long: 21.1619,
          lat: 86.8515,
        });
      } else if (requestData[i].location === "Spain") {
        pins.push({
          _id: requestData[i].Request_ID,
          Operation: requestData[i].mission_title,
          Country: requestData[i].location,
          SMECONC: requestData[i].sme_status,
          ApprovalStatus: requestData[i].cmd_status,
          long: 40.4637,
          lat: 3.7492,
        });
      }
    }
    console.log("pins", pins);
  };

  useEffect(() => {
    const getRequestData = async () => {
      const response = await axios.get("http://localhost:8080/approvals");
      const data = await response.data;
      setRequestData(data);
      assignPins(data);
    };
    getRequestData();
  }, []);

  return (
    <>
      <div style={{ height: "100vh", width: "100%" }}>
        <ReactMapGL
          viewport
          mapboxAccessToken="pk.eyJ1Ijoicm9tbWF0dDQiLCJhIjoiY2xicDk1N296MDV1cjNvbndrb2E1ZG52dCJ9.gRKG6MbVOmJ-hw2a421DSQ"
          width="100%"
          height="100%"
          transitionDuration="200"
          mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
          onViewportChange={(viewport) => setViewport(viewport)}
          onDblClick={handleAddClick}
        >
          <Marker
            latitude={34.444}
            longitude={44.444}
            offsetLeft={-3.5 * viewport.zoom}
            offsetTop={-7 * viewport.zoom}
          >
            <RoomIcon
              style={{
                fontSize: 7 * viewport.zoom,
                color: "slateblue",
                cursor: "pointer",
              }}
            />
          </Marker>
          {pins.map((p, i) => {
            return (
              <div key={i}>
                {console.log("hello")}
                <Marker
                  latitude={p[i].lat}
                  longitude={p[i].long}
                  offsetLeft={-3.5 * viewport.zoom}
                  offsetTop={-7 * viewport.zoom}
                >
                  <RoomIcon
                    style={{
                      fontSize: 7 * viewport.zoom,
                      color: "slateblue",
                      cursor: "pointer",
                    }}
                    onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                  />
                </Marker>
                {p._id === currentPlaceId && (
                  <Popup
                    key={i}
                    latitude={p[i].lat}
                    longitude={p[i].long}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setCurrentPlaceId(null)}
                    anchor="left"
                  >
                    <div className="card">
                      <label>Operation</label>
                      <h4 className="place">{p[i].Operation}</h4>
                      <label>SME Concurrence</label>
                      <p className="desc">{p[i].SMECONC}</p>
                      <label>Approval</label>
                      <p className="desc">{p[i].ApprovalStatus}</p>
                      <label>SME Conccurence</label>
                      <span className="username">
                        Created by <b>{p[i].SMECONC}</b>
                      </span>
                    </div>
                  </Popup>
                )}
              </div>
            );
          })}
        </ReactMapGL>
      </div>
    </>
  );
}

export default Map;
