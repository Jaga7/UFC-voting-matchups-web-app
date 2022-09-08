import express from "express";
const router = express.Router();

import {
  getMatchups,
  createMatchup,
  appendVoteToMatchup,
} from "../controllers/matchupsController.js";

router.route("/").post(createMatchup).get(getMatchups);
// place before :id
router.route("/:id").patch(appendVoteToMatchup);

export default router;
