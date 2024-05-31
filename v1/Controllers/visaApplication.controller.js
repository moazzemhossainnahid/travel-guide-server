const express = require("express");
const visaApplication = require('../Models/visaApplication.model');
require('dotenv').config();



// post a visa application
exports.AddAVisaApplication = async (req, res) => {
    try {
        const Data = req.body;
        // console.log(req.body);
        const bookData = await visaApplication.create(Data);
        res.status(200).json({
            status: "Successful",
            message: "Data added Successfully",
            data: bookData
        });
    } catch (error) {
        res.json(error);
    }
}


// get single visa application
exports.getSingleVisaApplication = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: id }
        const Data = await visaApplication.findOne(query);
        return res.status(200).json(Data);
    } catch (err) {
        res.status(404).json(err.message);
    }
}


// get all visa application
exports.getAllVisaApplication = async (req, res) => {
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


        const result = await visaApplication.find(filters)
            .skip(queries.skip)
            .limit(queries.limit)
            .sort(queries.sortBy)
            .select(queries.fields)
            ;


        const totalVisaApplication = await visaApplication.countDocuments(filters);
        const pageCount = Math.ceil(totalVisaApplication / queries.limit);


        // if not data
        if (visaApplication.length === 0) {
            return res.status(200).json({
                message: "You've no Data or Entered a Wrong Queries. Please insert first then Find data or check your Queries",
            });
        };


        res.status(200).json({
            status: "success",
            message: "Data Get Successfull",
            data: { totalVisaApplication, pageCount, result }
        });


    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Can't Get Data",
            error: error.message
        });
    }
}


// delete a visa application
exports.deleteAVisaApplication = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id);
        const query = { _id: id };
        // console.log(query);
        const result = await visaApplication.deleteOne(query);
        res.send(result);
    } catch (err) {
        res.status(404).json(err);
    }
}



