import express from "express";
const router = express.Router();

import { request, add, edit } from "../controllers/userController.js";

router.route("/edit_user/:id").patch(edit);

router.route("/add_user").post(add);

router.route("/get_user/:id").get(request);

export default router;
