const express = require("express");
const jobApplicationController = require("../Controllers/jobApplications.controller");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();

// add a job application
router.post("/", verifyToken, jobApplicationController.AddAJobApplication);

// get all job application
router.get("/", jobApplicationController.getAllJobApplications);

// get single job application
router.get("/:id", verifyToken, jobApplicationController.getSingleJobApplication);

// delete a job application
router.delete("/:id", verifyToken, jobApplicationController.deleteAJobApplication);

module.exports = router;
