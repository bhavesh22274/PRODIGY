const express = require("express");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();


const users = {};


function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


router.get("/", (req, res) => {
    res.json(Object.values(users));
});


router.get("/:id", (req, res) => {
    const user = users[req.params.id];

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});


router.post("/", (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({
            message: "Invalid email"
        });
    }

    const id = uuidv4();

    const user = {
        id,
        name,
        email,
        age
    };

    users[id] = user;

    res.status(201).json(user);
});


router.put("/:id", (req, res) => {

    const user = users[req.params.id];

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const { name, email, age } = req.body;

    if (email && !isValidEmail(email)) {
        return res.status(400).json({
            message: "Invalid email"
        });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.age = age || user.age;

    res.json(user);
});


router.delete("/:id", (req, res) => {

    if (!users[req.params.id]) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    delete users[req.params.id];

    res.json({
        message: "User deleted successfully"
    });
});

module.exports = router;