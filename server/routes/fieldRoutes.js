import express from "express";
const router = express.Router();

import { add, edit, favorite, archive } from "../controllers/fieldController.js";

router.route("/edit_field").patch(edit);

router.route("/add_field").post(add);

router.route('/favorite_field/:field_id').patch(favorite)

router.route('/archive_field/:field_id').patch(archive)

export default router;
