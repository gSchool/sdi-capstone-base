import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IconButton, CardActionArea, CardActions } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const AssetCard = ({ asset, handleAdd }) => {

  return (
    <Card elevation={3} style={{ height: '100%', backgroundColor: "#BAAC9Dff", marginTop: 25 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={asset.image_url}
          alt={asset.description}
          style={{ height: "300px" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {asset.asset_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {asset.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton size="large" style={{ color: "#904E55" }}
          onClick={(e) => { handleAdd(e, asset); }}>
          <AddShoppingCartIcon style={{ height: "35px", width: "35px"}}/>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default AssetCard;
