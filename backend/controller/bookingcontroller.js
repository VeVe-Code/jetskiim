const Booking = require("../model/booking");
const Jetskiis = require("../model/Jetskiis");
const checkAvailability = require("../controller/checkAvailabilityController");


// --------------------------------------------------
// Create booking
// --------------------------------------------------
let createBooking = async (req, res) => {
  try {
    let { 
      jetskiiId,
      checkInDate, 
      checkOutDate, 
      checkInTime, 
      checkOutTime 
    } = req.body;

    // Validate jetskii
    let jetskiiData = await Jetskiis.findById(jetskiiId);
    if (!jetskiiData) {
      return res.status(404).json({
        success: false,
        message: "Jetskii not found"
      });
    }

    // Check availability function
    let isAvailable = await checkAvailability({
      jetskiiId,
      checkInDate,
      checkOutDate,
      checkInTime,
      checkOutTime,
    });

    if (!isAvailable) {
      return res.json({
        success: false,
        message: "This jetskii is already booked at that time."
      });
    }

    // Calculate price
    let totalPrice = jetskiiData.price;

    // Create booking
    let newBooking = await Booking.create({
      user: req.user._id,
      jetskii: jetskiiId,

      checkInDate,
      checkOutDate,
      checkInTime,
      checkOutTime,

      totalPrice
    });

    return res.json({
      success: true,
      booking: newBooking
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "server error"
    });
  }
};


// --------------------------------------------------
// Get bookings for user
// --------------------------------------------------
let getUserBookings = async (req, res) => {
  try {
    let user = req.user._id;

    let bookings = await Booking.find({ user })
      .populate("jetskii")
      .sort({ createdAt: -1 });

    return res.json({ success: true, bookings });

  } catch (error) {
    return res.json({
      success: false,
      message: "Failed to fetch bookings"
    });
  }
};


// --------------------------------------------------
// Get all bookings by owner
// --------------------------------------------------
let getOwnerJetskiiBookings = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const jetskiis = await Jetskiis.find({ owner: ownerId });

    if (jetskiis.length === 0) {
      return res.json({
        success: false,
        message: "No jetskiis found for this owner"
      });
    }

    const jetskiiIds = jetskiis.map(j => j._id);

    const bookings = await Booking.find({
      jetskii: { $in: jetskiiIds }
    })
      .populate("jetskii")
      .populate("user")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((acc, b) => acc + (b.totalPrice || 0), 0);

    return res.json({
      success: true,
      dashboard: {
        totalBookings,
        totalRevenue,
        bookings
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


module.exports = { 
  createBooking, 
  getUserBookings, 
  getOwnerJetskiiBookings 
};
