import express from "express";
const router = express.Router();

import { request, add, getAllSheetUsers, requestAllUsers, editUserRoles, removeUserRoles } from "../controllers/userController.js";

router.route("/add_user").post(add);

router.route("/get_user").get(request);

router.route("/get_all_users").get(requestAllUsers);

router.route("/get_sheet_users/:sheet_id").get(getAllSheetUsers)

router.route("/edit_user_roles/:sheet_id").patch(editUserRoles)

router.route("/remove_roles/:sheet_id").delete(removeUserRoles)

export default router;
