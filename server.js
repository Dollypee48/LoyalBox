const express = require("express");
const app = express();
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require('cookie-parser');
const connectDB = require("./config/dbConn");




const PORT = 5000

connectDB()

// Middleware
app.use(express.json());

app.use(cookieParser());

// Routes
// app.use("/", (req, res) => {
//   res.send()
// })
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);




mongoose.connection.once("open", () => {
  console.log("connect to mongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});











