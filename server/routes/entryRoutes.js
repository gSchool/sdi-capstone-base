import express from "express";
const router = express.Router();

import { add, edit } from "../controllers/entryController.js";

router.route("/edit_entry").patch(edit);

router.route("/add_entry").post(add);

export default router;
