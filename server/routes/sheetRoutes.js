import express from "express";
const router = express.Router();

import { requestAllSheet, requestSheetData, requestUserSheets, add, edit } from "../controllers/sheetController.js";

router.route("/edit_sheet/:sheetId").patch(edit);

router.route("/add_sheet").post(add);

// Kill code, when shipping. we don't want this end point open to pub
router.route("/get_all_sheet").get(requestAllSheet);
//

router.route('/get_sheets').get(requestUserSheets)

router.route("/get_sheet/:sheetId").get(requestSheetData);

export default router;
