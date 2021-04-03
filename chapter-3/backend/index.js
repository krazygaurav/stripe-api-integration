const express = require("express");
const bodyParser = require("body-parser");
const stripeRoutes = require("./stripe-demo");
const cors = require("cors");

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/", stripeRoutes);

app.listen(8000, () => {
  console.log("Listening on port:: 8000");
});
