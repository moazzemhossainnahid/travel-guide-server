const express = require("express");
const visaApplicationController = require("../Controllers/visaApplication.controller");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();

// add a flight booking
router.post("/", verifyToken, visaApplicationController.AddAVisaApplication);

// get all flight booking
router.get("/",  visaApplicationController.getAllVisaApplication);

// get single flight booking
router.get("/:id", verifyToken, visaApplicationController.getSingleVisaApplication);

// delete a flight booking
router.delete("/:id", verifyToken, visaApplicationController.deleteAVisaApplication);

module.exports = router;
