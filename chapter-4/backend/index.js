require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const authMiddleware = require("./auth-middleware");
const paymentRoutes = require("./payment-routes");

app.use(cors());

app.use(express.json());

app.use(authMiddleware);

app.use("/checkout", paymentRoutes);

const PORT = 5000;

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT: ${PORT}`));
