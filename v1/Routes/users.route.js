const express = require('express');
const userController = require("../Controllers/users.controller");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();

// post an user
router.put("/:email", userController.postAnUser);

// get an User
router.get("/:email", verifyToken, userController.getAnUser);

// get all Users
router.get("/", verifyToken, userController.getAllUsers);

// delete an User
router.delete("/:id", verifyToken, userController.deleteUser);

// get an Admin
router.get("/isAdmin/:email", verifyToken, userController.getAdmin);

// make an Admin
router.put("/admin/:email", verifyToken, userController.makeAdmin);

// remove an Admin
router.put("/admin/remove/:email", verifyToken, userController.removeAdmin);


module.exports = router;