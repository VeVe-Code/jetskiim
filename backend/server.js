const express = require("express");
require("dotenv").config();

const app = express();
const morgan = require("morgan");
const { clerkMiddleware } = require("@clerk/express");
const cors = require("cors"); // ✅ ONLY ONCE
const mongoose = require("mongoose");

const jetskiiRoute = require("./route/jetskii");
const userRoute = require("./route/user");
const bookingRouter = require("./route/booking");
const contactusRouter = require("./route/contactus");
const clertWebhooks = require("./controller/clerkWebhooks");
const connectCoudinary = require("./configs/cloudinary");

const mongoURL = process.env.MONGODB_URI;

// =====================
// Middleware
// =====================

// RAW BODY → MUST be before clerk webhook
app.use("/api/clerk", express.raw({ type: "*/*" }));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://jetskii-newfrontend-nine.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(clerkMiddleware());

app.use("/api", (req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private"
  );
  next();
});

// =====================
// Routes
// =====================
app.use("/api/clerk", clertWebhooks);
app.use("/api/contactus", contactusRouter);
app.use("/api/bookings", bookingRouter);
app.use(userRoute);
app.use(jetskiiRoute);

app.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});

// =====================
// Start server
// =====================
mongoose.connect(mongoURL).then(() => {
  console.log("connected to db");
  connectCoudinary();
  app.listen(process.env.PORT, () => {
    console.log("server is running " + process.env.PORT);
  });
});
