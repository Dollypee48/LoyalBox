const express = require("express");
const router = express.Router();
const {
  createReward,
  updateReward,
  deleteReward,
  getAllUsers,
  getUserHistory,
  promoteUser,
} = require("../controllers/adminController");

const { protect, admin } = require("../middleware/authMiddleware");




router.post("/createReward", protect, admin, createReward);
router.put("/update/:id", protect, admin, updateReward);
router.delete("/delete/:id", protect, admin, deleteReward);
router.get("/allUsers", protect, admin, getAllUsers);
router.get("/userHistory/:id", protect, admin, getUserHistory);
router.put("/promote/:id", protect, admin, promoteUser);

module.exports = router;
