const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Reward = require("../models/rewardModel");
const Transaction = require("../models/transactionModel");


const buyItemAndEarnPoints = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { itemName, amountSpent } = req.body;

  if (!itemName || !amountSpent || amountSpent <= 0) {
    res.status(400);
    throw new Error("Item name and valid amount spent are required");
  }

  //  10 point per ₦100 spent
  const pointsEarned = Math.floor(amountSpent / 100) * 10;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.points += pointsEarned;
  await user.save();

  await Transaction.create({
    userId: userId,
    type: "earn",
    points: pointsEarned,
    description: `Purchased "${itemName}" for ₦${amountSpent}`,
  });

  res.status(200).json({
    message: `You bought "${itemName}" and earned ${pointsEarned} points.`,
    totalPoints: user.points,
  });
});



const redeemReward = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { rewardId } = req.body;

  const reward = await Reward.findById(rewardId);
  if (!reward) {
    res.status(404);
    throw new Error("Reward not found");
  }

  if (reward.quantity <= 0) {
    res.status(400);
    throw new Error("Reward is out of stock");
  }

  const user = await User.findById(userId);
  if (user.points < reward.pointsRequired) {
    res.status(400);
    throw new Error("Insufficient points");
  }

  user.points -= reward.pointsRequired;
  await user.save();

  reward.quantity -= 1;
  await reward.save();

  await Transaction.create({
    userId: userId,
    type: "redeem",
    points: reward.pointsRequired,
    description: `Redeemed reward: ${reward.title}`,
  });

  res.status(200).json({ message: "Reward redeemed successfully", remainingPoints: user.points });
});


const viewRewards = asyncHandler(async (req, res) => {
  const rewards = await Reward.find({ quantity: { $gt: 0 } });
  res.status(200).json(rewards);
});


const viewTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(transactions);
});

module.exports = {
  buyItemAndEarnPoints,
  redeemReward,
  viewRewards,
  viewTransactions,
};
