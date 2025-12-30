const Booking = require("../model/booking");
const Jetskiis = require("../model/Jetskiis");
const transporter  = require("../configs/nodemailer");
const { default: Stripe } = require("stripe");



const createBooking = async (req, res) => {
  try {
    console.log("req.user:", req.user);
    console.log("req.body:", req.body);

    const { jetskiiId, checkInDate, checkInTime, paymentMethod } = req.body;

    // 1️⃣ Find jetskii
    const jetskii = await Jetskiis.findById(jetskiiId);
    if (!jetskii) {
      return res.status(404).json({
        success: false,
        message: "Jetskii not found",
      });
    }

    // 2️⃣ Create booking
    const booking = await Booking.create({
      user: req.user._id,
      jetskii: jetskii._id,
      jetskiTitle: jetskii.title,
      checkInDate,
      checkInTime,
      totalPrice: jetskii.price,
      paymentMethod: paymentMethod || "pay at jetskii",
    });

    // 3️⃣ Get user email (IMPORTANT FIX)
      let mailOptions = {
      from: process.env.SENDER_EMAIL, // ❗ must be a real email
      to: req.user.email,
      subject: "Booking Confirmation",
      html: `<h3>Dear ${req.user.username},</h3>
             <p>Thank you for your booking!</p>
             <p><strong>Jetskii:</strong> ${jetskii.title}</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      booking,
      message: "Booking created successfully",
    });

  } catch (err) {
    console.error("FULL BOOKING ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



let getUserBookings = async (req, res) => {
  try {
    res.set("Cache-Control", "no-store"); // 👈 ADD THIS

    const bookings = await Booking.find({ user: req.user._id })
      .populate("jetskii", "title price images")
      .sort({ createdAt: -1 });

    return res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};



const getOwnerJetskiiBookings = async (req, res) => {
  try {
    const ownerId = req.user._id;

    // 1️⃣ Owner jetskiis
    const jetskiis = await Jetskiis.find({ owner: ownerId });
    if (!jetskiis.length)
      return res.json({ success: true, dashboard: { totalBookings: 0, totalRevenue: 0, bookings: [] } });

    const jetskiiIds = jetskiis.map(j => j._id);

    // 2️⃣ Bookings
    const bookings = await Booking.find({ jetskii: { $in: jetskiiIds } })
      .populate("jetskii", "title price")
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      dashboard: {
        totalBookings: bookings.length,
        totalRevenue: bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0),
        bookings,
      },
    });
  } catch (err) {
    console.error("Owner dashboard error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const stripePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.json({ success: false, message: "Booking not found" });

    const jetskii = await Jetskiis.findById(booking.jetskii).populate("owner");
    if (!jetskii) return res.json({ success: false, message: "Jetskii not found" });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { origin } = req.headers;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: jetskii.title },
            unit_amount: booking.totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/loader/my-bookings`,
      cancel_url: `${origin}/my-bookings`,
      metadata: { bookingId: booking._id.toString() },
    });

    res.json({ success: true, url: session.url });
  } catch (err) {
    console.error("STRIPE ERROR:", err);
    res.json({ success: false, message: "Payment failed" });
  }
};

module.exports = { 
  createBooking, 
  getUserBookings, 
  getOwnerJetskiiBookings,
  stripePayment
};
