import express from "express";
const router = express.Router();

import { add, edit, archive } from "../controllers/entryController.js";

router.route("/edit_entry/:entry_id").patch(edit);

router.route("/add_entry/:sheet_id").post(add);

router.route('/archive_entry/:entry_id').patch(archive)

export default router;
