const router = require("express").Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const { getCartItems } = require("./store-service");

router.post("/", async (req, res) => {
  const { userId } = req;
  const { customerId } = req.body;

  const cartItems = await getCartItems(userId);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: cartItems.amount * 100,
    currency: "inr",
    payment_method_types: ["card"],
    capture_method: "manual",
  });

  return res.json({
    checkoutSecret: paymentIntent.client_secret,
    ...cartItems,
  });
});


router.post("/capture-payment", async (req, res) => {
  const { userId } = req;
  const { paymentIntentId } = req.body;

  const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);

  return res.json({
    checkoutSecret: paymentIntent.client_secret,
    ...cartItems,
  });
});


router.post("/charge-customer", async (req, res) => {
  const { customerId } = req.query;
  const { userId } = req;

  const { amount } = await getCartItems(userId);

  const paymentMethods = await stripe.paymentMethods.list({
    customer: customerId,
    type: "card",
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "inr",
    customer: customerId,
    payment_method: paymentMethods.data[0].id,
    off_session: true,
    confirm: true,
  });

  return res.json({
    success: true,
  });
});

module.exports = router;
