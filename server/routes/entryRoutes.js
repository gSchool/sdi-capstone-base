import express from "express";
const router = express.Router();

import { add, edit, archive } from "../controllers/entryController.js";

router.route("/edit_entry").patch(edit);

router.route("/add_entry").post(add);

router.route('/archive_entry/:entry_id').patch(archive)

export default router;
