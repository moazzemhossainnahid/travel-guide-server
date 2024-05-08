const express = require("express");
const Countries = require('../Models/country.model');
require('dotenv').config();



// add a country
exports.AddACountry = async (req, res) => {
    try {
        const country = req.body;
        // console.log(req.file);
        // console.log(req.body);
        const countries = await Countries.create(country);
        res.status(200).json({
            status: "Successful",
            message: "Data added Successfully",
            data: countries
        });
    } catch (error) {
        res.json(error);
    }
}



// update a Country
exports.updateACountry = async (req, res) => {
    try {
        const id = req.params.id;
        const country = req.body;
        const filter = { _id: id }
        const options = { upsert: true };
        const updateDoc = {
            $set: country
        };
        const countries = await Countries.updateOne(filter, updateDoc, options);
        res.status(200).json({
            status: "Successful",
            message: "Data updated Successfully",
            data: countries
        });
    } catch (error) {
        res.json(error);
    }
}

// update a Location
exports.updateLocation = async (req, res) => {
    try {
        const { countryId, locationId } = req.params;
        const updatedLocationData = req.body;

        // Update the location data in the database
        const updatedCountry = await Countries.findOneAndUpdate(
            { _id: countryId, "locations._id": locationId }, // Filter: Find country by ID and location ID
            { $set: { "locations.$": updatedLocationData } }, // Update with new location data
            { new: true } // Return the updated document
        );

        // Check if country was found and updated
        if (!updatedCountry) {
            return res.status(404).json({ status: "Error", message: "Country or location not found" });
        }

        res.status(200).json({ status: "Success", message: "Location data updated successfully", data: updatedCountry });
    } catch (error) {
        console.error("Error updating location:", error);
        res.status(500).json({ status: "Error", message: "Internal server error" });
    }
};


// Update a hotel by its ID
exports.updateHotel = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const updatedHotelData = req.body;

        // Find and update the hotel in the database
        const updatedCountry = await Countries.findOneAndUpdate(
            { "locations.hotels._id": hotelId }, // Filter: Find country where hotel ID exists
            { $set: { "locations.$[outer].hotels.$[inner]": updatedHotelData } }, // Update with new hotel data
            { 
                new: true, 
                arrayFilters: [{ "outer.hotels._id": hotelId }, { "inner._id": hotelId }] 
            } // Return the updated document
        );

        // Check if hotel was found and updated
        if (!updatedCountry) {
            return res.status(404).json({ status: "Error", message: "Hotel not found" });
        }

        res.status(200).json({ status: "Success", message: "Hotel data updated successfully", data: updatedCountry });
    } catch (error) {
        console.error("Error updating hotel:", error);
        res.status(500).json({ status: "Error", message: "Internal server error" });
    }
};

// Delete a hotel by its ID
exports.deleteHotel = async (req, res) => {
    try {
        const { hotelId } = req.params;

        // Find and update the country in the database
        const updatedCountry = await Countries.findOneAndUpdate(
            { "locations.hotels._id": hotelId }, // Filter: Find country where hotel ID exists
            { $pull: { "locations.$[].hotels": { _id: hotelId } } }, // Remove hotel with given ID
            { new: true } // Return the updated document
        );

        // Check if hotel was found and deleted
        if (!updatedCountry) {
            return res.status(404).json({ status: "Error", message: "Hotel not found" });
        }

        res.status(200).json({ status: "Success", message: "Hotel deleted successfully", data: updatedCountry });
    } catch (error) {
        console.error("Error deleting hotel:", error);
        res.status(500).json({ status: "Error", message: "Internal server error" });
    }
};



// get single Country
exports.getSingleCountry = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: id }
        const job = await Countries.findOne(query);
        return res.status(200).json(job);
    } catch (err) {
        res.status(404).json(err.message);
    }
}


// get all Countries
exports.getAllCountries = async (req, res) => {
    try {
        let filters = { ...req.query };

        // sort - page - limit => exclude
        const excludesFields = ['sort', 'page', 'limit'];
        excludesFields.forEach(field => delete filters[field]);

        // gt, lt, gte, lte
        let filterString = JSON.stringify(filters)
        filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        // parsing algorithm
        filters = JSON.parse(filterString);

        // limit, sort, select ->  Are store Here    
        const queries = {};

        //  queries by sort anything

        if (req.query.sort) {
            // price, quantity => 'price quantity'
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        };


        // queries by limit of data

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
        };

        // queries by limit

        if (req.query.limit) {
            const limit = req.query.limit;
            queries.limit = (limit * 1);
        };


        // Pagination

        if (req.query.page) {

            const { page = 1, limit = 6 } = req.query;   //'2' '5'

            queries.limit = limit;

            const skip = (page - 1) * parseInt(limit);

            queries.skip = skip
            queries.limit = parseInt(limit)
        };


        const result = await Countries.find(filters)
            .skip(queries.skip)
            .limit(queries.limit)
            .sort(queries.sortBy)
            .select(queries.fields)
            ;


        const totalCountries = await Countries.countDocuments(filters);
        const pageCount = Math.ceil(totalCountries / queries.limit);


        // if not data
        if (Countries.length === 0) {
            return res.status(200).json({
                message: "You've no Data or Entered a Wrong Queries. Please insert first then Find data or check your Queries",
            });
        };


        res.status(200).json({
            status: "success",
            message: "Data Get Successfull",
            data: { totalCountries, pageCount, result }
        });


    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Can't Get Data",
            error: error.message
        });
    }
}


// delete a country
exports.deleteACountry = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id);
        const query = { _id: id };
        // console.log(query);
        const result = await Countries.deleteOne(query);
        res.send(result);
    } catch (err) {
        res.status(404).json(err);
    }
}



