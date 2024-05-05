const express = require('express');
const blogsController = require("../Controllers/blogs.controller");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();


// add a blog
router.post("/", verifyToken, blogsController.addABlog);

// update a blog
router.patch("/:id", verifyToken, blogsController.updateABlog);

// add a comment
router.put("/:id/comments", verifyToken, blogsController.addAComment);

// delete a comment
router.delete("/:blogId/comments/:commentId", verifyToken, blogsController.deleteAComment);

// get all blogs
router.get("/", blogsController.getAllBlogs);

// get single blog
router.get("/:id", verifyToken, blogsController.getSingleBlog);

// delete a blog
router.delete("/:id", verifyToken, blogsController.deleteABlog);



module.exports = router;