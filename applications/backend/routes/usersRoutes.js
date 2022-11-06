import express from "express";
const router = express.Router();

import { updateUser } from "../controllers/usersController.js";

router.route("/:id").patch(updateUser);

export default router;
