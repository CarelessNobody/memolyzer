const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");

require("dotenv").config();

//Needs to be imported after dotenv config to ensure MONGO_URI is available
const { connectToMongo } = require('./connection');

const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.send({ id: 1, test: "This is a test response from the backend!" });
});

app.post("/api/user/register", (req, res) => {
  res.send({ message: "This should create user based on data", data: req.body });
});

app.post("/api/user/login", (req, res) => {
  res.send({ message: "This should return user data for email: " + req.body.email + " and password: " + req.body.password });
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
app.listen(PORT, () => {
  connectToMongo().catch(console.error);
  console.log(`Server running on port ${PORT}`);
});