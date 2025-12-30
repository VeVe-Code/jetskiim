const Stripe = require("stripe");
const Booking = require("../model/booking");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    if (session.payment_status === "paid") {
      const bookingId = session.metadata.bookingId;

      await Booking.findByIdAndUpdate(bookingId, {
        isPaid: true,
        status: "confirmed",
        paymentMethod: "stripe",
      });

      console.log("✅ Booking marked as PAID:", bookingId);
    }
  }

  res.json({ received: true });
};

module.exports = stripeWebhooks;
