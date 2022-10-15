import express from "express";
const router = express.Router();

import {
  getMatchups,
  createMatchup,
  toggleVoteForMatchup,
} from "../controllers/matchupsController.js";

router.route("/").post(createMatchup).get(getMatchups);
// place before :id
router.route("/:id").patch(toggleVoteForMatchup);

export default router;
