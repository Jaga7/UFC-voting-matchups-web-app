import express from "express";
const router = express.Router();

import { getFighters } from "../controllers/fightersController.js";

router.route("/").get(getFighters);
// place before :id

export default router;
