const express = require("express");
const router = express.Router();
const {
  buyItemAndEarnPoints,
  redeemReward,
  viewRewards,
  viewTransactions,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");


router.post("/earnPoint", protect, buyItemAndEarnPoints);
router.post("/redeem", protect, redeemReward);
router.get("/viewRewards", protect, viewRewards);
router.get("/transactions", protect, viewTransactions);

module.exports = router;
