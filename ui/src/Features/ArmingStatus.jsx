import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Title from "../Title";

export default function GreenPulse() {
  const useStyles = makeStyles({
    pulse: {
      background: "Green",
      borderRadius: "50%",
      margin: 10,
      height: 20,
      width: 20,
      boxShadow: "0 0 0 0 #4bbd00",
      transform: "scale(1)",
      animation: "$pulse 2s infinite"
    },
    "@keyframes pulse": {
      "0%": {
        transform: "scale(0.95)",
        boxShadow: "0 0 0 0 #4bbd00"
      },
      "70%": {
        transform: "scale(1)",
        boxShadow: "0 0 0 10px #4bbd00"
      },
      "100%": {
        transform: "scale(0.95)",
        boxShadow: "0 0 0 0 #4bbd00"
      }
    }
  });

  const classes = useStyles();

  return (
    <>
      <Title title="Pulse" />
      <div className={classes.pulse}></div>
    </>
  );
}
