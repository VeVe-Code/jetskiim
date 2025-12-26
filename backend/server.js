const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const { clerkMiddleware } = require("@clerk/express");
const cors = require("cors");
const mongoose = require("mongoose");

const jetskiiRoute = require("./route/jetskii");
const userRoute = require("./route/user");
const bookingRouter = require("./route/booking");
const contactusRouter = require("./route/contactus");
const clertWebhooks = require("./controller/clerkWebhooks");
const connectCloudinary = require("./configs/cloudinary");

const mongoURL = process.env.MONGODB_URI;

const app = express();

// =====================
// Middleware
// =====================

// RAW BODY for webhook → MUST be before express.json()
app.use("/api/clerk", express.raw({ type: "*/*" }));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://jetskii-newfrontend-nine-lime.vercel.app/"
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

// Clerk webhook → POST only
app.use("/api/clerk", clertWebhooks);

// Other routes
app.use("/api/contactus", contactusRouter);
app.use("/api/bookings", bookingRouter);

// Mount user routes with /api prefix
app.use("/api", userRoute);

// Jetskii routes
app.use("/api", jetskiiRoute);

// Root
app.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});

// =====================
// Start server
// =====================
mongoose.connect(mongoURL).then(() => {
  console.log("Connected to DB");
  connectCloudinary();
  app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
  });
}).catch(err => {
  console.error("DB connection error:", err.message);
});
