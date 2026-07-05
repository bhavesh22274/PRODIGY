const User = require("../models/User");

// CREATE USER
exports.createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;

        if (!name || !email || !age) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const user = await User.create({
            name,
            email,
            age
        });

        res.status(201).json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET ALL USERS
exports.getUsers = async (req, res) => {
    try {

        const users = await User.findAll();

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET USER BY ID
exports.getUserById = async (req, res) => {

    try {

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};

// UPDATE USER
exports.updateUser = async (req, res) => {

    try {

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await user.update(req.body);

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// DELETE USER
exports.deleteUser = async (req, res) => {

    try {

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await user.destroy();

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};