import express from "express";
import * as jobController from "../controller/jobController.js";

const router = express.Router();

router.get("/", jobController.getAllJobs);
router.get("/:id", jobController.getJob);
router.post("/", jobController.createJob);
router.delete("/:id", jobController.deleteJob);

export default router;