const express = require("express");

const router = express.Router();

const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/userController");

// Create
router.post("/", createUser);

// Read All
router.get("/", getUsers);

// Read One
router.get("/:id", getUserById);

// Update
router.put("/:id", updateUser);

// Delete
router.delete("/:id", deleteUser);

module.exports = router;