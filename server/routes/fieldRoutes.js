import express from "express";
const router = express.Router();

import { add, edit } from "../controllers/fieldController.js";

router.route("/edit_field").patch(edit);

router.route("/add_field").post(add);

export default router;
