const express = require("express");
const flightBookingController = require("../Controllers/flightBooking.controller");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();

// add a flight booking
router.post("/", verifyToken, flightBookingController.AddAFlightBooking);

// get all flight booking
router.get("/", verifyToken, flightBookingController.getAllFlightBookings);

// get single flight booking
router.get("/:id", verifyToken, flightBookingController.getSingleFlightBooking);

// delete a flight booking
router.delete("/:id", verifyToken, flightBookingController.deleteAFlightBooking);

module.exports = router;
