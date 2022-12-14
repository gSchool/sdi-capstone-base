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
  await knex
    .select("*")
    .from("sme_approver")
    .then((data) => {
      res.status(200).json(data);
    });
});


router.get('/:id', async (req, res) => {
  const assetID = req.params.id;
  await knex
    .select("*")
    .from("asset")
    .innerJoin("sme_approver", "asset.sme_id", "sme_approver.id")
    .where("asset.id", assetID)
    .then((data) => {
      res.status(200).json(data);
    });
});

router.post("/", async (req, res) => {
  try {
    await knex("sme_approver").insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      unit: req.body.unit,
      position: req.body.position,
      password: req.body.password,
      phone_number: req.body.phone_number,
      email: req.body.email,
      type: req.body.type,
      sme_asset: req.body.sme_asset
    });

    let responseString =
      "New SME Added: " + req.body.first_name + " " + req.body.last_name;
    res.status(201).send(responseString);
  } catch (e) {
    console.log("Error in adding unit:", e);
  }
});
