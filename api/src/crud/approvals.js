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
    let requestList = await knex
      .select(
        "request.id as Request_ID",
        "date",
        "location",
        "mission_title",
        "justification",
        "sme_status",
        "cmd_status",
        "asset.image_url",
        "all_users.first_name as User_first",
        "all_users.last_name as User_last",
        "sme_approver.first_name as SME_first",
        "sme_approver.last_name as SME_last",
        "cmd_approver.first_name as CMD_first",
        "cmd_approver.last_name as CMD_last",
        "sme_approver.id AS SME_ID",
        "cmd_approver.id as CMD_ID",
        "all_users.id as USER_ID",
        "asset.type",
        "asset.asset_name"
      )
      .from("request")
      .innerJoin("all_users", "request.user_id", "all_users.id")
      .innerJoin("sme_approver", "sme_approver.id", "request.sme_id")
      .innerJoin("cmd_approver", "cmd_approver.id", "request.cmd_id")
      .innerJoin("asset", "asset.id", "request.asset_id");
    res.status(200).send(requestList);
  } catch (err) {
    console.log("Error fetching requests: "(err));
  }
});

router.patch("/:id", async (req, res) => {
  const updatedId = parseInt(req.params.id);
  console.log("reqbody", req.body);
  try {
    let updatedRequest = {
      cmd_status: req.body.cmd_status,
    };
    await knex("request").where("id", updatedId).update(updatedRequest);
    res.status(200).send("Request Updated");
  } catch (e) {
    console.log("Error in patching unit:", e);
  }
});

router.patch("/SME/:id", async (req, res) => {
  const updatedId = parseInt(req.params.id);
  console.log("reqbody", req.body);
  try {
    let updatedRequest = {
      sme_status: req.body.sme_status,
    };
    await knex("request").where("id", updatedId).update(updatedRequest);
    res.status(200).send("Request Updated");
  } catch (e) {
    console.log("Error in patching unit:", e);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    knex("request")
      .where("id", req.params.id)
      .del()
      .then(res.send("I deleted that request."));
  } catch (e) {
    console.log("Error in deleting the request:", e);
  }
});
