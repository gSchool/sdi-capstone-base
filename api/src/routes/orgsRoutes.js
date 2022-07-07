const express = require("express");
const { request, add, update, remove } = require("../controllers/orgsController.js");
const router = express.Router();

/*
  ENDPOINTS:
  GET 
    /orgs

  POST
    /orgs

  PATCH
    /orgs/:id

  DELETE 
    /orgs/:id
*/

router.route("/orgs").get(request);
router.route("/orgs").post(add);
router.route("/orgs/:id").patch(update);
router.route("/orgs/:id").delete(remove);


module.exports = router;