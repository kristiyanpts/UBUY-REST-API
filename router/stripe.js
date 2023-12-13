const express = require("express");
const router = express.Router();
const { auth } = require("../utils");

const stripe = require("stripe")(
  "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"
);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

router.post("/create-payment-intent", auth(), async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "bgn",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;
