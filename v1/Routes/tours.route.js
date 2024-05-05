const express = require('express');
const toursController = require("../Controllers/tours.controller");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();


// add a tour
router.post("/",  toursController.addATour);

// update a tour
router.patch("/:id", verifyToken, toursController.updateATour);

// get all tours
router.get("/", toursController.getAllTours);

// get single tour
router.get("/:id", verifyToken, toursController.getSingleTour);

// delete a tour
router.delete("/:id", verifyToken, toursController.deleteATour);



module.exports = router;