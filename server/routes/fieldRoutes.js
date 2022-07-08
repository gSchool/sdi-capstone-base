import express from "express";
const router = express.Router();

import { handleField, favorite, archive, flipChecked } from "../controllers/fieldController.js";

router.route("/handle_field/:sheet_id").patch(handleField);

router.route("/check_field/:field_id").patch(flipChecked);

router.route('/favorite_field/:field_id').patch(favorite)

router.route('/archive_field/:field_id').patch(archive)

export default router;
