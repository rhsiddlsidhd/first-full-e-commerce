const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const indexRouter = require("./router/router");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api", indexRouter);

const port = process.env.PORT_NUMBER;

const uri = process.env.MONGODB_ADDRESS;

mongoose
  .connect(`${uri}`)
  .then(() => {
    console.log(`MONGODB CONNECT SUCCESS🎉 🎉 🎉 `);
  })
  .catch((err) => {
    console.log(`MONGODB CONNECT FAIL 🐛 🐛 🐛 `, err.message);
  });

app.listen(port, () => {
  console.log(`Server OPEN 🚀 🚀 🚀 `);
});
