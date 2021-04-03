const express = require("express");
const { SECRET_KEY } = require("./config/app.config");
const stripe = require("stripe")(SECRET_KEY);
const router = express.Router();

router.post("/pay", async (request, response) => {
  console.log(request.body);
  try {
    const intent = await stripe.paymentIntents.create({
      payment_method: request.body.payment_method_id,
      amount: 1099,
      currency: "INR",
      confirmation_method: "manual",
      confirm: true,
    });

    response.json(intent);
  } catch (e) {
    return response.json({ error: e.message });
  }
});

module.exports = router;
