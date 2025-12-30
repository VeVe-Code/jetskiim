let express = require("express");
require("dotenv").config();
let app = express();
let morgan = require("morgan");
let { clerkMiddleware } = require("@clerk/express");
let cors = require("cors");
let mongoose = require("mongoose");

let jetskiiRoute = require("./route/jetskii");
let userRoute = require("./route/user");
let bookingRouter = require("./route/booking");
let contactusRouter = require("./route/contactus");

let stripeWebhooks = require("./controller/stripeWebhooks");
let clertWebhooks = require("./controller/clerkWebhooks");

let connectCoudinary = require("./configs/cloudinary");

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("connected to db");
  app.listen(process.env.PORT, () => {
    console.log("server is running " + process.env.PORT);
  });
});

connectCoudinary();

/* ================================
   🔴 STRIPE WEBHOOK MUST BE FIRST
================================ */
app.post(
  "/api/stripe-webhooks",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

/* ================================
   CLERK WEBHOOK (RAW)
================================ */
app.post(
  "/api/clerk",
  express.raw({ type: "*/*" }),
  clertWebhooks
);

/* ================================
   NORMAL MIDDLEWARES
================================ */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://jetskiim-f.vercel.app"
  ],
  credentials: true
}));

app.use(morgan("dev"));
app.use(clerkMiddleware());
app.use(express.json());

app.use("/api", (req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

/* ================================
   ROUTES
================================ */
app.use("/api/user", userRoute);
app.use("/api/bookings", bookingRouter);
app.use("/api/contactus", contactusRouter);
app.use(jetskiiRoute);

app.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});
