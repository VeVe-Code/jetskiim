// let express = require("express");
// let bookingRouter = express.Router();

// const { createBooking, getUserBookings, getOwnerJetskiiBookings } = require("../controller/bookingcontroller");
// const checkAvailability = require("../controller/checkAvailabilityController"); // FIXED 👍

// // CHECK AVAILABILITY API
// bookingRouter.post("/check-availability", checkAvailability);

// // CREATE BOOKING
// bookingRouter.post("/", createBooking);

// // USER BOOKINGS
// bookingRouter.get("/user", getUserBookings);

// // OWNER BOOKINGS (dashboard)
// bookingRouter.get("/owner", getOwnerJetskiiBookings);

// module.exports = bookingRouter;
const express = require("express");
const bookingRouter = express.Router();

const { createBooking, getUserBookings, getOwnerJetskiiBookings } = require("../controller/bookingcontroller");
const { protect } = require("../middleware/authMiddleware"); // your protect middleware

// Check availability does NOT require login
bookingRouter.post("/check-availability", require("../controller/checkAvailabilityController"));

// CREATE BOOKING — requires login
bookingRouter.post("/", protect, createBooking);

// USER BOOKINGS — requires login
bookingRouter.get("/user", protect, getUserBookings);

// OWNER BOOKINGS — requires login
bookingRouter.get("/owner", protect, getOwnerJetskiiBookings);

module.exports = bookingRouter;
