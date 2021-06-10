const router = require("express").Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const { getCartItems } = require("./store-service");

router.post("/", async (req, res) => {
  const { userId } = req;

  const cartItems = await getCartItems(userId);

  // retrieve customer id from database for the user or if doesn't exist then create customer and store in DB
  const customer = await stripe.customers.create();

  const setupIntent = await stripe.setupIntents.create({
    customer: customer.id,
  });

  return res.json({
    checkoutSecret: setupIntent.client_secret,
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
