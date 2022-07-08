import express from "express";
const router = express.Router();

import { requestAllSheet, requestSheetData, requestUserSheets, add, edit, addUserRole } from "../controllers/sheetController.js";

router.route("/edit_sheet/:sheet_id").patch(edit);

router.route("/add_sheet").post(add);

// Kill code, when shipping. we don't want this end point open to pub
router.route("/get_all_sheet").get(requestAllSheet);
//

router.route("/add_user_roles/:sheet_id").post(addUserRole);

router.route('/get_sheets').get(requestUserSheets)

router.route("/get_sheet/:sheet_id").get(requestSheetData);

export default router;
