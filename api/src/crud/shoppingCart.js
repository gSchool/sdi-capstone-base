const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
module.exports = router;

app.use(express.json());
app.use(cors());

const env = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[env];
const knex = require("knex")(config);

router.get("/", async (req, res) => {
  try {
    let cartList = await knex
      .select("*")
      .from("shopping_cart")
      .innerJoin("all_users", "shopping_cart.user_id", "all_users.id")
      .innerJoin("asset", "shopping_cart.asset_id", "asset.id")
    res.status(200).send(cartList);
  } catch (err) {
    console.log("Error fetching requests: "(err));
  }
});

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  const assetId = req.query.asset_id;
  const inCart = await knex.select('*')
    .from('shopping_cart')
    .where('shopping_cart.user_id', userId)
    .where('shopping_cart.asset_id', assetId)

  res.status(201).send(inCart)
})

router.post('/', async (req, res) => {
  try {
    await knex('shopping_cart').insert({
      'user_id': req.body.user_id,
      'asset_id': req.body.asset_id
    })

    let responseString = 'Added to Cart';
    res.status(201).send(responseString);
  } catch (e) {
    console.log('Error in adding to cart:', e);
  }
});

router.delete('/:id', async (req, res) => {
  const asset_id = req.params.id;
  try {
    await knex('shopping_cart')
      .where('asset_id', asset_id)
      .del()
    let responseString = "Deleted from cart.";
    res.status(201).send(responseString);
  } catch (error) {
    console.log('Error deleting item from cart:', error)
  }
});