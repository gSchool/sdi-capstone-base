const express = require("express");
const { profile, add, update, remove } = require("../controllers/usersController.js");
const router = express.Router();

/*
  ENDPOINTS:
  GET 
    /users/:userid (for profile page)

  POST
    /users

  PATCH
    /users/:userid

  DELETE 
    /users/:userid
*/

router.route("/users/:userid").get(profile);
router.route("/users").post(add);
router.route("/users/:userid").patch(update);
router.route("/users/:userid").delete(remove);

module.exports = router;