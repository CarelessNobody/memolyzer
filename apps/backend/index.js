const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");

require("dotenv").config();

// Needs to be imported after dotenv config to ensure MONGO_URI is available
const { connectToMongo } = require('./connection');

const mongoose = require('mongoose');
const User = require('./db/user'); 

const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.send({ id: 1, test: "This is a test response from the backend!" });
});


app.post("/api/user/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: error.message });
  }
});


app.post("/api/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.status(200).json({ 
      message: "Login successful", 
      user: { id: user._id, username: user.username } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/flashcard", (req, res) => {
  res.send({ message: "This should create flashcard based on data", data: req.body });
});

app.post("/api/flashcard/uploadGemini", (req, res) => {
  res.send({ message: "This should process the uploaded file and return flashcard data", fileName: req.files.uploadFile.name });
});

app.route("/api/flashcard/:id")
  .get((req, res) => {
    res.send({ message: "This should return flashcard data for ID: " + req.params.id });
  })
  .put((req, res) => {
    res.send({ message: "This should update flashcard data for ID: " + req.params.id, data: req.body });
  })
  .delete((req, res) => {
    res.send({ message: "This should delete flashcard data for ID: " + req.params.id });
  });

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectToMongo();
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (mongoUri) {
      await mongoose.connect(mongoUri);
      console.log('Mongoose connected');
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err && (err.stack || err));
    process.exit(1);
  }
}

start();