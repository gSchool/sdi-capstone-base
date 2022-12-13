import React from "react";

function SingleBar({ width, height, data, color, stat }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <svg style={{ marginLeft: 5 }} width={width} height={height}>
        <path
          style={{
            animation: "bounce linear 600ms",
            transformOrigin: "50% 100%",
            margin: "auto"
          }}
          d={data}
          fill={color}
        />
      </svg>
      <p style={{ fontSize: 12 }}>{stat}</p>
    </div>
  );
}

export default SingleBar;