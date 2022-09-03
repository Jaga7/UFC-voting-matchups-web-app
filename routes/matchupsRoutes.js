import express from "express";
const router = express.Router();

import {
  getAMatchup,
  createMatchup,
  appendVoteToMatchup,
} from "../controllers/matchupsController.js";

router.route("/").post(createMatchup).get(getAMatchup);
// place before :id
router.route("/:id").patch(appendVoteToMatchup);

export default router;
