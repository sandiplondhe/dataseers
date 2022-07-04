require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require("./models");

app.get("/", (req, res) => {
  res.status(201).send({ message: "Success" });
});

app.use("/api/user/", require("./routes/user"));

app.listen(process.env.PORT, (req, res) => {
  console.log(`server is running on ${process.env.PORT}`);
});
