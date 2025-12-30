const Stripe = require("stripe");
const Booking = require("../models/booking");

// Stripe init
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // 🔥 WEBHOOK HIT LOG
  console.log("🔥 STRIPE WEBHOOK HIT");

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // ⚠️ express.raw() body ကို သုံးရမယ်
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Stripe signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Payment success event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("✅ Checkout completed");
    console.log("SESSION METADATA:", session.metadata);

    const bookingId = session.metadata?.bookingId;

    if (!bookingId) {
      console.error("❌ bookingId not found in metadata");
      return res.status(400).json({ msg: "bookingId missing" });
    }

    try {
      await Booking.findByIdAndUpdate(
        bookingId,
        {
          isPaid: true,
          status: "paid",
        },
        { new: true }
      );

      console.log("✅ Booking updated to PAID:", bookingId);
    } catch (dbErr) {
      console.error("❌ DB update error:", dbErr);
      return res.status(500).json({ msg: "DB update failed" });
    }
  }

  // Stripe ကို response ပြန်ပေးမရင် retry လုပ်နေမယ်
  res.json({ received: true });
};
