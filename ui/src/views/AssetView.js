// import React from "react";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
// import axios from "axios";
//

// export default function AssetView() {
//   const handleRemove = () => {};

//   const handleRequest = () => {};

//   return (
//     <>
//       <Header />
//       <Card style={{ width: "18rem" }}>
//         <Card.Img
//           variant="top"
//           src="https://c.files.bbci.co.uk/AD05/production/_123139244_reaper_getty.jpg"
//         ></Card.Img>
//         <Card.Body>
//           <Card.Title>This is a title</Card.Title>
//           <Card.Text>This is a placeholder</Card.Text>
//           <ButtonGroup>
//             <Button variant="outline-danger" onClick={() => handleRemove()}>
//               Remove
//             </Button>
//             <Button variant="outline-success" onClick={() => handleRequest()}>
//               Request
//             </Button>
//           </ButtonGroup>
//         </Card.Body>
//       </Card>
//     </>
//   );
// }

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import Header from "../Components/Header1";

export default function AssetView() {
  const theme = useTheme();

  return (
    <>
      <Header />
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="https://c.files.bbci.co.uk/AD05/production/_123139244_reaper_getty.jpg"
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              Title
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Description
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton aria-label="previous">
              {theme.direction === "rtl" ? (
                <AddCircleRoundedIcon />
              ) : (
                <RemoveCircleRoundedIcon />
              )}
            </IconButton>
            <IconButton aria-label="play/pause"></IconButton>
            <IconButton aria-label="next">
              {theme.direction === "rtl" ? (
                <RemoveCircleRoundedIcon />
              ) : (
                <AddCircleRoundedIcon />
              )}
            </IconButton>
          </Box>
        </Box>
      </Card>
    </>
  );
}
