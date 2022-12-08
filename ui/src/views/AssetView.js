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
            <IconButton aria-label="add">
              <RemoveCircleRoundedIcon fontSize="large" color="error" />
              <AddCircleRoundedIcon fontSize="large" color="success" />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </>
  );
}
