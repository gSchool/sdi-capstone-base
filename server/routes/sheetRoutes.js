import express from "express";
const router = express.Router();

import { request, add, edit } from "../controllers/sheetController.js";

router.route("/edit_sheet").patch(edit);

router.route("/add_sheet").post(add);

router.route("/get_all_sheet").get(request);

router.route("/get_sheet:sheetId").get(request);

export default router;
