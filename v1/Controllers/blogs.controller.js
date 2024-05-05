const express = require("express");
const Blogs = require('../Models/blogs.model');
require('dotenv').config();



// add a Blog
exports.addABlog = async (req, res) => {
    try {
        const blog = req.body;
        // console.log(req.file);
        // console.log(req.body);
        const blogs = await Blogs.create(blog);
        res.status(200).json({
            status: "Successful",
            message: "Data added Successfully",
            data: blogs
        });
    } catch (error) {
        res.json(error);
    }
}


// update a Blog
exports.updateABlog = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = req.body;
        const filter = { _id: id }
        const options = { upsert: true };
        const updateDoc = {
            $set: blog
        };
        const blogs = await Blogs.updateOne(filter, updateDoc, options);
        res.status(200).json({
            status: "Successful",
            message: "Data updated Successfully",
            data: blogs
        });
    } catch (error) {
        res.json(error);
    }
}


// add a Comment
exports.addAComment = async (req, res) => {
    const blogId = req.params.id;
    const newComment = req.body;
    try {
        const blog = await Blogs.findById(blogId);

        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }
    
        // Update the comments array
        blog.comments.push(newComment);
    
        // Save the updated blog
        await blog.save();
    
        res.status(200).json({
            status: "Successful",
            message: "Comment add Successfully",
            data: blog
        });
    } catch (error) {
        res.json(error);
    }
}


// Delete a Comment
exports.deleteAComment = async (req, res) => {
    const blogId = req.params.blogId;
    const commentId = req.params.commentId;
  
    try {
      const blog = await Blogs.findById(blogId);
  
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
  
      // Find the index of the comment with the given commentId
      const commentIndex = blog.comments.findIndex(comment => comment._id.toString() === commentId);
  
      if (commentIndex === -1) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      // Remove the comment from the array
      blog.comments.splice(commentIndex, 1);
  
      // Save the updated blog
      await blog.save();
  
      res.status(200).json({
        status: 'Successful',
        message: 'Comment deleted Successfully',
        data: blog,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// get single Blog
exports.getSingleBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: id }
        const blog = await Blogs.findOne(query);
        return res.status(200).json(blog);
    } catch (err) {
        res.status(404).json(err.message);
    }
}


// get all Blogs
exports.getAllBlogs = async (req, res) => {
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


        const result = await Blogs.find(filters)
            .skip(queries.skip)
            .limit(queries.limit)
            .sort(queries.sortBy)
            .select(queries.fields)
            ;


        const totalBlogs = await Blogs.countDocuments(filters);
        const pageCount = Math.ceil(totalBlogs / queries.limit);


        // if not data
        if (Blogs.length === 0) {
            return res.status(200).json({
                message: "You've no Data or Entered a Wrong Queries. Please insert first then Find data or check your Queries",
            });
        };


        res.status(200).json({
            status: "success",
            message: "Data Get Successfull",
            data: { totalBlogs, pageCount, result }
        });


    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Can't Get Data",
            error: error.message
        });
    }
}


// delete a Blog
exports.deleteABlog = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id);
        const query = { _id: id };
        // console.log(query);
        const result = await Blogs.deleteOne(query);
        res.send(result)
    } catch (err) {
        res.status(404).json(err);
    }
}

