import React from "react";
import ReactMapGl from "react-map-gl";
import { useState } from "react";

export default function Map() {
  const [viewPort, setViewPort] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 31.165581,
    longitude: 48.379433,
    zoom: 10,
  });
  let token = process.env.REACT_APP_MAPBOX_TOKEN;
  return <ReactMapGl {...viewPort} mapboxAccessToken={token}></ReactMapGl>;
}
