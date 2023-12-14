const express = require("express");
const router = express.Router();
const { auth } = require("../utils");

const stripe = require("stripe")(
  "sk_test_51OMtawBPikfn3zPt9fpDvnCd7eK5D90DPT4lZZW0klhm1bLGKnY3Rl9WOFzCIPF1SaGWNrCjW2z7YTGFsIBOZ9oc00qzFVtgTZ"
);

const calculateOrderAmount = (items) => {
  let totalPrice = 0;

  items.forEach((i) => {
    totalPrice += i.price * (i.quantityBuying || 1);
  });

  return totalPrice * 100;
};

router.post("/create-payment-intent", auth(), async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
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
