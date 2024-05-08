const express = require("express");
const countriesController = require("../Controllers/country.controller");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();

// add a country
router.post("/", verifyToken, countriesController.AddACountry);

// update a country
router.patch("/:id",  countriesController.updateACountry);

// update a location
router.patch("/:countryId/locations/:locationId",  countriesController.updateLocation);

// update a Hotel
router.patch("/hotels/:hotelId",  countriesController.updateHotel);

// delete a Hotel
router.patch("/hotels/delete/:hotelId",  countriesController.deleteHotel);

// get all country
router.get("/", countriesController.getAllCountries);

// get single country
router.get("/:id", verifyToken, countriesController.getSingleCountry);

// delete a country
router.delete("/:id", verifyToken, countriesController.deleteACountry);

module.exports = router;
