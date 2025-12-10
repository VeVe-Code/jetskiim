let express = require("express");
let bookingRouter = express.Router();

const { createBooking, getUserBookings, getOwnerJetskiiBookings } = require("../controller/bookingcontroller");
const { checkAvailability } = require("../controller/checkAvailabilityController");

// CHECK AVAILABILITY API
bookingRouter.post("/check-availability", checkAvailability );

// CREATE BOOKING
bookingRouter.post("/", createBooking);

// USER BOOKINGS
bookingRouter.get("/user", getUserBookings);

// OWNER BOOKINGS (dashboard)
bookingRouter.get("/owner", getOwnerJetskiiBookings);

module.exports = bookingRouter;
