const express = require("express");
const tourBookingController = require("../Controllers/tourBooking.controller");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();

// add a tour booking
router.post("/", verifyToken, tourBookingController.AddATourBooking);

// get all tour booking
router.get("/", verifyToken, tourBookingController.getAllTourBookings);

// get single tour booking
router.get("/:id", verifyToken, tourBookingController.getSingleTourBooking);

// delete a tour booking
router.delete("/:id", verifyToken, tourBookingController.deleteATourBooking);

module.exports = router;
