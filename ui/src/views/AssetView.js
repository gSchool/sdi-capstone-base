import React, { useState, useEffect } from "react";
// import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import Header from "../Components/Header";
import { useLocation } from "react-router-dom";
import axios from 'axios';

export default function AssetView() {
  // const theme = useTheme();
  const location = useLocation();
  const assetType = location.state.type;
  const [assetData, setAssetData] = useState([]);

  const url = `http://localhost:8080/assets/${assetType}`


  useEffect(() => {
    const getAssetData = async () => {
      const response = await axios.get(url);
      const data = await response.data;
      setAssetData(data);
    };
    getAssetData();
  }, []);

  console.log(assetData)


  return (
    <>
      <Header />
      {assetData.map(asset => (
        <Card alignItems="center"
          justify="center"
          key={asset.id}
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <CardMedia
            component="img"
            sx={{ width: 500 }}
            image={asset.image_url}
            alt="Live from space album cover"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {asset.asset_name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {asset.description}
              </Typography>

              <IconButton aria-label="remove">
                <RemoveCircleRoundedIcon fontSize="large" color="error" />
              </IconButton>
              <IconButton>
                <AddCircleRoundedIcon fontSize="large" color="success" />
              </IconButton>
            </CardContent>
          </Box>
        </Card>
      ))}

    </>
  );
}
