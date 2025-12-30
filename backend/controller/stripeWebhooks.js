const Stripe = require("stripe");
const Booking = require("../model/booking");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeWebhooks = async (req, res) => {
  console.log("🔥 STRIPE WEBHOOK HIT");

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Stripe signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("✅ Event type:", event.type);

  // ⭐⭐⭐ CHECKOUT SESSION COMPLETED ⭐⭐⭐
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const bookingId = session.metadata?.bookingId;

    if (!bookingId) {
      console.log("❌ bookingId not found in metadata");
      return res.json({ received: true });
    }

    const updated = await Booking.findByIdAndUpdate(
      bookingId,
      {
        isPaid: true,
        status: "confirmed",
        paymentMethod: "stripe",
      },
      { new: true }
    );

    console.log("✅ BOOKING CONFIRMED:", updated);
  }

  res.json({ received: true });
};

module.exports = stripeWebhooks;
