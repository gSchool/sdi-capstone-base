import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid'
import Container from "@mui/material/Container"
import Header from "../Components/Header";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AssetCard from "./AssetCard";

export default function AssetView() {
  const location = useLocation();
  const assetType = location.state.type;
  const [assetData, setAssetData] = useState([]);
  const [cartData, setCartData] = useState([]);

  let userId = parseInt(location.state.user.userToken);

  const url = `http://localhost:8080/assets/${assetType}`;

  useEffect(() => {
    const getAssetData = async () => {
      const response = await axios.get(url);
      const data = await response.data;
      setAssetData(data);
    };
    getAssetData();
  }, [location.state.type]);

  useEffect(() => {
    localStorage.setItem("cartInfo", JSON.stringify(cartData));
  }, [cartData]);

  const handleAdd = async (event, asset) => {
    const inCart = await axios.get(`http://localhost:8080/cart/${userId}?asset_id=${asset.id}`)
    const data = await inCart.data;

    if (data.length > 0) {
      return console.log("This item has already been added to your cart")
    }

    const cartItem = {
      asset_id: asset.id,
      user_id: userId
    };
    axios.post('http://localhost:8080/cart', cartItem)
  };

  console.log(cartData);

  return (
    <>
      <Header />
      <Container>
        <Grid container spacing={3} >
          {assetData.map((asset) => (
            <Grid item key={asset.id} xs={2} md={6} >
              <AssetCard asset={asset} handleAdd={handleAdd} />
            </Grid>
          ))}
        </Grid>
      </Container>

    </>
  );
}
