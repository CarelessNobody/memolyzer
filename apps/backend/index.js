const express = require("express");
const cors = require("cors");
require("dotenv").config();

//npm install express cors dotenv
//npm install concurrently -D

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.send({ id: 1, test: "This is a test response from the backend!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});