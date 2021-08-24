const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const api = require("./api");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", api.auth);
app.use("/api/v1/orders", api.orders);

app.use((_, res) => {
  res.status(404).send({
    status: "error",
    code: 404,
    message: "Not found",
  });
});

app.use((error, _, res, __) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({
    status: "error",
    code: status,
    message,
  });
});

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => console.log(error));
