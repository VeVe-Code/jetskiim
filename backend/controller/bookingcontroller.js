const Booking = require("../model/booking");
const Jetskiis = require("../model/Jetskiis");
const checkAvailability = require("../controller/checkAvailabilityController");


// --------------------------------------------------
// Create booking
// --------------------------------------------------
// let createBooking = async (req, res) => {
//   try {
//     let { 
//       jetskiiId,
//       checkInDate, 
//       checkOutDate, 
//       checkInTime, 
//       checkOutTime 
//     } = req.body;

//     // Validate jetskii
//     let jetskiiData = await Jetskiis.findById(jetskiiId);
//     if (!jetskiiData) {
//       return res.status(404).json({
//         success: false,
//         message: "Jetskii not found"
//       });
//     }

//     // Check availability function
//     let isAvailable = await checkAvailability({
//       jetskiiId,
//       checkInDate,
//       checkOutDate,
//       checkInTime,
//       checkOutTime,
//     });

//     if (!isAvailable) {
//       return res.json({
//         success: false,
//         message: "This jetskii is already booked at that time."
//       });
//     }

//     // Calculate price
//     let totalPrice = jetskiiData.price;

//     // Create booking
//     let newBooking = await Booking.create({
//       user: req.user._id,
//       jetskii: jetskiiId,

//       checkInDate,
//       checkOutDate,
//       checkInTime,
//       checkOutTime,

//       totalPrice
//     });

//     return res.json({
//       success: true,
//       booking: newBooking
//     });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "server error"
//     });
//   }
// };
// const createBooking = async (req, res) => {
//   try {
//     const {
//       jetskiiId,
//       checkInDate,
//       checkInTime
//     } = req.body;

//     // 1️⃣ Validate jetskii
//     const jetskiiData = await Jetskiis.findById(jetskiiId);
//     if (!jetskiiData) {
//       return res.status(404).json({
//         success: false,
//         message: "Jetskii not found"
//       });
//     }

//     // 2️⃣ Check availability
//     const isAvailable = await checkAvailability({
//       jetskiiId,
//       checkInDate,
//       checkInTime
//     });

//     if (!isAvailable) {
//       return res.json({
//         success: false,
//         message: "This jetskii is already booked at that time"
//       });
//     }

//     // 3️⃣ Create booking
//     const booking = await Booking.create({
//       user: req.user._id,
//       jetskii: jetskiiId,
//       checkInDate,
//       checkInTime,
//       totalPrice: jetskiiData.price,
//       paymentMethod: "pay at jetskii"
//     });

//     return res.json({
//       success: true,
//       booking
//     });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

const createBooking = async (req, res) => {
  try {
    console.log("req.user:", req.user);
    console.log("req.body:", req.body);

    const booking = await Booking.create({
      user: req.user._id,
      jetskii: req.body.jetskiiId,
      jetskiTitle: req.body.jetskiTitle,
      checkInDate: req.body.checkInDate,
      checkInTime: req.body.checkInTime,
      totalPrice: req.body.totalPrice, // or jetskiData.price
      paymentMethod: req.body.paymentMethod,
    });

    console.log("Booking saved:", booking);
    res.status(201).json({ success: true, booking });
  } catch (err) {
    console.log("Booking error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};



// --------------------------------------------------
// Get bookings for user
// --------------------------------------------------
// let getUserBookings = async (req, res) => {
//   try {
//     let user = req.user._id;

//     let bookings = await Booking.find({ user })
//       .populate("jetskii","title price")
//       .sort({ createdAt: -1 });

//     return res.json({ success: true, bookings });

//   } catch (error) {
//     return res.json({
//       success: false,
//       message: "Failed to fetch bookings"
//     });
//   }
// };
// let getUserBookings = async (req, res) => {
//   try {
//     const user = req.user._id;

//     const bookings = await Booking.find({ userId: req.userId })
//       .populate("jetskii", "title price") // <-- must match Booking schema field
//       .sort({ createdAt: -1 });

//     return res.json({ success: true, bookings });
//   } catch (error) {
//     console.error(error);
//     return res.json({
//       success: false,
//       message: "Failed to fetch bookings"
//     });
//   }
// };

//FIXED 
let getUserBookings = async (req, res) => {
  try {
    // Clerk userId (string)
    const userId = req.userId;

    const bookings = await Booking.find({ userId })
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
