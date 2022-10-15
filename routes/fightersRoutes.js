import express from "express";
const router = express.Router();

import { getAllFighters } from "../controllers/fightersController.js";

router.route("/").get(getAllFighters);
// place before :id

export default router;
