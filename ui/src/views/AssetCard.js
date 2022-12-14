import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const AssetCard = ({ asset, handleAdd }) => {
  console.log(asset)

  return (
    <Card elevation={3} style={{ height: '100%', backgroundColor: "#bfb48f" }}>
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
        <Button size="small" color="primary"

          onClick={(e) => {
            handleAdd(e, asset);
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default AssetCard;