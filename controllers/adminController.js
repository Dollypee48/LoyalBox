const User = require("../models/userModel");
const Reward = require("../models/rewardModel");
const Transaction = require("../models/transactionModel");
const asyncHandler = require("express-async-handler");

// Create reward
const createReward = asyncHandler(async (req, res) => {
    const { title, description, pointsRequired } = req.body;

    if (!title || !pointsRequired) {
        res.status(400);
        throw new Error("Title and points required");
    }

    const reward = await Reward.create({ title, description, pointsRequired });
    res.status(201).json(reward);
});

// Update reward
const updateReward = asyncHandler(async (req, res) => {
    const reward = await Reward.findById(req.params.id);

    if (!reward) {
        res.status(404);
        throw new Error("Reward not found");
    }

    const { title, description, pointsRequired } = req.body;

    reward.title = title || reward.title;
    reward.description = description || reward.description;
    reward.pointsRequired = pointsRequired || reward.pointsRequired;

    const updatedReward = await reward.save();
    res.json(updatedReward);
});

// Delete reward
const deleteReward = asyncHandler(async (req, res) => {
    const reward = await Reward.findById(req.params.id);

    if (!reward) {
        res.status(404);
        throw new Error("Reward not found");
    }

    await reward.deleteOne();
    res.json({ message: "Reward deleted" });
});

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password");
    res.json(users);
});

// Get a user's point history
const getUserHistory = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ userId: req.params.id }).sort({ createdAt: -1 });
    res.json(transactions);
});

// Promote user to admin
const promoteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    user.isAdmin = true;
    await user.save();

    res.json({ message: "User promoted to admin" });
});

module.exports = {
    createReward,
    updateReward,
    deleteReward,
    getAllUsers,
    getUserHistory,
    promoteUser,
};
