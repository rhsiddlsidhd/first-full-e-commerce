const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const router = require("./router/router");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", router);

const port = process.env.PORT_NUMBER;

const uri = process.env.LOCAL_MONGODB_ADDRESS;

mongoose
  .connect(`${uri}`)
  .then(() => {
    console.log(`MONGODB CONNECT SUCCESS🎉 🎉 🎉 🎉`);
  })
  .catch((err) => {
    console.log(`MONGODB CONNECT FAIL 🐛 🐛 🐛 🐛`, err.message);
  });

app.listen(port, () => {
  console.log(`Server OPEN 🚀 🚀 🚀 🚀`);
});
