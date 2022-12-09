import * as React from "react";
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

export default function AssetView() {
  // const theme = useTheme();

  return (
    <>
      <Header />
      <Card
        alignItems="center"
        justify="center"
        sx={{ display: "flex", flexDirection: "row" }}
      >
        <CardMedia
          component="img"
          sx={{ width: 500 }}
          image="https://c.files.bbci.co.uk/AD05/production/_123139244_reaper_getty.jpg"
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              Title
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              asldfjsadlkfjsadlkfjasldflj;asd;jlkfsjlak;fjsadfjasd;fljsald
              fasdfjasdlfjas;lfjasd
              fasjflksdjf;asldfjsadlkfjsadlkfjasldfljasdjfkasdflj;asldfjsadlkfjsadlkfjasldflj
              ksdlfkjas;lfas;lfjs; fkldshv;dlsknvas
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
    </>
  );
}
