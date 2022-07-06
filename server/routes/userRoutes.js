import express from "express";
const router = express.Router();

import { request, add, edit, getAllSheetUsers, requestAllUsers } from "../controllers/userController.js";

router.route("/edit_user/:id").patch(edit);

router.route("/add_user").post(add);

router.route("/get_user").get(request);

router.route("/get_all_users").get(requestAllUsers);

router.route("/get_sheet_users/:sheetId").get(getAllSheetUsers)

export default router;
